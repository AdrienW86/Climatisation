import type { MetadataRoute } from 'next';
import { canonicalOrigin } from '@/config/site.config';
import { searchCrawlers, trainingOverrides } from '@/config/crawlers.config';
export default function robots(): MetadataRoute.Robots {
  const origin = canonicalOrigin();
  return {
    rules: [
      {
        userAgent: '*',
        allow: origin ? '/' : undefined,
        disallow: origin ? ['/api/'] : ['/'],
      },
      ...searchCrawlers.map((userAgent) => ({
        userAgent,
        allow: origin ? '/' : undefined,
        disallow: origin ? ['/api/'] : ['/'],
      })),
      ...trainingOverrides().map(({ userAgent, policy }) => ({
        userAgent,
        allow: origin && policy === 'allow' ? '/' : undefined,
        disallow: !origin || policy === 'disallow' ? ['/'] : ['/api/'],
      })),
    ],
    sitemap: origin ? origin + '/sitemap.xml' : undefined,
  };
}
