import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const required = [
  'portfolio.specialties.title',
  'portfolio.specialties.backend.description',
  'portfolio.education.ads.title',
  'portfolio.contact.title',
  'portfolio.hero.intro',
  'portfolio.projects.noPreview',
  'projetos.merqia.descricao'
];

const get = (object, path) => path.split('.').reduce((current, key) => current?.[key], object);

for (const lang of ['pt', 'en', 'es']) {
  const translations = JSON.parse(read(`src/assets/i18n/${lang}.json`));
  for (const key of required) assert.ok(get(translations, key), `Missing ${lang} translation for ${key}`);
}

const projectTemplate = read('src/app/componentes/paginas/home/sections/projetos/projetos.component.html');
const timelineStyles = read('src/app/componentes/paginas/home/sections/sobre/timeline/timeline.component.scss');
const timelineCode = read('src/app/componentes/paginas/home/sections/sobre/timeline/timeline.component.ts');
const headerStyles = read('src/app/componentes/paginas/home/sections/header/header.component.scss');

assert.ok(!projectTemplate.includes('<iframe'), 'Project previews cannot embed third-party websites');
assert.ok(timelineStyles.includes('max-height: none'), 'Timeline cards must grow with their content');
assert.ok(timelineStyles.includes('overflow: visible'), 'Timeline cards must not scroll internally');
assert.ok(timelineCode.includes('ScrollTrigger'), 'GSAP ScrollTrigger integration must remain intact');
assert.ok(!headerStyles.includes('position: fixed;\n    place-content: center'), 'Header must not be fixed');

process.stdout.write('Portfolio structural checks passed for pt, en and es.\n');
