import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { faq } from '@/data/services';
import { JsonLd } from '@/components/seo/json-ld';
import { canonicalOrigin } from '@/config/site.config';
import { AnimatedSection } from '@/components/motion/animated';
export function CTA({ compact = false }: { compact?: boolean }) {
  return (
    <AnimatedSection className={`cta-section ${compact ? 'compact' : ''}`}>
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">ON EN PARLE ?</span>
          <h2>
            Votre prochain été
            <br />
            commence au frais.
          </h2>
          <p>
            Votre espace, votre période, vos besoins.
            <br />
            Donnons une forme à votre projet.
          </p>
        </div>
        <Link className="button button-white" href="/demande-de-devis">
          Demander un devis <ArrowUpRight size={20} />
        </Link>
        <div className="cta-orbit" aria-hidden="true" />
      </div>
    </AnimatedSection>
  );
}
export function FAQ() {
  return (
    <section className="section container faq-section">
      <div>
        <span className="eyebrow">TOUT SIMPLEMENT</span>
        <h2>
          Les bonnes questions.
          <br />
          Des réponses claires.
        </h2>
        <p className="muted">
          Pour avancer dans votre projet
          <br />
          en toute connaissance.
        </p>
      </div>
      <div>
        {faq.map(([q, a]) => (
          <details key={q} className="faq">
            <summary>
              {q}
              <Plus size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map(([question, answer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        }}
      />
    </section>
  );
}
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  const origin = canonicalOrigin();
  // The current page URL is supplied explicitly; never infer canonicals from labels.
  const complete = items.every((item) => Boolean(item.href));
  return (
    <nav className="breadcrumbs" aria-label="Fil d’Ariane">
      <Link href="/">Accueil</Link>
      {items.map((i, index) => (
        <span key={i.label}>
          <span aria-hidden="true"> / </span>
          {i.href && index < items.length - 1 ? (
            <Link href={i.href}>{i.label}</Link>
          ) : (
            <span aria-current={index === items.length - 1 ? 'page' : undefined}>{i.label}</span>
          )}
        </span>
      ))}
      {origin && complete && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': origin + items[items.length - 1].href + '#breadcrumb',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: origin },
              ...items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: origin + item.href,
              })),
            ],
          }}
        />
      )}
    </nav>
  );
}
