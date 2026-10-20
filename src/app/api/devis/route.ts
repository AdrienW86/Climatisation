import { NextResponse } from 'next/server';
import { createHmac } from 'node:crypto';
import { Resend } from 'resend';
import { quoteSchema } from '@/lib/quote-schema';
import { quoteReady } from '@/lib/email/config';
import { sendQuote } from '@/lib/email/send-quote';
import { redis, rateScript } from '@/lib/redis';
import { canonicalOrigin } from '@/config/site.config';
export const runtime = 'nodejs';
export const maxDuration = 60;
const respond = (message: string, status: number) =>
  NextResponse.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(request: Request) {
  if (request.headers.get('origin') && request.headers.get('origin') !== canonicalOrigin())
    return respond('Cette demande ne peut pas être traitée depuis cette origine.', 403);
  if (!quoteReady())
    return respond(
      'L’envoi de demandes est actuellement indisponible. Aucune demande n’a été envoyée.',
      503,
    );
  if (!request.headers.get('origin')) return respond('Origine de la demande absente.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return respond('Format de demande non pris en charge.', 415);
  if (Number(request.headers.get('content-length') ?? 0) > 16000)
    return respond('La demande est trop volumineuse.', 413);
  let raw: string;
  try {
    const reader = request.body?.getReader();
    if (!reader) return respond('Demande vide.', 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > 16000) {
        await reader.cancel();
        return respond('La demande est trop volumineuse.', 413);
      }
      chunks.push(part.value);
    }
    raw = Buffer.concat(chunks).toString('utf8');
  } catch {
    return respond('Impossible de lire la demande.', 400);
  }
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return respond('La demande est illisible.', 400);
  }
  const result = quoteSchema.safeParse(payload);
  if (!result.success)
    return respond('Vérifiez les informations du formulaire et votre accord.', 422);
  const input = result.data;
  const hash = (value: string) =>
    createHmac('sha256', process.env.RATE_LIMIT_SECRET!).update(value).digest('hex');
  const { requestId: _requestId, ...stable } = input;
  void _requestId;
  const key = 'quote:' + hash(JSON.stringify(stable));
  const lock = key + ':lock';
  let locked = false;
  let accepted = false;
  try {
    // Vercel overwrites this header. Outside Vercel, share a conservative bucket.
    const ip = process.env.VERCEL
      ? (request.headers.get('x-vercel-forwarded-for') ?? 'unknown')
      : 'local';
    const allowed = await redis<number>([
      'EVAL',
      rateScript,
      2,
      'quote:ip:' + hash(ip),
      'quote:email:' + hash(input.email),
    ]);
    if (!allowed)
      return NextResponse.json(
        { message: 'Trop de tentatives. Réessayez dans 15 minutes.' },
        { status: 429, headers: { 'Retry-After': '900', 'Cache-Control': 'no-store' } },
      );
    const previous = await redis<string | null>(['GET', key]);
    if (previous)
      return NextResponse.json(JSON.parse(previous), { headers: { 'Cache-Control': 'no-store' } });
    locked = (await redis<string | null>(['SET', lock, '1', 'NX', 'EX', 120])) === 'OK';
    if (!locked)
      return respond(
        'Une demande identique est en cours de traitement. Patientez avant de réessayer.',
        409,
      );
    const resend = new Resend(process.env.RESEND_API_KEY);
    const outcome = await sendQuote(
      input,
      key,
      async (message, idempotencyKey) => {
        const { data, error } = await resend.emails.send(message, {
          idempotencyKey,
          signal: AbortSignal.timeout(15000),
        });
        if (error)
          console.error('quote.email_rejected', {
            stage: idempotencyKey.endsWith('notification') ? 'notification' : 'confirmation',
            code: error.name,
          });
        return { id: data?.id, error: error?.name };
      },
      { from: process.env.RESEND_FROM!, to: process.env.CONTACT_EMAIL! },
    );
    if (!outcome.accepted)
      return respond('Le service email n’a pas accepté votre demande. Réessayez plus tard.', 502);
    accepted = true;
    if (!outcome.confirmationAccepted)
      console.error('quote.confirmation_failed', { notificationId: outcome.notificationId });
    const body = {
      success: true,
      confirmationAccepted: outcome.confirmationAccepted,
      message: outcome.confirmationAccepted
        ? 'Votre demande a bien été reçue. Un email de confirmation vous a été adressé.'
        : 'Votre demande a bien été reçue. L’email de confirmation n’a pas pu être envoyé ; il est inutile de renouveler votre demande.',
    };
    try {
      await redis(['SET', key, JSON.stringify(body), 'EX', 86400]);
    } catch {
      console.error('quote.receipt_storage_failed', { notificationId: outcome.notificationId });
    }
    return NextResponse.json(body, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    console.error('quote.service_unavailable', { accepted });
    return respond(
      accepted
        ? 'Votre demande a été reçue. L’email de confirmation n’a pas pu être confirmé.'
        : 'Le service est momentanément indisponible. Vous pouvez réessayer plus tard.',
      accepted ? 200 : 503,
    );
  } finally {
    if (locked)
      try {
        await redis(['DEL', lock]);
      } catch {
        /* Expiration automatique du verrou après 120 s. */
      }
  }
}
