import { canonicalOrigin } from '@/config/site.config';
import { publicPages } from '@/lib/seo/public-pages';
export function GET() {
  const origin = canonicalOrigin();
  if (!origin) return new Response(null, { status: 404 });
  return new Response(
    '# Location Climatisation\n\n> Étude de projets de location de climatisation à Perpignan et dans les Pyrénées-Orientales.\n\nLes équipements, les tarifs et les modalités sont confirmés dans le devis. Le formulaire ne réserve aucun appareil. Les guides expliquent des principes généraux, distincts du matériel commercialisé.\n\n## Ressources publiques\n' +
      publicPages()
        .map((p) => `- [${p.title}](${origin + p.path})`)
        .join('\n') +
      '\n',
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
}
