import { readFile, writeFile } from 'node:fs/promises';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
for (const group of ['dependencies', 'devDependencies'])
  for (const name of Object.keys(pkg[group])) {
    const installed = JSON.parse(await readFile('node_modules/' + name + '/package.json', 'utf8'));
    pkg[group][name] = installed.version;
  }
pkg.scripts['test:browser'] = 'playwright test';
pkg.scripts['format'] = 'prettier --write .';
pkg.scripts['format:check'] = 'prettier --check .';
pkg.scripts['brand:generate'] = 'node scripts/generate-brand.mjs';
await writeFile('package.json', JSON.stringify(pkg, null, 2) + '\n');
