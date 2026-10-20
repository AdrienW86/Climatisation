import Image from 'next/image';
import Link from 'next/link';
import { Wind, ArrowUpRight } from 'lucide-react';
import { equipment } from '@/data/equipment';
import { Breadcrumb, CTA } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { productSchema } from '@/lib/seo/entities';
export const metadata = pageMetadata(
  'Équipements et solutions de climatisation',
  'Comprendre les caractéristiques des solutions de rafraîchissement et préparer le choix de votre équipement en location dans le 66.',
  '/equipements',
);
export default function EquipmentPage() {
  const products = equipment.filter((e) => e.verified);
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Équipements', href: '/equipements' }]} />
        <div className="page-hero">
          <span className="eyebrow">LE MATÉRIEL, EN TOUTE CLARTÉ</span>
          <h1>
            La bonne solution.
            <br />
            Pour le bon espace.
          </h1>
          <p>
            Le choix d’un équipement dépend du lieu, de son usage et des contraintes d’installation.
            Les références et leur disponibilité sont confirmées lors de l’étude du projet.
          </p>
        </div>
        {products.length ? (
          <div className="equipment-grid section">
            {products.map((e) => (
              <article className="equipment-card" key={e.id} data-reveal="image">
                {productSchema(e) && <JsonLd data={productSchema(e)!} />}
                {e.photos[0] && (
                  <Image src={e.photos[0].src} alt={e.photos[0].alt} width={500} height={400} />
                )}
                <span className="eyebrow">
                  {e.brand} · {e.reference}
                </span>
                <h2>{e.name}</h2>
                <dl>
                  <dt>Puissance frigorifique</dt>
                  <dd>{e.coolingWatts} W</dd>
                  <dt>Niveau sonore</dt>
                  <dd>{e.soundLevel}</dd>
                  <dt>Dimensions</dt>
                  <dd>{e.dimensions}</dd>
                  {e.indicativeArea && (
                    <>
                      <dt>Surface indicative</dt>
                      <dd>
                        {e.indicativeArea.squareMeters} m² — {e.indicativeArea.conditions}
                      </dd>
                    </>
                  )}
                </dl>
                <ul>
                  {e.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {e.price && (
                  <p>
                    {e.price.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}{' '}
                    / {e.price.unit} · {e.price.taxLabel}
                  </p>
                )}
                <p>{e.rentalConditions}</p>
                {e.documents.map((d) => (
                  <a key={d.href} href={d.href}>
                    {d.label}
                  </a>
                ))}
                <Link className="text-link" href="/demande-de-devis">
                  Étudier cette solution <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-catalog">
            <Wind size={35} />
            <div>
              <h2>Partons de votre besoin.</h2>
              <p>
                La sélection d’un appareil nécessite de connaître votre pièce et la période
                souhaitée. Transmettez ces informations pour permettre de préciser le type de
                matériel, les caractéristiques et les modalités envisageables.
              </p>
              <Link className="text-link" href="/demande-de-devis">
                Décrire mon projet <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        )}
        <div className="content-grid">
          <div className="prose">
            <section>
              <h2>Comprendre les types de solutions</h2>
              <p>
                Un climatiseur mobile monobloc réunit ses éléments dans une unité intérieure et
                rejette l’air chaud par une gaine. Un système split comporte des éléments séparés et
                impose d’autres contraintes d’implantation. Ces familles sont présentées à titre
                pédagogique : leur présence dans le parc n’est pas présumée.
              </p>
            </section>
            <section>
              <h2>Les caractéristiques à examiner ensemble</h2>
              <p>
                Puissance frigorifique, niveau sonore documenté, dimensions, alimentation et
                évacuation doivent être compatibles avec le lieu. Une surface indicative n’a de sens
                qu’accompagnée de ses conditions d’utilisation.
              </p>
              <p>
                Consultez notre guide sur{' '}
                <Link href="/conseils/puissance-climatisation-surface">
                  la puissance et la surface
                </Link>{' '}
                pour préparer votre demande.
              </p>
            </section>
          </div>
          <aside className="side-card">
            <h2>Des références confirmées.</h2>
            <p>
              Les prix, accessoires, conditions et disponibilités sont précisés dans la proposition
              commerciale.
            </p>
          </aside>
        </div>
      </div>
      <CTA />
    </>
  );
}
