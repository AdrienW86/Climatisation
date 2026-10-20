import { test } from 'node:test';
import assert from 'node:assert/strict';
import { quoteSchema } from '../src/lib/quote-schema';
import { escapeHtml, sendQuote, type EmailMessage } from '../src/lib/email/send-quote';
const input = {
  name: 'Camille Martin',
  email: 'camille@domain.fr',
  phone: '06 12 34 56 78',
  town: 'Perpignan',
  profile: 'particulier' as const,
  need: 'logement' as const,
  period: 'Du 1 au 15 juillet',
  area: '30',
  message: 'Une pièce exposée au soleil.',
  consent: true as const,
  website: '',
  requestId: 'fbbf964b-5b56-4bcb-bfc2-45ae0463f2dc',
};
test('validation complète, normalisation et champs facultatifs', () => {
  const parsed = quoteSchema.parse({ ...input, email: 'CAMILLE@domain.fr', area: '', message: '' });
  assert.equal(parsed.email, 'camille@domain.fr');
  assert.equal(parsed.area, '');
});
test('rejette email invalide, honeypot, surface négative, message excessif et absence d’accord', () => {
  for (const override of [
    { email: 'invalid' },
    { website: 'https://spam.fr' },
    { area: '-2' },
    { message: 'a'.repeat(3001) },
    { consent: false },
  ])
    assert.equal(quoteSchema.safeParse({ ...input, ...override }).success, false);
});
test('les données HTML sont échappées', () => {
  assert.equal(
    escapeHtml('<script>"&\'</script>'),
    '&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;',
  );
});
test('notification refusée : aucune confirmation client', async () => {
  let calls = 0;
  const result = await sendQuote(
    input,
    'request',
    async () => {
      calls++;
      return { error: 'rejected' };
    },
    { from: 'from@domain.fr', to: 'to@domain.fr' },
  );
  assert.equal(calls, 1);
  assert.equal(result.accepted, false);
});
test('confirmation refusée : demande reçue et état distinct', async () => {
  const messages: EmailMessage[] = [];
  const result = await sendQuote(
    { ...input, name: '<img src=x onerror=alert(1)>' },
    'request',
    async (m) => {
      messages.push(m);
      return messages.length === 1 ? { id: 'notification-id' } : { error: 'confirmation-error' };
    },
    { from: 'from@domain.fr', to: 'to@domain.fr' },
  );
  assert.equal(result.accepted, true);
  assert.equal(result.confirmationAccepted, false);
  assert.equal(messages.length, 2);
  assert.ok(messages[0].html.includes('&lt;img'));
  assert.ok(!messages[0].html.includes('<img'));
});
test('erreur de transport sur confirmation : conserve la réception', async () => {
  let calls = 0;
  const result = await sendQuote(
    input,
    'request',
    async () => {
      calls++;
      if (calls === 1) return { id: 'notification-id' };
      throw new Error('network');
    },
    { from: 'from@domain.fr', to: 'to@domain.fr' },
  );
  assert.equal(result.accepted, true);
  assert.equal(result.confirmationAccepted, false);
});
test('deux acceptations : clés distinctes et reply-to cohérent', async () => {
  const keys: string[] = [];
  const result = await sendQuote(
    input,
    'request',
    async (m, key) => {
      keys.push(key);
      assert.ok(m.replyTo);
      return { id: 'id-' + keys.length };
    },
    { from: 'from@domain.fr', to: 'to@domain.fr' },
  );
  assert.deepEqual(keys, ['request-notification', 'request-confirmation']);
  assert.equal(result.confirmationAccepted, true);
});
test('un nouvel identifiant de formulaire ne change pas le contenu email idempotent', async () => {
  const messages: EmailMessage[] = [];
  const send = async (message: EmailMessage) => {
    messages.push(message);
    return { id: 'accepted' };
  };
  await sendQuote(input, 'stable-key', send, { from: 'from@domain.fr', to: 'to@domain.fr' });
  await sendQuote(
    { ...input, requestId: '9d7c503e-1663-485e-8fa8-43452ad4f35e' },
    'stable-key',
    send,
    { from: 'from@domain.fr', to: 'to@domain.fr' },
  );
  assert.deepEqual(messages[0], messages[2]);
  assert.deepEqual(messages[1], messages[3]);
});
