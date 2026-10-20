import { writeFile, mkdir } from 'node:fs/promises';
const response = await fetch(
  'https://geo.api.gouv.fr/departements/66/communes?fields=nom,code,codesPostaux,centre&format=json',
);
if (!response.ok) throw new Error(`API Géo : ${response.status}`);
const communes = await response.json();
if (
  !Array.isArray(communes) ||
  communes.length < 200 ||
  communes.some((c) => typeof c.nom !== 'string' || !/^66\d{3}$/.test(c.code))
)
  throw new Error('Référentiel communal invalide');
await mkdir('src/data', { recursive: true });
await writeFile(
  'src/data/communes.json',
  JSON.stringify(
    {
      source: 'https://geo.api.gouv.fr/departements/66/communes',
      retrievedAt: new Date().toISOString(),
      communes: communes.sort((a, b) => a.code.localeCompare(b.code)),
    },
    null,
    2,
  ) + '\n',
);
console.log(`${communes.length} communes officielles enregistrées.`);
