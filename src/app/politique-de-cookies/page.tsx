import { Breadcrumb } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
import { analyticsMode } from '@/config/analytics.config';
export const metadata = pageMetadata(
  'Cookies et mesure d’audience',
  'Les outils de mesure, les ressources locales et le fonctionnement du site Location Climatisation.',
  '/politique-de-cookies',
  false,
);
export default function CookiesPage() {
  const mode = analyticsMode();
  return (
    <div className="container">
      <Breadcrumb
        items={[{ label: 'Cookies & mesure d’audience', href: '/politique-de-cookies' }]}
      />
      <div className="page-hero">
        <h1>
          Une navigation
          <br />
          sans détour.
        </h1>
      </div>
      <article className="prose section" style={{ paddingTop: 0 }}>
        <section>
          <h2>Pas de traceur publicitaire</h2>
          <p>
            Le site n’intègre ni publicité, ni pixel de reciblage, ni vidéo provenant d’un lecteur
            tiers. Le formulaire n’utilise pas de cookie de session. Les polices et le contenu vidéo
            sont servis depuis le site.
          </p>
        </section>
        <section>
          <h2>Visites et performances</h2>
          <p>
            {mode === 'disabled'
              ? 'La mesure des visites et des performances est désactivée. Aucun script de ces outils n’est chargé.'
              : mode === 'consent'
                ? 'Les outils Vercel Analytics et Speed Insights ne sont chargés qu’après votre accord. Les boutons Accepter et Refuser proposent deux choix de même niveau. Vous pouvez modifier votre décision via « Choix de confidentialité ».'
                : 'Vercel Analytics et Speed Insights sont chargés dans une configuration dont l’exemption a été évaluée par l’exploitant. Aucune publicité ni mesure entre sites n’est intégrée.'}
          </p>
          <p>
            L’activation de services supplémentaires nécessitera une nouvelle évaluation des
            traceurs et une mise à jour de cette page. Les choix de configuration de l’hébergement
            doivent également être contrôlés avant publication.
          </p>
        </section>
        {mode === 'consent' && (
          <section>
            <h2>Votre préférence</h2>
            <p>
              Un cookie de préférence nommé lc_audience_v1 mémorise l’acceptation ou le refus
              pendant 180 jours. Il sert uniquement à conserver ce choix et ne mesure pas votre
              navigation. En cas de retrait de l’accord, les prochains envois de mesure sont arrêtés
              ; les données déjà transmises ne sont pas effacées automatiquement.
            </p>
          </section>
        )}
        <section>
          <h2>Des critères à vérifier</h2>
          <p>
            L’absence de cookie publicitaire ne démontre pas une exemption de consentement. Les
            finalités, la configuration, les destinataires et les possibilités de recoupement
            doivent être examinés selon les{' '}
            <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience">
              critères de la CNIL
            </a>
            . Toute évolution des outils implique une nouvelle vérification.
          </p>
        </section>
      </article>
    </div>
  );
}
