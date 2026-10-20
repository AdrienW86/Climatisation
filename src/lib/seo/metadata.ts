import type { Metadata } from 'next';
import { canonicalOrigin, site } from '@/config/site.config';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  index = true,
): Metadata {
  const origin = canonicalOrigin();
  return {
    title: {
      absolute: title.length + site.name.length + 3 <= 70 ? title + ' | ' + site.name : title,
    },
    description,
    alternates: origin ? { canonical: origin + path } : undefined,
    robots: { index: Boolean(origin) && index, follow: true },
    openGraph: {
      title,
      description,
      locale: 'fr_FR',
      type: 'website',
      siteName: site.name,
      images: origin ? [{ url: origin + '/opengraph-image', width: 1200, height: 630 }] : [],
      ...(origin ? { url: origin + path } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: origin ? [origin + '/opengraph-image'] : [],
    },
  };
}
