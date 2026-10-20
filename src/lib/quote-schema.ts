import { z } from 'zod';
export const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Indiquez votre nom complet.').max(100, '100 caractères maximum.'),
  email: z
    .email('Indiquez une adresse email valide.')
    .max(254)
    .transform((v) => v.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(6, 'Indiquez un numéro de téléphone.')
    .max(30)
    .regex(/^[+\d\s().-]+$/, 'Vérifiez le numéro de téléphone.'),
  town: z.string().trim().min(2, 'Indiquez votre commune.').max(100),
  profile: z.enum(['particulier', 'professionnel'], { error: 'Choisissez votre profil.' }),
  need: z.enum(['logement', 'bureau', 'commerce', 'hebergement', 'autre'], {
    error: 'Choisissez votre besoin.',
  }),
  period: z.string().trim().min(3, 'Précisez la période envisagée.').max(200),
  area: z
    .string()
    .trim()
    .max(20)
    .refine(
      (v) =>
        v === '' ||
        (/^\d+(?:[.,]\d+)?$/.test(v) &&
          Number(v.replace(',', '.')) > 0 &&
          Number(v.replace(',', '.')) <= 100000),
      'Indiquez une surface positive en m².',
    ),
  message: z.string().trim().max(3000, '3 000 caractères maximum.'),
  consent: z.literal(true, { error: 'Votre accord est nécessaire pour traiter la demande.' }),
  website: z.string().max(0, 'La demande ne peut pas être traitée.'),
  requestId: z.uuid(),
});
export type QuoteInput = z.infer<typeof quoteSchema>;
