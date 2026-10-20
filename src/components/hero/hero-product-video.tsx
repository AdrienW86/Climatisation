'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play, Wind } from 'lucide-react';
type Props = {
  mp4?: string;
  webm?: string;
  poster?: string;
  posterAlt: string;
  autoPlay?: boolean;
  loop?: boolean;
  description?: string;
};
function AirSculpture() {
  return (
    <div
      className="air-sculpture"
      role="img"
      aria-label="Création abstraite de marque : trois courbes d’air bleu glacier"
    >
      <div className="sculpture-ring ring-one" />
      <div className="sculpture-ring ring-two" />
      <div className="sculpture-ring ring-three" />
      <div className="sculpture-shadow" />
    </div>
  );
}
export function HeroProductVideo({
  mp4,
  webm,
  poster,
  posterAlt,
  autoPlay = true,
  loop = true,
  description = 'La présentation visuelle complète les informations de cette page. Le choix du matériel dépend de votre espace, de ses contraintes et des caractéristiques vérifiées de l’équipement.',
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasFrames, setHasFrames] = useState(false);
  const hasVideo = Boolean((mp4 || webm) && !failed);
  const requested = hasVideo && (allowed || manual);
  const active = requested && !paused;
  useEffect(() => {
    if (requested) ref.current?.load();
  }, [requested, mp4, webm]);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 767px)');
    const update = () =>
      setAllowed(
        autoPlay &&
          !motion.matches &&
          !mobile.matches &&
          !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
      );
    update();
    motion.addEventListener('change', update);
    mobile.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      mobile.removeEventListener('change', update);
    };
  }, [autoPlay]);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!active) {
      video.pause();
      return;
    }
    let visible = false;
    const play = () => {
      if (visible && !document.hidden) void video.play().catch(() => setPlaying(false));
      else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        play();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', play);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', play);
      video.pause();
    };
  }, [active, mp4, webm]);
  function toggleVideo() {
    if (playing) {
      setPaused(true);
      ref.current?.pause();
    } else {
      setPaused(false);
      setManual(true);
      if (active) void ref.current?.play().catch(() => setPlaying(false));
    }
  }
  return (
    <div className="hero-visual">
      <div className="visual-top">
        <span>
          <i /> L’ESSENTIEL : VOTRE CONFORT
        </span>
        <Wind size={20} />
      </div>
      <div className={'visual-art' + (hasVideo ? ' visual-art-video' : '')}>
        {(!hasVideo || !hasFrames) && !poster && <AirSculpture />}
        {hasVideo ? (
          <>
            <video
              ref={ref}
              muted
              playsInline
              loop={loop}
              poster={poster}
              preload="none"
              className={hasFrames || poster ? 'product-video' : 'product-video video-unloaded'}
              onLoadedData={() => setHasFrames(true)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
              aria-label={posterAlt}
            >
              {requested && (
                <>
                  {webm && <source src={webm} type="video/webm" />}
                  {mp4 && <source src={mp4} type="video/mp4" />}
                </>
              )}
            </video>
          </>
        ) : poster ? (
          <Image
            src={poster}
            alt={posterAlt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ) : null}
        {!hasVideo && !poster && (
          <div className="art-caption">
            <span>
              UN SOUFFLE
              <br />
              DE FRAÎCHEUR.
            </span>
            <ArrowDown size={26} strokeWidth={1} />
          </div>
        )}
      </div>
      <div className="visual-bottom">
        <span>
          Le confort se ressent.
          <br />
          <strong>La différence aussi.</strong>
        </span>
        {hasVideo ? (
          <button type="button" className="video-control" onClick={toggleVideo}>
            {playing ? <Pause size={16} /> : <Play size={16} />}{' '}
            {playing ? 'Mettre en pause' : 'Lire la présentation'}
          </button>
        ) : (
          <span className="visual-tag">
            L’ESPRIT TRANQUILLE <span>↗</span>
          </span>
        )}
      </div>
      {hasVideo ? (
        <details className="video-description">
          <summary>Lire la présentation en texte</summary>
          <p>{description}</p>
        </details>
      ) : (
        <p className="visual-disclaimer">
          {poster ? 'Visuel de présentation' : 'Univers de marque · illustration abstraite'}
        </p>
      )}
    </div>
  );
}
