import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { JsonLd } from '@/components/seo/json-ld';
import { canonicalOrigin, site } from '@/config/site.config';
import { analyticsEnabled } from '@/config/analytics.config';
import { analyticsMode } from '@/config/analytics.config';
import { AudienceMeasurement } from '@/components/privacy/audience-measurement';
import { MotionObserver } from '@/components/motion/motion-observer';
import { organizationSchema } from '@/lib/seo/entities';
import './globals.css';
import './motion.css';
const origin = canonicalOrigin();
export const metadata: Metadata = {
  metadataBase: origin ? new URL(origin) : undefined,
  title: {
    default: 'Location Climatisation · Perpignan & Pyrénées-Orientales',
    template: '%s | Location Climatisation',
  },
  description: site.description,
  robots: { index: Boolean(origin), follow: true },
  icons: { icon: '/favicon.svg', apple: '/apple-icon' },
  openGraph: {
    locale: 'fr_FR',
    type: 'website',
    siteName: site.name,
    images: origin ? [origin + '/opengraph-image'] : [],
  },
  twitter: { card: 'summary_large_image', images: origin ? [origin + '/opengraph-image'] : [] },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : {},
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analytics = analyticsEnabled();
  return (
    <html lang="fr">
      <head>
        <link
          rel="preload"
          href="/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionObserver />
        {origin && <JsonLd data={organizationSchema()!} />}
        {analytics && (
          <>
            <AudienceMeasurement mode={analyticsMode()} />
          </>
        )}
      </body>
    </html>
  );
}
