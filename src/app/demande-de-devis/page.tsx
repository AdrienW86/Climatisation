import { QuoteForm } from '@/components/forms/quote-form';
import { quoteReady } from '@/lib/email/config';
import { Breadcrumb } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata(
  'Demander un devis de location de climatisation',
  'Décrivez votre projet : commune, période, usage et surface. Une demande pour étudier une solution de climatisation adaptée dans les Pyrénées-Orientales.',
  '/demande-de-devis',
);
export default function QuotePage() {
  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Demande de devis', href: '/demande-de-devis' }]} />
      <div className="quote-layout">
        <div className="quote-intro">
          <span className="eyebrow">LE CONFORT COMMENCE ICI</span>
          <h1>
            Un peu de vous.
            <br />
            Un peu plus
            <br />
            de fraîcheur.
          </h1>
          <p>
            Quelques informations pour comprendre votre projet de location de climatisation à
            Perpignan ou dans les Pyrénées-Orientales.
          </p>
          <div className="benefit-list">
            {[
              [
                '01',
                'Un projet à votre image',
                'Votre lieu, votre période et vos contraintes guident l’étude.',
              ],
              [
                '02',
                'Des conditions à préciser',
                'Le matériel, le tarif et les modalités sont confirmés avant tout accord.',
              ],
              [
                '03',
                'Un échange en toute clarté',
                'Votre demande ne vaut ni réservation, ni confirmation de disponibilité.',
              ],
            ].map(([n, title, text]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <QuoteForm enabled={quoteReady()} />
      </div>
    </div>
  );
}
