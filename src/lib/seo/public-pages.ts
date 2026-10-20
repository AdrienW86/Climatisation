import { services } from '@/data/services';
import { guides } from '@/content/guides';
import { locations, localEditorial } from '@/data/locations';
import { equipment } from '@/data/equipment';
export type PublicPage = { path: string; title: string; modifiedAt?: string };
export function publicPages(): PublicPage[] {
  return [
    { path: '/', title: 'Location Climatisation à Perpignan et dans le 66' },
    ...services.map((s) => ({ path: '/' + s.slug, title: s.seoTitle })),
    ...[
      { path: '/equipements', title: 'Équipements et critères de choix' },
      { path: '/demande-de-devis', title: 'Demande de devis' },
      { path: '/contact', title: 'Contact' },
      { path: '/conseils', title: 'Guides pratiques' },
    ],
    ...guides.map((g) => ({
      path: '/conseils/' + g.slug,
      title: g.title,
      modifiedAt: g.modifiedAt ?? g.publishedAt,
    })),
    ...locations
      .filter((l) => l.published)
      .map((l) => ({
        path: '/location-climatisation/' + l.slug,
        title: 'Location de climatisation à ' + l.nom,
        modifiedAt: localEditorial[l.code].verifiedAt,
      })),
    ...(equipment.some((e) => e.verified && e.category === 'mobile')
      ? [{ path: '/climatiseur-mobile', title: 'Location de climatiseur mobile' }]
      : []),
  ];
}
