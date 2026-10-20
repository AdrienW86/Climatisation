'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRight, LoaderCircle, LockKeyhole } from 'lucide-react';
import { quoteSchema } from '@/lib/quote-schema';
type Errors = Partial<Record<string, string>>;
export function QuoteForm({ enabled }: { enabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const requestId = useRef<string | null>(null);
  const submitting = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || submitting.current) return;
    setStatus(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    requestId.current ??= crypto.randomUUID();
    const payload = Object.fromEntries(data.entries());
    const parsed = quoteSchema.safeParse({
      ...payload,
      consent: data.get('consent') === 'on',
      requestId: requestId.current,
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      const name = String(parsed.error.issues[0]?.path[0]);
      form.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
      return;
    }
    setErrors({});
    setBusy(true);
    submitting.current = true;
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const body: unknown = await response.json();
      const message =
        body && typeof body === 'object' && 'message' in body && typeof body.message === 'string'
          ? body.message
          : 'Le service n’a pas pu traiter votre demande.';
      const success =
        response.ok &&
        typeof body === 'object' &&
        body !== null &&
        'success' in body &&
        body.success === true;
      setStatus({ success, message });
      if (success) {
        form.reset();
        requestId.current = null;
      }
    } catch {
      setStatus({
        success: false,
        message:
          'La connexion a été interrompue. Réessayez avec les mêmes informations ; votre demande ne sera pas envoyée deux fois.',
      });
    } finally {
      setBusy(false);
      submitting.current = false;
    }
  }
  const err = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={name + '-error'}>
        {errors[name]}
      </span>
    ) : null;
  const attrs = (name: string) => ({
    id: name,
    name,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? name + '-error' : undefined,
  });
  return (
    <form className="quote-form" onSubmit={submit} noValidate aria-label="Demande de devis">
      {!enabled && (
        <div className="notice" role="status">
          L’envoi des demandes est actuellement indisponible. Aucune information saisie ici ne sera
          transmise.
        </div>
      )}
      {status && (
        <div
          role={status.success ? 'status' : 'alert'}
          className={'form-status' + (status.success ? '' : ' error')}
        >
          {status.message}
        </div>
      )}
      <fieldset disabled={!enabled || busy}>
        <legend>Faisons connaissance.</legend>
        <div className="form-grid">
          <div className="field full">
            <label htmlFor="name">Nom et prénom *</label>
            <input {...attrs('name')} autoComplete="name" maxLength={100} required />
            {err('name')}
          </div>
          <div className="field">
            <label htmlFor="email">Adresse email *</label>
            <input {...attrs('email')} type="email" autoComplete="email" maxLength={254} required />
            {err('email')}
          </div>
          <div className="field">
            <label htmlFor="phone">Téléphone *</label>
            <input {...attrs('phone')} type="tel" autoComplete="tel" maxLength={30} required />
            {err('phone')}
          </div>
          <div className="field">
            <label htmlFor="town">Commune *</label>
            <input {...attrs('town')} autoComplete="address-level2" maxLength={100} required />
            {err('town')}
          </div>
          <div className="field">
            <label htmlFor="profile">Vous êtes… *</label>
            <select {...attrs('profile')} required defaultValue="">
              <option value="" disabled>
                Sélectionner
              </option>
              <option value="particulier">Un particulier</option>
              <option value="professionnel">Un professionnel</option>
            </select>
            {err('profile')}
          </div>
        </div>
        <div className="form-divider" />
        <h2 className="form-section-title">Parlons de votre besoin.</h2>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="need">Type de besoin *</label>
            <select {...attrs('need')} required defaultValue="">
              <option value="" disabled>
                Sélectionner
              </option>
              <option value="logement">Maison / appartement</option>
              <option value="bureau">Bureau</option>
              <option value="commerce">Commerce / local professionnel</option>
              <option value="hebergement">Hébergement saisonnier</option>
              <option value="autre">Autre projet à étudier</option>
            </select>
            {err('need')}
          </div>
          <div className="field">
            <label htmlFor="area">Surface approximative (m²)</label>
            <input {...attrs('area')} inputMode="decimal" maxLength={20} />
            {err('area')}
          </div>
          <div className="field full">
            <label htmlFor="period">Période de location envisagée *</label>
            <input {...attrs('period')} maxLength={200} required />
            <p style={{ fontSize: 10, marginTop: 5 }}>
              Précisez vos dates ou la durée souhaitée, même approximatives.
            </p>
            {err('period')}
          </div>
          <div className="field full">
            <label htmlFor="message">Informations complémentaires</label>
            <textarea {...attrs('message')} maxLength={3000} rows={4} />
            <p style={{ fontSize: 10, marginTop: 5 }}>
              Exposition, ouvertures, étage, contraintes de bruit…
            </p>
            {err('message')}
          </div>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Site internet</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="consent" htmlFor="consent">
          <input {...attrs('consent')} type="checkbox" required />
          <span>
            J’accepte que mes données soient utilisées pour étudier et traiter ma demande, selon la{' '}
            <Link href="/politique-de-confidentialite">politique de confidentialité</Link>. *
          </span>
        </label>
        {err('consent')}
        <button className="button" type="submit" disabled={!enabled || busy}>
          {busy ? (
            <>
              <LoaderCircle size={17} className="animate-spin" /> Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande <ArrowUpRight size={18} />
            </>
          )}
        </button>
        <p className="form-footnote">
          <LockKeyhole size={11} style={{ display: 'inline', marginRight: 5 }} /> Vos informations
          servent uniquement au suivi de votre demande.
          <br />
          Les champs marqués d’un * sont obligatoires. Aucun engagement de réservation.
        </p>
      </fieldset>
    </form>
  );
}
