import type { MetadataRoute } from 'next';
import { canonicalOrigin } from '@/config/site.config';
import { publicPages } from '@/lib/seo/public-pages';
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = canonicalOrigin();
  if (!origin) return [];
  return publicPages().map((page) => ({
    url: origin + (page.path === '/' ? '' : page.path),
    ...('modifiedAt' in page && page.modifiedAt ? { lastModified: new Date(page.modifiedAt) } : {}),
  }));
}
