import { AnimatedCard, AnimatedHeading, StaggerContainer } from '@/components/motion/animated';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Wind,
  Home,
  Building2,
  MapPin,
  SlidersHorizontal,
  CalendarDays,
  MoveUpRight,
} from 'lucide-react';
import { HeroProductVideo } from '@/components/hero/hero-product-video';
import { heroMedia } from '@/lib/media';
import { site } from '@/config/site.config';
import { CTA, FAQ } from '@/components/ui';
import { pageMetadata } from '@/lib/seo/metadata';
import { locations } from '@/data/locations';
import { guides } from '@/content/guides';
export const metadata = pageMetadata(
  'Location climatisation à Perpignan et dans le 66',
  'Particuliers et professionnels : préparez votre location de climatisation à Perpignan et dans les Pyrénées-Orientales. Conseils et étude de votre projet.',
  '/',
);
export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="status-dot" /> LA FRAÎCHEUR A UNE ADRESSE. LA VÔTRE.
          </div>
          <h1>
            L’été dehors.
            <br />
            Le{' '}
            <span className="cool-word">
              confort
              <svg viewBox="0 0 340 20" aria-hidden="true">
                <path
                  d="M3 14C95 1 230 2 336 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            dedans.
            <span className="hero-title-context">
              Location de climatisation à <strong>Perpignan</strong>
              <br className="desktop-break" /> et dans les <strong>Pyrénées-Orientales.</strong>
            </span>
          </h1>
          <p className="hero-description">
            Pour votre intérieur ou votre activité, imaginez un été plus agréable. Une solution à
            étudier, le temps de votre besoin.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/demande-de-devis">
              Demander un devis <ArrowUpRight size={19} />
            </Link>
            <Link className="text-link" href="#solutions">
              Découvrir les solutions <ArrowDown size={16} />
            </Link>
          </div>
          <div className="hero-foot">
            <span>
              <MapPin size={15} /> Ancré dans le 66
            </span>
            <span>
              <Home size={15} /> Particuliers & professionnels
            </span>
          </div>
        </div>
        <HeroProductVideo
          {...heroMedia()}
          autoPlay
          loop
          posterAlt={site.video.posterAlt}
          description={site.video.description}
        />
      </section>
      <div className="values-strip">
        <div className="container">
          <span>
            <Wind /> Du confort à la demande
          </span>
          <span>
            <CalendarDays /> Pour un besoin temporaire
          </span>
          <span>
            <SlidersHorizontal /> Un projet qui vous ressemble
          </span>
          <a href="#fonctionnement">
            La location, en toute simplicité <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <section className="section container" id="solutions">
        <div className="section-heading">
          <div>
            <span className="eyebrow">À CHAQUE ESPACE, SON SOUFFLE</span>
            <AnimatedHeading>
              Votre quotidien.
              <br />
              En plus frais.
            </AnimatedHeading>
          </div>
          <p>
            Un besoin ponctuel, un espace à rafraîchir.
            <br />
            Commençons par ce qui compte pour vous.
          </p>
        </div>
        <StaggerContainer className="audience-grid">
          <AnimatedCard
            href="/location-climatisation-particuliers"
            className="audience-card home-card"
          >
            <div className="card-top">
              <span>01 / PARTICULIERS</span>
              <Home size={24} strokeWidth={1.3} />
            </div>
            <div className="room-art" aria-hidden="true">
              <div className="room-window" />
              <div className="room-sun" />
              <div className="room-sofa" />
              <div className="room-table" />
              <div className="room-plant" />
            </div>
            <div className="audience-copy">
              <h3>
                Bien chez vous.
                <br />
                Même en plein été.
              </h3>
              <p>
                Appartement, maison, séjour saisonnier :<br />
                parlons de votre espace de vie.
              </p>
              <span className="round-arrow">
                <ArrowUpRight />
              </span>
            </div>
          </AnimatedCard>
          <AnimatedCard
            href="/location-climatisation-professionnels"
            className="audience-card work-card"
          >
            <div className="card-top">
              <span>02 / PROFESSIONNELS</span>
              <Building2 size={24} strokeWidth={1.3} />
            </div>
            <div className="office-art" aria-hidden="true">
              <div className="office-glass" />
              <div className="office-desk" />
              <div className="office-screen" />
              <div className="office-seat" />
            </div>
            <div className="audience-copy">
              <h3>
                Le confort travaille
                <br />
                aussi avec vous.
              </h3>
              <p>
                Bureaux, commerces, locaux :<br />
                votre activité mérite un air plus agréable.
              </p>
              <span className="round-arrow">
                <ArrowUpRight />
              </span>
            </div>
          </AnimatedCard>
        </StaggerContainer>
        <div className="solutions-note" data-reveal="line">
          <Wind size={22} />
          <p>
            <strong>La bonne solution commence par le bon échange.</strong> Puissance, évacuation,
            bruit : étudions les contraintes de votre lieu avant de choisir un équipement.
          </p>
          <Link href="/equipements">
            Explorer les solutions <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="philosophy">
        <div className="container philosophy-grid">
          <div className="philosophy-symbol" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <span className="eyebrow">MOINS DE CONTRAINTES. PLUS DE CONFORT.</span>
            <AnimatedHeading>
              Pas besoin de posséder
              <br />
              pour se sentir bien.
            </AnimatedHeading>
            <p>
              La location permet d’envisager une réponse à un besoin temporaire, sans acheter un
              appareil destiné à un usage ponctuel.
            </p>
            <div className="benefit-list">
              <div>
                <span>01</span>
                <div>
                  <h3>La durée de votre projet</h3>
                  <p>
                    Une période à définir en fonction de votre besoin et des conditions proposées.
                  </p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Le choix en connaissance de cause</h3>
                  <p>Les caractéristiques du lieu guident le choix, au-delà de la seule surface.</p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <h3>Un cadre clair avant de commencer</h3>
                  <p>Matériel, tarif et modalités sont à confirmer ensemble dans le devis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section container" id="fonctionnement">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DE L’IDÉE AU CONFORT</span>
            <AnimatedHeading>On fait simple.</AnimatedHeading>
          </div>
          <Link className="text-link" href="/demande-de-devis">
            Parlons de votre projet <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="steps" data-stagger>
          {[
            [
              '01',
              'Racontez-nous votre besoin.',
              'Votre lieu, votre période, votre surface. Quelques informations pour comprendre votre projet.',
            ],
            [
              '02',
              'Étudions la bonne solution.',
              'Les contraintes techniques et les équipements disponibles permettent de préciser la proposition.',
            ],
            [
              '03',
              'Validez en toute clarté.',
              'Un devis détaille le matériel et les modalités retenus avant tout engagement.',
            ],
          ].map(([n, title, text]) => (
            <div key={n} data-reveal="rise">
              <span className="step-number">
                {n}
                <MoveUpRight size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="local-section">
        <div className="container local-grid">
          <div>
            <span className="eyebrow">ICI, DANS LES PYRÉNÉES-ORIENTALES</span>
            <AnimatedHeading>
              Le soleil du Sud.
              <br />
              Le confort en plus.
            </AnimatedHeading>
            <p>
              À Perpignan et dans le département 66, chaque projet commence par votre commune. Les
              modalités de prise en charge sont étudiées selon votre adresse et votre besoin.
            </p>
            <div className="town-links">
              {locations
                .filter((l) => l.priority)
                .slice(0, 9)
                .map((l) =>
                  l.published ? (
                    <Link href={'/location-climatisation/' + l.slug} key={l.code}>
                      {l.nom}
                      <ArrowUpRight size={13} />
                    </Link>
                  ) : (
                    <span key={l.code}>{l.nom}</span>
                  ),
                )}
            </div>
            <Link className="text-link" href="/contact">
              Et votre commune ? Parlons-en <ArrowUpRight size={18} />
            </Link>
          </div>
          <div
            className="local-art"
            role="img"
            aria-label="Composition géographique abstraite des Pyrénées-Orientales"
          >
            <div className="map-contour contour-one" />
            <div className="map-contour contour-two" />
            <div className="map-contour contour-three" />
            <span className="map-sea">MÉDITERRANÉE</span>
            <span className="map-label">
              <MapPin size={19} /> Perpignan
            </span>
            <span className="map-number">
              66
              <span>
                LE CONFORT
                <br />
                PREND L’AIR.
              </span>
            </span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LE CARNET FRAÎCHEUR</span>
            <AnimatedHeading>
              Bien choisir.
              <br />
              Mieux en profiter.
            </AnimatedHeading>
          </div>
          <Link className="text-link" href="/conseils">
            Tous nos conseils <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="guide-grid" data-stagger>
          {guides.slice(0, 3).map((g, i) => (
            <Link
              href={'/conseils/' + g.slug}
              className="guide-card"
              data-reveal="image"
              key={g.slug}
            >
              <div className={'guide-art guide-art-' + i}>
                <span>
                  {['LE BON\nCHOIX.', 'LA JUSTE\nMESURE.', 'L’AIR\nCIRCULE.'][i]
                    .split('\n')
                    .map((t) => (
                      <span key={t}>
                        {t}
                        <br />
                      </span>
                    ))}
                </span>
                <div aria-hidden="true" />
              </div>
              <div className="guide-meta">
                {g.category} <span>{g.readingMinutes} MIN DE LECTURE</span>
              </div>
              <h3>{g.title}</h3>
              <span className="text-link">
                Lire le guide <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
