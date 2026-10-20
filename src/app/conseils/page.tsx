import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { guides } from '@/content/guides';
import { Breadcrumb, CTA } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { canonicalOrigin } from '@/config/site.config';
export const metadata = pageMetadata(
  'Conseils pour choisir et utiliser une climatisation',
  'Guides pratiques : puissance, surface, évacuation, consommation et location de climatisation pour votre logement ou votre activité.',
  '/conseils',
);
export default function AdvicePage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Conseils', href: '/conseils' }]} />
        <div className="page-hero">
          <span className="eyebrow">LE CARNET FRAÎCHEUR</span>
          <h1>
            Un choix éclairé.
            <br />
            Un été plus agréable.
          </h1>
          <p>
            Comprendre les solutions, poser les bonnes questions et préparer votre espace. Des
            guides pour avancer simplement.
          </p>
        </div>
        <div className="guide-grid section article-grid" data-stagger>
          {guides.map((g, i) => (
            <Link
              className="guide-card"
              data-reveal="image"
              href={'/conseils/' + g.slug}
              key={g.slug}
            >
              <div className={'guide-art guide-art-' + (i % 3)}>
                <span>
                  {g.category
                    .toUpperCase()
                    .split(' ')
                    .map((word) => (
                      <span key={word}>
                        {word}
                        <br />
                      </span>
                    ))}
                </span>
                <div aria-hidden="true" />
              </div>
              <div className="guide-meta">
                {g.category}
                <span>{g.readingMinutes} MIN DE LECTURE</span>
              </div>
              <h2 style={{ fontSize: 24, lineHeight: 1.3, marginTop: 15 }}>{g.title}</h2>
              <p style={{ fontSize: 12, marginTop: 15 }}>{g.description}</p>
              <span className="text-link">
                Lire le guide <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <CTA />
      {canonicalOrigin() && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': canonicalOrigin() + '/conseils#collection',
            name: 'Le carnet fraîcheur',
            url: canonicalOrigin() + '/conseils',
            hasPart: guides.map((g) => ({
              '@id': canonicalOrigin() + '/conseils/' + g.slug + '#article',
            })),
          }}
        />
      )}
    </>
  );
}
