export const site = {
  name: 'Location Climatisation',
  description:
    'Votre projet de location de climatisation à Perpignan et dans les Pyrénées-Orientales. Conseils, solutions et demande de devis adaptée à votre espace.',
  video: {
    mp4: '/fraicheur-a-la-demande_1080p_web.mp4',
    webm: '/videos/climatisation-hero.webm',
    poster: '/images/climatisation-hero-poster.webp',
    posterAlt: 'Climatiseur mobile en motion design : votre confort, votre durée.',
    description:
      'La présentation montre un bureau exposé à la chaleur, puis un climatiseur mobile et les bénéfices de la location sans achat de matériel. Elle met en scène le confort et la durée du besoin. Les températures de cette animation sont illustratives ; le matériel et ses caractéristiques sont confirmés dans le devis.',
  },
};
export function canonicalOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      url.pathname === '/' &&
      !url.search &&
      !url.hash
      ? url.origin
      : undefined;
  } catch {
    return undefined;
  }
}
