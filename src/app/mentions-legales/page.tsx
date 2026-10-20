import { notFound } from 'next/navigation';
import { business, legalReady } from '@/config/business.config';
import { Breadcrumb } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata(
  'Mentions légales',
  'Identité de l’éditeur et de l’hébergeur du site Location Climatisation.',
  '/mentions-legales',
  false,
);
export default function LegalPage() {
  if (!legalReady()) notFound();
  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Mentions légales', href: '/mentions-legales' }]} />
      <div className="page-hero">
        <h1>Mentions légales</h1>
      </div>
      <article className="prose section" style={{ paddingTop: 0 }}>
        <section>
          <h2>Éditeur</h2>
          <p>
            {business.name}
            <br />
            {business.operator} · {business.legalForm}
            <br />
            SIREN : {business.siren}
            <br />
            SIRET : {business.siret}
            <br />
            {business.address}
            <br />
            {business.email}
            <br />
            {business.phone}
          </p>
          {business.vat && <p>{business.vat}</p>}
          {business.registration && <p>{business.registration}</p>}
          {business.shareCapital && <p>Capital social : {business.shareCapital}</p>}
          <p>Directeur de la publication : {business.publicationDirector}</p>
        </section>
        {business.consumerMediator.name && business.consumerMediator.contact && (
          <section>
            <h2>Médiation de la consommation</h2>
            <p>
              {business.consumerMediator.name}
              <br />
              {business.consumerMediator.contact}
            </p>
          </section>
        )}
        <section>
          <h2>Hébergement</h2>
          <p>
            {business.host.name}
            <br />
            {business.host.address}
            <br />
            {business.host.contact}
            {business.host.phone && (
              <>
                <br />
                {business.host.phone}
              </>
            )}
          </p>
        </section>
        <section>
          <h2>Demandes et conditions de location</h2>
          <p>
            Ce site permet de solliciter l’étude d’un projet. Le formulaire ne conclut aucun
            contrat, ne réserve aucun appareil et ne déclenche aucun paiement. Les conditions
            contractuelles applicables doivent être communiquées avec la proposition avant tout
            accord.
          </p>
        </section>
        <section>
          <h2>Contenu et utilisation</h2>
          <p>
            Les caractéristiques, tarifs et disponibilités des équipements sont confirmés dans la
            proposition commerciale. Les guides présentent des principes généraux et ne remplacent
            pas la documentation du fabricant ni l’étude du lieu d’utilisation.
          </p>
        </section>
      </article>
    </div>
  );
}
