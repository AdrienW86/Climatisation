'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
const frames = {
  rise: [
    { opacity: 0.65, transform: 'translate3d(0,16px,0)' },
    { opacity: 1, transform: 'translate3d(0,0,0)' },
  ],
  soft: [
    { opacity: 0.75, transform: 'translate3d(0,7px,0)' },
    { opacity: 1, transform: 'translate3d(0,0,0)' },
  ],
  image: [
    { opacity: 0.7, transform: 'translate3d(0,12px,0) scale(.985)' },
    { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' },
  ],
  line: [
    { opacity: 0.5, transform: 'scaleX(.92)' },
    { opacity: 1, transform: 'scaleX(1)' },
  ],
};
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        if (media.matches) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          const effect = element.dataset.reveal as keyof typeof frames;
          const siblings = element.parentElement?.hasAttribute('data-stagger')
            ? [...element.parentElement.children]
            : [];
          const index = Math.max(0, siblings.indexOf(element));
          const delay = Math.min(
            index * 65 + Number.parseFloat(element.style.getPropertyValue('--motion-delay') || '0'),
            240,
          );
          const animation = element.animate(frames[effect] ?? frames.rise, {
            duration: 650,
            delay,
            easing: 'cubic-bezier(.22,1,.36,1)',
            fill: 'backwards',
          });
          animations.add(animation);
          void animation.finished.then(() => animations.delete(animation)).catch(() => {});
        }
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    const reduce = () => {
      if (media.matches) {
        animations.forEach((a) => a.cancel());
        animations.clear();
      }
    };
    media.addEventListener('change', reduce);
    return () => {
      observer.disconnect();
      animations.forEach((a) => a.cancel());
      media.removeEventListener('change', reduce);
    };
  }, [pathname]);
  return null;
}
