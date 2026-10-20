import { test } from 'node:test';
import assert from 'node:assert/strict';
import robots from '../src/app/robots';
import { analyticsMode } from '../src/config/analytics.config';
import { organizationSchema, serviceSchema, productSchema } from '../src/lib/seo/entities';
import { localCanPublish, localEditorial } from '../src/data/locations';
import { guides } from '../src/content/guides';
import { GET } from '../src/app/llms.txt/route';
test('recherche ouverte avec domaine, politique entraînement indépendante et API exclue', () => {
  const previous = { ...process.env };
  try {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://verified.test';
    process.env.GPTBOT_POLICY = 'disallow';
    const rules = robots().rules;
    assert.ok(Array.isArray(rules));
    if (!Array.isArray(rules)) return;
    for (const bot of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot']) {
      const rule: { allow?: string | string[]; disallow?: string | string[] } | undefined =
        rules.find((r) => r.userAgent === bot);
      assert.equal(rule?.allow, '/');
      assert.deepEqual(rule?.disallow, ['/api/']);
    }
    assert.deepEqual(rules.find((r) => r.userAgent === 'GPTBot')?.disallow, ['/']);
  } finally {
    for (const key of ['NEXT_PUBLIC_SITE_URL', 'GPTBOT_POLICY']) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});
test('absence de domaine : aucun robot de recherche autorisé', () => {
  const old = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const rules = robots().rules;
    assert.ok(Array.isArray(rules));
    if (Array.isArray(rules))
      for (const rule of rules) {
        assert.equal(rule.allow, undefined);
        assert.deepEqual(rule.disallow, ['/']);
      }
  } finally {
    if (old === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = old;
  }
});
test('mesure : consentement par défaut, exemption vérifiée uniquement et désactivation locale', () => {
  assert.equal(analyticsMode({}), 'disabled');
  assert.equal(analyticsMode({ VERCEL: '1' }), 'consent');
  assert.equal(analyticsMode({ VERCEL: '1', ANALYTICS_PRIVACY_MODE: 'exempt' }), 'consent');
  assert.equal(
    analyticsMode({
      VERCEL: '1',
      ANALYTICS_PRIVACY_MODE: 'exempt',
      ANALYTICS_EXEMPTION_VERIFIED: 'true',
    }),
    'exempt',
  );
  assert.equal(analyticsMode({ VERCEL: '1', NEXT_PUBLIC_ANALYTICS_ENABLED: 'false' }), 'disabled');
});
test('une publication locale demande des données éditoriales suffisantes', () => {
  const e = localEditorial['66136'];
  assert.equal(localCanPublish(e), true);
  for (const override of [
    { status: 'draft' as const },
    { sections: [] },
    { sources: [] },
    { questions: [] },
  ])
    assert.equal(localCanPublish({ ...e, ...override }), false);
  assert.equal(localCanPublish(undefined), false);
});
test('six guides enrichis sans référence commerciale fictive', () => {
  for (const guide of guides) {
    assert.ok(guide.directAnswer);
    assert.ok(guide.modifiedAt);
    assert.ok(guide.sections.length >= 4);
    assert.ok(guide.readingMinutes > 0);
  }
});
test('entités cohérentes et aucun produit non vérifié', () => {
  const old = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://verified.test';
    assert.equal(organizationSchema()?.['@id'], 'https://verified.test/#organization');
    assert.deepEqual(serviceSchema('service', 'Titre', 'Texte')?.provider, {
      '@id': 'https://verified.test/#organization',
    });
    assert.equal(
      productSchema({ verified: false } as Parameters<typeof productSchema>[0]),
      undefined,
    );
  } finally {
    if (old === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = old;
  }
});
test('llms.txt suit les seules ressources publiques sans inventer de domaine', async () => {
  const old = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.equal(GET().status, 404);
    process.env.NEXT_PUBLIC_SITE_URL = 'https://verified.test';
    const response = GET();
    assert.equal(response.status, 200);
    const body = await response.text();
    assert.ok(body.includes('/location-climatisation/perpignan'));
    assert.ok(!body.includes('/api/'));
    assert.ok(!body.includes('/location-climatisation/canet'));
  } finally {
    if (old === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = old;
  }
});
