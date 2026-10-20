import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './brand/brand-logo';
import { legalReady } from '@/config/business.config';
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <BrandLogo dark />
            <p>
              Le confort, le temps qu’il vous faut.
              <br />
              Perpignan & Pyrénées-Orientales.
            </p>
          </div>
          <div>
            <span className="footer-label">VOTRE PROJET</span>
            <Link href="/location-climatisation-particuliers">Pour les particuliers</Link>
            <Link href="/location-climatisation-professionnels">Pour les professionnels</Link>
            <Link href="/equipements">Les équipements</Link>
          </div>
          <div>
            <span className="footer-label">À DÉCOUVRIR</span>
            <Link href="/location-climatiseur">La location, comment ça marche ?</Link>
            <Link href="/conseils">Le carnet fraîcheur</Link>
            <Link href="/contact">
              Nous contacter <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Location Climatisation</span>
          <div>
            {legalReady() && <Link href="/mentions-legales">Mentions légales</Link>}
            <Link href="/politique-de-confidentialite">Confidentialité</Link>
            <Link href="/politique-de-cookies">Cookies & mesure d’audience</Link>
          </div>
          <span>Un peu plus d’air. Un peu plus de bien-être.</span>
        </div>
      </div>
    </footer>
  );
}
