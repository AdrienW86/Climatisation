import { Breadcrumb } from '@/components/ui';
import { business, legalReady } from '@/config/business.config';
import { pageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { analyticsMode } from '@/config/analytics.config';
import { quoteReady } from '@/lib/email/config';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata(
  'Politique de confidentialité',
  'Informations sur le formulaire, les données de contact et la mesure d’audience du site Location Climatisation.',
  '/politique-de-confidentialite',
  false,
);
export default function PrivacyPage() {
  const ready = legalReady();
  const mode = analyticsMode();
  const active = quoteReady();
  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Confidentialité', href: '/politique-de-confidentialite' }]} />
      <div className="page-hero">
        <h1>
          Vos données,
          <br />
          en toute clarté.
        </h1>
        <p>Cette page décrit les usages des données sur le site. Mise à jour : 20 octobre 2026.</p>
      </div>
      <article className="prose section" style={{ paddingTop: 0 }}>
        <section>
          <h2>Demandes de devis</h2>
          <p>
            {active
              ? 'L’envoi de demandes de devis est activé.'
              : 'L’envoi de demandes de devis est désactivé. Aucune information saisie dans ce formulaire n’est transmise.'}
          </p>
          {ready ? (
            <>
              <p>
                Le responsable du traitement est {business.operator}, exploitant de {business.name},
                joignable à {business.email} ou à {business.address}.
              </p>
              <p>
                Le formulaire recueille votre nom, email, téléphone, commune, profil, besoin,
                période, surface facultative et message. Ces informations servent à répondre à votre
                demande et à préparer les échanges précontractuels que vous sollicitez. Elles ne
                sont pas utilisées pour vous inscrire à une liste publicitaire.
              </p>
              <p>
                La base juridique est la mise en œuvre de mesures précontractuelles à votre demande.
                La case du formulaire matérialise votre accord à la transmission des informations et
                votre prise de connaissance de cette politique.
              </p>
              <p>
                Les informations sont reçues par l’exploitant et les personnes habilitées au
                traitement des demandes. La durée de conservation opérationnelle retenue est de{' '}
                {business.retentionMonths} mois après le dernier échange, hors obligations légales
                applicables à une relation commerciale ultérieure. Cette durée s’applique aux
                messages et à leurs copies gérées par l’exploitant.
              </p>
            </>
          ) : (
            <p>
              Le formulaire est désactivé tant que les informations nécessaires à son exploitation
              ne sont pas validées. Aucune donnée saisie dans ce formulaire n’est transmise. Le site
              ne propose ni compte utilisateur ni inscription publicitaire.
            </p>
          )}
        </section>
        <section>
          <h2>Protection technique du formulaire</h2>
          <p>
            Lorsque l’envoi est activé, Resend assure la transmission des emails de notification et
            de confirmation. Une protection partagée via Redis conserve des empreintes
            cryptographiques de l’adresse email, de l’adresse réseau et du contenu de la demande,
            sans enregistrer ces valeurs en clair dans ses clés. Les limites expirent après 15
            minutes, les verrous après 120 secondes et les accusés techniques après 24 heures.
          </p>
          <p>
            La notification acceptée et l’email de confirmation font l’objet de suivis distincts.
            Les journaux applicatifs ne contiennent pas le contenu des demandes ; ils peuvent
            contenir l’identifiant technique d’un message ou le type d’échec.
          </p>
        </section>
        <section>
          <h2>Hébergement, prestataires et sécurité</h2>
          <p>
            L’hébergement peut traiter les adresses réseau et journaux techniques nécessaires au
            fonctionnement et à la sécurité du service. Quand le formulaire est activé, l’hébergeur,
            Resend et le prestataire Redis interviennent comme prestataires techniques. Leurs
            contrats, régions de traitement, durées de conservation propres et éventuels mécanismes
            de transfert doivent être validés par l’exploitant avant l’ouverture du service.
          </p>
          <p>
            N’inscrivez pas de données sensibles ni d’informations sur la santé dans votre message.
          </p>
        </section>
        <section>
          <h2>Mesure d’audience</h2>
          <p>
            {mode === 'disabled'
              ? 'La mesure d’audience est désactivée sur cette configuration. Aucun script Vercel Analytics ou Speed Insights n’est chargé.'
              : mode === 'consent'
                ? 'Vercel Analytics et Speed Insights sont facultatifs. Ils ne sont chargés qu’après votre accord. Vous pouvez refuser ou modifier votre choix à tout moment via « Choix de confidentialité ». Le refus ne change pas l’accès au site.'
                : 'La mesure des visites et des performances est activée dans un mode d’exemption évalué par l’exploitant. Elle n’est pas utilisée pour la publicité ni le suivi entre sites.'}
          </p>
          <p>
            Les polices et les visuels de marque sont servis localement. Aucun lecteur vidéo tiers
            n’est intégré.
          </p>
        </section>
        <section>
          <h2>Prestataires et transferts internationaux</h2>
          <p>
            L’hébergement prévu est Vercel Inc., aux États-Unis. Selon le service activé, Resend et
            le fournisseur Redis peuvent également recourir à des infrastructures ou sous-traitants
            hors de l’Union européenne. Une région européenne ne garantit pas à elle seule l’absence
            de transfert. Les garanties applicables relèvent des contrats conclus et, le cas
            échéant, des clauses contractuelles types et mesures complémentaires.
          </p>
          <p>
            Les liens suivants décrivent les engagements des prestataires ; ils ne constituent pas
            une garantie que toutes les options ont été souscrites :{' '}
            <a href="https://vercel.com/legal/dpa">accord Vercel</a> et{' '}
            <a href="https://resend.com/legal/dpa">accord Resend</a> et, si ce fournisseur est
            retenu, <a href="https://upstash.com/trust/dpa.pdf">accord Upstash</a>. Les paramètres
            effectifs de la messagerie, de Redis et des journaux doivent correspondre à
            l’information communiquée lors de l’ouverture du service.
          </p>
        </section>
        <section>
          <h2>Vos droits</h2>
          <p>
            Selon les conditions applicables, vous pouvez demander l’accès, la rectification,
            l’effacement ou la limitation des données vous concernant, ainsi que leur portabilité et
            vous opposer à certains traitements. Vous pouvez introduire une réclamation auprès de la{' '}
            <a href="https://www.cnil.fr/fr/plaintes" rel="noreferrer">
              CNIL
            </a>
            .
          </p>
          {ready && (
            <p>
              Pour exercer vos droits, écrivez à{' '}
              <a href={'mailto:' + business.email}>{business.email}</a>. Seules les informations
              nécessaires pour vérifier votre identité seront demandées.
            </p>
          )}
          <p>
            <Link href="/politique-de-cookies">
              Consulter les informations sur les cookies et la mesure d’audience.
            </Link>
          </p>
        </section>
      </article>
    </div>
  );
}
