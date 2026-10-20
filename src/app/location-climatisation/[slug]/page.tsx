import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locations, localEditorial } from '@/data/locations';
import { Breadcrumb, CTA } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
import { guides } from '@/content/guides';
export const dynamicParams = false;
export function generateStaticParams() {
  return locations.filter((l) => l.published).map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locations.find((l) => l.slug === slug && l.published);
  return l
    ? pageMetadata(
        'Location de climatisation à ' + l.nom,
        localEditorial[l.code].metaDescription ?? localEditorial[l.code].intro,
        '/location-climatisation/' + slug,
      )
    : {};
}
export default async function LocalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locations.find((l) => l.slug === slug && l.published);
  if (!l) notFound();
  const editorial = localEditorial[l.code];
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: l.nom, href: '/location-climatisation/' + l.slug }]} />
        <div className="page-hero">
          <span className="eyebrow">{l.nom} · PYRÉNÉES-ORIENTALES</span>
          <h1>{editorial.title}</h1>
          <p>{editorial.intro}</p>
          <Link className="button" href="/demande-de-devis">
            Préparer ma demande à {l.nom} ↗
          </Link>
        </div>
        <article className="prose section" style={{ paddingTop: 0 }}>
          {editorial.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          {editorial.questions.map((q) => (
            <section key={q.question}>
              <h2>{q.question}</h2>
              <p>{q.answer}</p>
            </section>
          ))}
          <section>
            <h2>Pour préparer votre demande à {l.nom}</h2>
            {editorial.relatedGuides.map((slug) => {
              const g = guides.find((g) => g.slug === slug);
              return g ? (
                <p key={slug}>
                  <Link href={'/conseils/' + slug}>{g.title}</Link>
                </p>
              ) : null;
            })}
          </section>
          <section className="source-list">
            <h2>Repères géographiques vérifiés</h2>
            <p>
              Commune : {l.nom} · code INSEE {l.code} · codes postaux : {l.codesPostaux.join(', ')}.
              Données vérifiées le{' '}
              {new Date(editorial.verifiedAt + 'T12:00:00Z').toLocaleDateString('fr-FR', {
                timeZone: 'Europe/Paris',
              })}
              .
            </p>
            {editorial.sources.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
                {s.title} ↗
              </a>
            ))}
          </section>
          <p>
            <Link href="/demande-de-devis">Décrire mon projet à {l.nom}</Link>
          </p>
        </article>
      </div>
      <CTA />
    </>
  );
}
