import { notFound } from 'next/navigation';
import Link from 'next/link';
import { equipment } from '@/data/equipment';
import { Breadcrumb, CTA } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
export const metadata = pageMetadata(
  'Location de climatiseur mobile dans le 66',
  'Découvrez les critères de choix d’un climatiseur mobile en location : évacuation, puissance et contraintes d’installation.',
  '/climatiseur-mobile',
  equipment.some((e) => e.verified && e.category === 'mobile'),
);
export default function MobileAirconPage() {
  if (!equipment.some((e) => e.verified && e.category === 'mobile')) notFound();
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Climatiseur mobile', href: '/climatiseur-mobile' }]} />
        <div className="page-hero">
          <span className="eyebrow">UNE SOLUTION À ÉTUDIER</span>
          <h1>
            La fraîcheur
            <br />
            prend sa place.
          </h1>
          <p>
            Pour un climatiseur mobile, la surface, l’évacuation, le bruit et les accès déterminent
            le choix du matériel.
          </p>
          <Link href="/equipements" className="button">
            Voir les équipements vérifiés →
          </Link>
        </div>
        <div className="prose section">
          <h2>Prévoir le rejet de chaleur</h2>
          <p>
            Un monobloc mobile doit rejeter l’air chaud vers l’extérieur par une gaine compatible
            avec l’ouverture et la notice. Consultez notre{' '}
            <Link href="/conseils/evacuation-air-chaud">guide sur l’évacuation</Link> pour préparer
            votre espace.
          </p>
        </div>
      </div>
      <CTA />
    </>
  );
}
