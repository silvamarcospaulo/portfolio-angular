import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const targets = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop-compact', width: 1366, height: 768 },
  { name: 'desktop-large', width: 1920, height: 1080 }
];

mkdirSync('test-results', { recursive: true });

try {
  for (const target of targets) {
    const page = await browser.newPage({
      viewport: { width: target.width, height: target.height },
      reducedMotion: 'no-preference'
    });

    await page.goto('http://127.0.0.1:4000/', { waitUntil: 'networkidle' });
    await page.locator('.timeline-item').first().waitFor();
    await page.evaluate(() => document.fonts.ready);

    const structure = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.timeline-container'));
      return {
        cards: cards.length,
        cardScrolls: cards.some(card => ['auto', 'scroll'].includes(getComputedStyle(card).overflowY)),
        horizontalPageOverflow: document.documentElement.scrollWidth > window.innerWidth + 4
      };
    });

    const background = await page.evaluate(() => {
      const sections = ['#section-inicio', '#section-sobre', '#section-projetos', '#section-especialidades', '#section-formacao', '#section-contato'];
      const base = getComputedStyle(document.body).backgroundColor;
      const actual = sections.map(selector => {
        const section = document.querySelector(selector);
        if (!section) throw new Error(`Missing section: ${selector}`);
        let element = section;
        let color = 'rgba(0, 0, 0, 0)';
        while (element) {
          const current = getComputedStyle(element).backgroundColor;
          if (current !== 'rgba(0, 0, 0, 0)' && current !== 'transparent') {
            color = current;
            break;
          }
          element = element.parentElement;
        }
        return { selector, color };
      });
      const fade = getComputedStyle(document.querySelector('.timeline-viewport'));
      return { base, actual, fadeMask: fade.maskImage || fade.webkitMaskImage };
    });

    for (const section of background.actual) {
      assert.equal(section.color, background.base, `Section ${section.selector} uses a different background on ${target.name}`);
    }
    if (target.width >= 1024) {
      assert.ok(background.fadeMask.includes('linear-gradient'), `Timeline edge fade has no gradient on ${target.name}`);
    }

    assert.ok(structure.cards >= 4, `Expected all career cards for ${target.name}`);
    assert.ok(!structure.cardScrolls, `Career cards may not scroll internally on ${target.name}`);
    if (structure.horizontalPageOverflow) {
      const offenders = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(element => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return bounds.width > innerWidth + 4 && style.position !== 'fixed';
      }).slice(0, 12).map(element => ({
        name: element.tagName.toLowerCase(),
        id: element.id,
        className: String(element.className).slice(0, 60),
        width: Math.round(element.getBoundingClientRect().width)
      })));
      process.stdout.write(`Overflow on ${target.name}: document ${await page.evaluate(() => document.documentElement.scrollWidth)}px, offenders ${JSON.stringify(offenders)}\\n`);
    }
    assert.ok(!structure.horizontalPageOverflow, `Unexpected document overflow on ${target.name}`);

    await page.screenshot({ path: `test-results/${target.name}-hero.png`, fullPage: false });
    await page.locator('.career-timeline').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${target.name}-timeline.png`, fullPage: false });

    if (target.width < 1024) {
      const details = page.locator('.timeline-details').first();
      const description = page.locator('.descricao').first();
      await details.click();
      assert.equal(await details.getAttribute('aria-expanded'), 'true', `Career details did not expand on ${target.name}`);
      assert.ok(await description.evaluate(element => element.classList.contains('descricao--expanded')), `Career description is not expanded on ${target.name}`);
      await details.click();
      assert.equal(await details.getAttribute('aria-expanded'), 'false', `Career details did not collapse on ${target.name}`);
    }

    if (target.width >= 1024 && target.height > 700) {
      const timeline = page.locator('.timeline');
      const initial = await timeline.evaluate(element => getComputedStyle(element).transform);
      await page.mouse.wheel(0, 650);
      await page.waitForTimeout(1100);
      const moved = await timeline.evaluate(element => getComputedStyle(element).transform);
      assert.notEqual(moved, initial, `GSAP horizontal scroll did not advance on ${target.name}`);
      await page.screenshot({ path: `test-results/${target.name}-timeline-scrolled.png`, fullPage: false });

      const trackBounds = await timeline.evaluate(element => {
        const viewport = element.parentElement;
        return { totalWidth: element.scrollWidth, visibleWidth: viewport?.clientWidth ?? 0 };
      });
      assert.ok(trackBounds.totalWidth > trackBounds.visibleWidth, `Horizontal timeline has no scrollable distance on ${target.name}`);

      const afterScroll = await page.evaluate(() => ({
        horizontalPageOverflow: document.documentElement.scrollWidth > innerWidth + 4,
        activeCards: document.querySelectorAll('.timeline-item.is-active').length
      }));
      assert.ok(!afterScroll.horizontalPageOverflow, `Horizontal scroll introduced page overflow on ${target.name}`);
      assert.equal(afterScroll.activeCards, 1, `Timeline must highlight exactly one career card on ${target.name}`);
      const visibleCard = await page.evaluate(() => {
        const card = document.querySelector('.timeline-item.is-active .timeline-container');
        if (!card) return null;
        const rect = card.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom, height: innerHeight };
      });
      if (visibleCard) assert.ok(visibleCard.top >= -4 && visibleCard.bottom <= visibleCard.height + 4, `Centered career card is vertically clipped on ${target.name}: ${JSON.stringify(visibleCard)}`);
    }

    await page.locator('#section-projetos').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${target.name}-projects.png`, fullPage: false });

    await page.close();

    if (target.width >= 1024) {
      const reducedPage = await browser.newPage({
        viewport: { width: target.width, height: target.height },
        reducedMotion: 'reduce'
      });
      await reducedPage.goto('http://127.0.0.1:4000/', { waitUntil: 'networkidle' });
      await reducedPage.locator('.timeline-item').first().waitFor();
      const reduced = await reducedPage.locator('.timeline-viewport').evaluate(element => ({
        overflowX: getComputedStyle(element).overflowX,
        pageOverflow: document.documentElement.scrollWidth > innerWidth + 4
      }));
      assert.ok(['auto', 'scroll'].includes(reduced.overflowX), `Reduced-motion timeline must allow native horizontal navigation on ${target.name}`);
      assert.ok(!reduced.pageOverflow, `Reduced-motion layout overflows page on ${target.name}`);
      await reducedPage.close();
    }
  }
} finally {
  await browser.close();
}
