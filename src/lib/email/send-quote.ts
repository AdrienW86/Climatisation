import type { QuoteInput } from '../quote-schema';
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c,
  );
}
export type EmailMessage = {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};
export type EmailSender = (
  message: EmailMessage,
  key: string,
) => Promise<{ id?: string; error?: string }>;
export async function sendQuote(
  input: QuoteInput,
  key: string,
  send: EmailSender,
  config: { from: string; to: string },
) {
  const rows = [
    ['Nom', input.name],
    ['Email', input.email],
    ['Téléphone', input.phone],
    ['Commune', input.town],
    ['Profil', input.profile],
    ['Besoin', input.need],
    ['Période', input.period],
    ['Surface', input.area ? input.area + ' m²' : 'Non précisée'],
    ['Message', input.message || 'Non précisé'],
  ];
  const notification = await send(
    {
      from: config.from,
      to: config.to,
      replyTo: input.email,
      subject: 'Nouvelle demande de location de climatisation',
      html:
        '<h1>Nouvelle demande de devis</h1>' +
        rows
          .map(
            ([label, value]) =>
              `<p><strong>${label}</strong><br/>${escapeHtml(value).replace(/\n/g, '<br/>')}</p>`,
          )
          .join('') +
        `<p>Accord au traitement de la demande enregistré. Référence : ${escapeHtml(key)}</p>`,
    },
    key + '-notification',
  );
  if (!notification.id) return { accepted: false, confirmationAccepted: false };
  let confirmation: { id?: string; error?: string };
  try {
    confirmation = await send(
      {
        from: config.from,
        to: input.email,
        subject: 'Votre demande a bien été reçue — Location Climatisation',
        html: `<p>Bonjour ${escapeHtml(input.name)},</p><p>Votre demande concernant un projet à ${escapeHtml(input.town)} a bien été reçue.</p><p>Elle sera étudiée pour préciser la faisabilité, le matériel et les conditions de location. Ce message ne confirme ni réservation, ni tarif, ni disponibilité.</p><p>Pour compléter votre demande, répondez à cet email.</p><p>Location Climatisation</p>`,
        replyTo: config.to,
      },
      key + '-confirmation',
    );
  } catch {
    confirmation = { error: 'confirmation_transport' };
  }
  return {
    accepted: true,
    notificationId: notification.id,
    confirmationAccepted: Boolean(confirmation.id),
    confirmationId: confirmation.id,
  };
}
