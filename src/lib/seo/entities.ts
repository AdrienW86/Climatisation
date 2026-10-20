import { canonicalOrigin, site } from '@/config/site.config';
import type { Equipment } from '@/data/equipment';
export function entityId(fragment: string) {
  const origin = canonicalOrigin();
  return origin ? origin + '/#' + fragment : undefined;
}
export function organizationSchema() {
  const origin = canonicalOrigin();
  return origin
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': entityId('organization'),
        name: site.name,
        url: origin,
        logo: origin + '/brand/isotype.svg',
      }
    : undefined;
}
export function serviceSchema(slug: string, title: string, description: string) {
  const origin = canonicalOrigin();
  return origin
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': origin + '/' + slug + '#service',
        name: title,
        description,
        url: origin + '/' + slug,
        provider: { '@id': entityId('organization') },
        serviceType: 'Étude de location de climatisation temporaire',
        areaServed: { '@type': 'AdministrativeArea', name: 'Pyrénées-Orientales' },
      }
    : undefined;
}
export function productSchema(product: Equipment) {
  const origin = canonicalOrigin();
  if (!origin || !product.verified) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': origin + '/equipements#' + product.id,
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand },
    model: product.reference,
    description: product.features.join('. '),
    image: product.photos.map((p) => new URL(p.src, origin).href),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Puissance frigorifique',
        value: product.coolingWatts,
        unitText: 'W',
      },
      { '@type': 'PropertyValue', name: 'Niveau sonore', value: product.soundLevel },
    ],
  };
}
