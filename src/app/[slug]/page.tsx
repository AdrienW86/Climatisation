import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { CTA, Breadcrumb, FAQ } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { canonicalOrigin } from '@/config/site.config';
import { serviceSchema } from '@/lib/seo/entities';
import { AnimatedHeading } from '@/components/motion/animated';
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s ? pageMetadata(s.seoTitle, s.description, '/' + slug) : {};
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  const origin = canonicalOrigin();
  return (
    <>
      <div className="container">
        <Breadcrumb
          items={[
            {
              label:
                slug === 'location-climatiseur'
                  ? 'Location de climatiseur'
                  : slug.includes('particuliers')
                    ? 'Particuliers'
                    : 'Professionnels',
              href: '/' + slug,
            },
          ]}
        />
        <div className="page-hero">
          <span className="eyebrow">{s.eyebrow}</span>
          <AnimatedHeading as="h1">{s.title}</AnimatedHeading>
          <p className="service-context">{s.seoTitle}</p>
          <p>{s.description}</p>
          <Link className="button" href="/demande-de-devis">
            Étudier mon projet <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="content-grid">
          <div className="prose">
            {s.sections.map((section) => (
              <section key={section.title} data-reveal="rise">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
            <section data-reveal="soft">
              <h2>Aller plus loin dans votre choix</h2>
              <p>
                Consultez notre{' '}
                <Link href="/conseils/choisir-climatiseur-location">
                  guide pour choisir un climatiseur en location
                </Link>{' '}
                et nos conseils sur{' '}
                <Link href="/conseils/evacuation-air-chaud">l’évacuation de l’air chaud</Link>. Les
                équipements et les conditions proposés sont confirmés lors de l’étude de votre
                demande.
              </p>
              <p>
                Votre projet se situe à Perpignan ? Consultez les{' '}
                <Link href="/location-climatisation/perpignan">
                  repères utiles pour préparer une location à Perpignan
                </Link>
                .
              </p>
            </section>
          </div>
          <aside className="side-card">
            <h2>
              Un besoin précis ?<br />
              Parlons-en.
            </h2>
            <p>
              Commune, période et contraintes du lieu : partagez les premiers éléments de votre
              projet.
            </p>
            <Link href="/demande-de-devis" className="button">
              Demander un devis <ArrowUpRight size={16} />
            </Link>
            <Link href="/equipements">Comprendre les solutions →</Link>
          </aside>
        </div>
      </div>
      <FAQ />
      <CTA />
      {origin && <JsonLd data={serviceSchema(slug, s.seoTitle, s.description)!} />}
    </>
  );
}
