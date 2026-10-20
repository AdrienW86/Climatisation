import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  effect?: 'rise' | 'soft' | 'image' | 'line';
};
export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  effect = 'rise',
}: MotionProps) {
  return (
    <div
      className={className}
      data-reveal={effect}
      style={{ '--motion-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
export function StaggerContainer({
  children,
  className = '',
}: Pick<MotionProps, 'children' | 'className'>) {
  return (
    <div className={className} data-stagger>
      {children}
    </div>
  );
}
export function AnimatedHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: Pick<MotionProps, 'children' | 'className'> & { as?: 'h1' | 'h2' | 'h3' }) {
  return (
    <Tag className={className} data-reveal="soft">
      {children}
    </Tag>
  );
}
export function AnimatedCard({
  children,
  className = '',
  href,
}: Pick<MotionProps, 'children' | 'className'> & { href: string }) {
  return (
    <Link href={href} className={className} data-reveal="image">
      {children}
    </Link>
  );
}
export function AnimatedSection({
  children,
  className = '',
  id,
}: Pick<MotionProps, 'children' | 'className'> & { id?: string }) {
  return (
    <section id={id} className={className} data-reveal="soft">
      {children}
    </section>
  );
}
