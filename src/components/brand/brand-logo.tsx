import Link from 'next/link';
export function BrandSymbol({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M14 32c0-10 8-18 18-18h18c0 10-8 18-18 18H14Z" fill="currentColor" />
      <path d="M50 37c0 10-8 18-18 18H14c0-10 8-18 18-18h18Z" fill="currentColor" opacity=".55" />
      <path d="M9 24C9 13 18 4 29 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
export function BrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Location Climatisation — accueil"
      className={`brand ${dark ? 'brand-light' : ''}`}
    >
      <BrandSymbol />
      <span>
        location
        <span className="brand-second">
          climatisation<span className="brand-dot">.</span>
        </span>
      </span>
    </Link>
  );
}
