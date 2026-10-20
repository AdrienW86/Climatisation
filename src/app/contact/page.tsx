import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { business } from '@/config/business.config';
import { Breadcrumb, FAQ } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
export const metadata = pageMetadata(
  'Contact · Votre projet de climatisation dans le 66',
  'Un projet de climatisation temporaire à Perpignan ou dans les Pyrénées-Orientales ? Préparez les informations utiles pour étudier votre besoin.',
  '/contact',
);
export default function ContactPage() {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Contact', href: '/contact' }]} />
        <div className="page-hero">
          <span className="eyebrow">LE DÉBUT D’UN ÉCHANGE</span>
          <h1>
            Parlons de votre
            <br />
            prochain été.
          </h1>
          <p>
            Un projet défini ou une première question ? Commune, période et caractéristiques du lieu
            permettent de commencer sur de bonnes bases.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h2>Votre projet, en quelques mots.</h2>
            <p>
              Rassemblez les premiers éléments pour étudier une solution temporaire adaptée à votre
              usage.
            </p>
            <Link href="/demande-de-devis" className="button">
              Préparer ma demande <ArrowUpRight size={17} />
            </Link>
            {business.commercial.email && (
              <a href={'mailto:' + business.commercial.email}>{business.commercial.email}</a>
            )}
            {business.commercial.phone && (
              <a href={'tel:' + business.commercial.phone.replace(/\s/g, '')}>
                {business.commercial.phone}
              </a>
            )}
          </div>
          <div className="contact-card">
            <span className="eyebrow">PERPIGNAN & LE DÉPARTEMENT 66</span>
            <h2>
              Un ancrage local.
              <br />
              Une étude au cas par cas.
            </h2>
            <p>
              Indiquez votre commune et les conditions d’accès à votre logement ou à votre local.
              Les modalités de prise en charge sont confirmées selon votre projet.
            </p>
            <Link className="text-link" href="/location-climatiseur">
              Comprendre les critères de choix →
            </Link>
          </div>
        </div>
      </div>
      <FAQ />
    </>
  );
}
