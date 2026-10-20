'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container not-found">
      <span className="eyebrow">UNE INTERRUPTION PASSAGÈRE</span>
      <h1>
        Reprenons
        <br />
        notre souffle.
      </h1>
      <p>Cette page n’a pas pu être chargée. Vous pouvez réessayer.</p>
      <button className="button" onClick={reset}>
        Réessayer
      </button>
    </div>
  );
}
