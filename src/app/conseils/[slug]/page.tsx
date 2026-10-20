import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides } from '@/content/guides';
import { Breadcrumb, CTA } from '@/components/ui';
import { JsonLd } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo/metadata';
import { canonicalOrigin } from '@/config/site.config';
import { entityId } from '@/lib/seo/entities';
import { RevealOnScroll } from '@/components/motion/animated';
export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  return g
    ? {
        ...pageMetadata(g.title, g.description, '/conseils/' + slug),
        openGraph: {
          ...pageMetadata(g.title, g.description, '/conseils/' + slug).openGraph,
          type: 'article' as const,
          title: g.title,
          description: g.description,
          publishedTime: g.publishedAt,
          modifiedTime: g.modifiedAt,
        },
      }
    : {};
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  const origin = canonicalOrigin();
  return (
    <>
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Conseils', href: '/conseils' },
            { label: g.title, href: '/conseils/' + slug },
          ]}
        />
        <div className="page-hero">
          <span className="eyebrow">{g.category}</span>
          <h1>{g.title}</h1>
          <p>{g.description}</p>
          <div className="article-meta">
            <span>
              Publié le{' '}
              {new Date(g.publishedAt + 'T12:00:00Z').toLocaleDateString('fr-FR', {
                timeZone: 'Europe/Paris',
              })}
            </span>
            <span>{g.readingMinutes} min de lecture</span>
            <span>
              Actualisé le{' '}
              {new Date((g.modifiedAt ?? g.publishedAt) + 'T12:00:00Z').toLocaleDateString(
                'fr-FR',
                { timeZone: 'Europe/Paris' },
              )}
            </span>
          </div>
        </div>
        <div className="content-grid">
          <article className="prose">
            {g.directAnswer && (
              <RevealOnScroll className="answer-box" effect="soft">
                <h2>La réponse en quelques mots</h2>
                <p>{g.directAnswer}</p>
              </RevealOnScroll>
            )}
            <nav className="article-toc" aria-label="Sommaire">
              <h2>Dans ce guide</h2>
              {g.sections.map((s) => (
                <a key={s.id} href={'#' + s.id}>
                  {s.title}
                </a>
              ))}
            </nav>
            {g.sections.map((s, i) => (
              <section key={s.id} id={s.id}>
                <h2>{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {i === 0 && g.comparison && (
                  <div className="table-wrap">
                    <table>
                      <caption>{g.comparisonCaption}</caption>
                      <thead>
                        <tr>
                          {g.comparison.headers.map((h) => (
                            <th scope="col" key={h}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {g.comparison.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, j) =>
                              j === 0 ? (
                                <th scope="row" key={j}>
                                  {cell}
                                </th>
                              ) : (
                                <td key={j}>{cell}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
            <section>
              <h2>Préparer votre projet dans le 66</h2>
              <p>
                Pour un logement ou un local professionnel à Perpignan et dans les
                Pyrénées-Orientales, commencez par décrire votre pièce, la période souhaitée et les
                contraintes d’accès. Vous pouvez{' '}
                <Link href="/demande-de-devis">préparer une demande de devis</Link> ou découvrir{' '}
                <Link href="/location-climatiseur">les critères de choix d’une location</Link>. Pour
                un espace de travail, retrouvez la{' '}
                <Link href="/location-climatisation-professionnels">
                  préparation d’une demande professionnelle
                </Link>{' '}
                ; pour un logement, consultez les{' '}
                <Link href="/location-climatisation-particuliers">
                  repères pour les particuliers
                </Link>
                .
              </p>
            </section>
            <section className="source-list">
              <h2>Sources et références</h2>
              <p>
                Ces guides expliquent les principes généraux. La notice du fabricant et l’étude de
                votre local restent nécessaires pour une référence donnée.
              </p>
              {g.sources.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
                  {s.title} ↗
                </a>
              ))}
            </section>
          </article>
          <aside className="side-card">
            <h2>Pour aller plus loin</h2>
            {g.related.map((slug) => {
              const r = guides.find((g) => g.slug === slug);
              return r ? (
                <Link key={slug} href={'/conseils/' + slug}>
                  {r.title} →
                </Link>
              ) : null;
            })}
            <Link className="button" href="/demande-de-devis">
              Parlons de votre projet ↗
            </Link>
          </aside>
        </div>
      </div>
      <CTA />
      {origin && (
        <>
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'Article',
              '@id': origin + '/conseils/' + slug + '#article',
              headline: g.title,
              description: g.description,
              datePublished: g.publishedAt + 'T12:00:00+02:00',
              dateModified: (g.modifiedAt ?? g.publishedAt) + 'T12:00:00+02:00',
              publisher: { '@id': entityId('organization') },
              isPartOf: { '@id': origin + '/conseils#collection' },
              mainEntityOfPage: origin + '/conseils/' + slug,
              image: origin + '/opengraph-image',
            }}
          />
        </>
      )}
    </>
  );
}
