import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Location Climatisation',
    short_name: 'Location Climatisation',
    description: 'Location de climatisation à Perpignan et dans les Pyrénées-Orientales.',
    lang: 'fr',
    start_url: '/',
    display: 'browser',
    background_color: '#f8fbff',
    theme_color: '#102a43',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
