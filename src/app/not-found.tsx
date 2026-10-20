import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="eyebrow">404 · UN PETIT COURANT D’AIR</span>
      <h1>
        Cette page
        <br />a pris le large.
      </h1>
      <p>Retrouvez nos solutions et nos conseils depuis l’accueil.</p>
      <Link className="button" href="/">
        Retour à l’accueil ↗
      </Link>
    </div>
  );
}
