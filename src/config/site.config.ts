export const site = {
  name: 'Location Climatisation',
  description:
    'Votre projet de location de climatisation à Perpignan et dans les Pyrénées-Orientales. Conseils, solutions et demande de devis adaptée à votre espace.',
  video: {
    mp4: '/videos/climatisation-hero.mp4',
    webm: '/videos/climatisation-hero.webm',
    poster: '/images/climatisation-hero-poster.webp',
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
