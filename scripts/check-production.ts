import { existsSync } from 'node:fs';
import { business, legalReady } from '../src/config/business.config';
import { canonicalOrigin } from '../src/config/site.config';
if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const required = [
  'NEXT_PUBLIC_SITE_URL',
  'RESEND_API_KEY',
  'RESEND_FROM',
  'CONTACT_EMAIL',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'RATE_LIMIT_SECRET',
];
const missing = required.filter((name) => !process.env[name]);
if (!canonicalOrigin())
  missing.push('NEXT_PUBLIC_SITE_URL : origine HTTPS sans chemin ni identifiants');
if ((process.env.RATE_LIMIT_SECRET?.length ?? 0) < 32)
  missing.push('RATE_LIMIT_SECRET : 32 caractères minimum');
if (process.env.BUSINESS_VERIFIED !== 'true')
  missing.push('BUSINESS_VERIFIED=true après validation juridique');
for (const field of [
  'legalForm',
  'siren',
  'siret',
  'address',
  'email',
  'publicationDirector',
] as const)
  if (!business[field]) missing.push('business.config.ts : ' + field);
for (const field of ['name', 'address', 'contact', 'phone'] as const)
  if (!business.host[field]) missing.push('business.config.ts : host.' + field);
if (!legalReady() && !missing.length) missing.push('Vérification juridique incomplète');
if (!business.registry.identityConfirmed || !business.registry.url || !business.registry.verifiedAt)
  missing.push('Identité exploitant : correspondance et source officielle à confirmer');
if (!business.host.confirmed)
  missing.push('Hébergeur Vercel prévu : contrat et coordonnées applicables à confirmer');
if (
  process.env.ANALYTICS_PRIVACY_MODE === 'exempt' &&
  process.env.ANALYTICS_EXEMPTION_VERIFIED !== 'true'
)
  missing.push('Exemption de consentement audience non justifiée ; mode consentement appliqué');
if (missing.length) {
  console.error(
    'Mise en production bloquée :\n' + [...new Set(missing)].map((v) => '• ' + v).join('\n'),
  );
  process.exitCode = 1;
} else
  console.log(
    'Configuration technique présente. Vérifier les contrats prestataires, la politique de conservation et les envois réels avant ouverture.',
  );
