'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSyncExternalStore, useState } from 'react';
import type { AnalyticsMode } from '@/config/analytics.config';
const Analytics = dynamic(() => import('@vercel/analytics/next').then((m) => m.Analytics), {
  ssr: false,
});
const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights),
  { ssr: false },
);
const event = 'lc:audience-choice';
function subscribe(callback: () => void) {
  window.addEventListener(event, callback);
  return () => window.removeEventListener(event, callback);
}
function snapshot() {
  const value = document.cookie
    .split('; ')
    .find((c) => c.startsWith('lc_audience_v1='))
    ?.split('=')[1];
  return value === 'accepted' || value === 'refused' ? value : null;
}
function cleanUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.origin + parsed.pathname;
  } catch {
    return url.split(/[?#]/)[0];
  }
}
export function AudienceMeasurement({ mode }: { mode: AnalyticsMode }) {
  const choice = useSyncExternalStore(subscribe, snapshot, () => null);
  const [settings, setSettings] = useState(false);
  const [temporary, setTemporary] = useState<string | null>(null);
  const effective = choice ?? temporary;
  function choose(value: 'accepted' | 'refused') {
    const revoke = effective === 'accepted' && value === 'refused';
    document.cookie = `lc_audience_v1=${value}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    setTemporary(value);
    setSettings(false);
    window.dispatchEvent(new Event(event));
    if (revoke) window.location.reload();
  }
  if (mode === 'disabled') return null;
  const allowed = mode === 'exempt' || effective === 'accepted';
  return (
    <>
      {allowed && (
        <>
          <Analytics beforeSend={(e) => ({ ...e, url: cleanUrl(e.url) })} />
          <SpeedInsights beforeSend={(e) => ({ ...e, url: cleanUrl(e.url) })} />
        </>
      )}
      {mode === 'consent' && (
        <>
          <button type="button" className="privacy-settings" onClick={() => setSettings(true)}>
            Choix de confidentialité
          </button>
          {(!effective || settings) && (
            <aside className="privacy-panel" aria-label="Mesure d’audience">
              <div>
                <span className="eyebrow">VOTRE NAVIGATION, VOTRE CHOIX</span>
                <h2>Un regard sur l’essentiel.</h2>
                <p>
                  Autorisez-vous la mesure des visites et des performances avec Vercel ? Ces outils
                  facultatifs restent inactifs sans votre accord.{' '}
                  <Link href="/politique-de-cookies">En savoir plus</Link>.
                </p>
              </div>
              <div className="privacy-actions">
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => choose('refused')}
                >
                  Refuser
                </button>
                <button type="button" className="button" onClick={() => choose('accepted')}>
                  Accepter
                </button>
              </div>
            </aside>
          )}
        </>
      )}
    </>
  );
}
