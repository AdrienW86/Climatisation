'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './brand/brand-logo';
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <BrandLogo />
        <nav aria-label="Navigation principale" className="desktop-nav">
          <Link
            href="/location-climatiseur"
            aria-current={pathname === '/location-climatiseur' ? 'page' : undefined}
          >
            Nos solutions
          </Link>
          <Link href="/location-climatisation-particuliers">Particuliers</Link>
          <Link href="/location-climatisation-professionnels">Professionnels</Link>
          <Link href="/conseils">Nos conseils</Link>
        </nav>
        <Link className="button nav-cta" href="/demande-de-devis">
          Parlons de votre projet <ArrowUpRight size={16} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        hidden={!open}
        className="mobile-nav"
        aria-label="Navigation mobile"
      >
        {[
          ['Nos solutions', '/location-climatiseur'],
          ['Particuliers', '/location-climatisation-particuliers'],
          ['Professionnels', '/location-climatisation-professionnels'],
          ['Équipements', '/equipements'],
          ['Conseils', '/conseils'],
          ['Contact', '/contact'],
          ['Demander un devis', '/demande-de-devis'],
        ].map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
