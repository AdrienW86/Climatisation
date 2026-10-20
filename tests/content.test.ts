import { test } from 'node:test';
import assert from 'node:assert/strict';
import { locations, priorityTowns } from '../src/data/locations';
import { equipment } from '../src/data/equipment';
import { guides } from '../src/content/guides';
import sitemap from '../src/app/sitemap';
import { pageMetadata } from '../src/lib/seo/metadata';
import { canonicalOrigin } from '../src/config/site.config';
test('référentiel officiel complet, slugs uniques et communes prioritaires présentes', () => {
  assert.equal(locations.length, 226);
  assert.equal(new Set(locations.map((l) => l.slug)).size, 226);
  for (const name of priorityTowns) assert.ok(locations.some((l) => l.nom === name));
  for (const l of locations) assert.match(l.code, /^66\d{3}$/);
});
test('aucun faux équipement et chaque guide possède sources et sections', () => {
  assert.equal(equipment.length, 0);
  assert.equal(guides.length, 6);
  for (const g of guides) {
    assert.ok(g.sections.length >= 3);
    assert.ok(g.sources.every((s) => s.url.startsWith('https://')));
    for (const related of g.related) assert.ok(guides.some((r) => r.slug === related));
  }
});
test('aucun sitemap avec domaine inventé ; pages non publiées exclues', () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.deepEqual(sitemap(), []);
    process.env.NEXT_PUBLIC_SITE_URL = 'https://verified.test';
    const entries = sitemap();
    assert.ok(entries.some((e) => e.url.endsWith('/location-climatisation/perpignan')));
    assert.ok(entries.some((e) => e.url.endsWith('/conseils/choisir-climatiseur-location')));
    assert.ok(!entries.some((e) => e.url.endsWith('/climatiseur-mobile')));
    assert.ok(!entries.some((e) => e.url.includes('/location-climatisation/canet-en-roussillon')));
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  }
});
test('canonicals et données sociales utilisent exclusivement une origine HTTPS complète', () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    for (const invalid of ['https://verified.test/path', 'http://verified.test', 'invalid']) {
      process.env.NEXT_PUBLIC_SITE_URL = invalid;
      assert.equal(canonicalOrigin(), undefined);
    }
    process.env.NEXT_PUBLIC_SITE_URL = 'https://verified.test';
    const metadata = pageMetadata('Titre', 'Description', '/contact');
    assert.equal(metadata.alternates?.canonical, 'https://verified.test/contact');
    assert.equal((metadata.robots as { index: boolean }).index, true);
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  }
});
