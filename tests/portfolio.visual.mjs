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

    assert.ok(structure.cards >= 4, `Expected all career cards for ${target.name}`);
    assert.ok(!structure.cardScrolls, `Career cards may not scroll internally on ${target.name}`);
    assert.ok(!structure.horizontalPageOverflow, `Unexpected document overflow on ${target.name}`);

    await page.screenshot({ path: `test-results/${target.name}-hero.png`, fullPage: false });
    await page.locator('.career-timeline').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${target.name}-timeline.png`, fullPage: false });

    if (target.width >= 1024 && target.height > 700) {
      const timeline = page.locator('.timeline');
      const initial = await timeline.evaluate(element => getComputedStyle(element).transform);
      await page.mouse.wheel(0, 650);
      await page.waitForTimeout(1100);
      const moved = await timeline.evaluate(element => getComputedStyle(element).transform);
      assert.notEqual(moved, initial, `GSAP horizontal scroll did not advance on ${target.name}`);
    }

    await page.locator('#section-projetos').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${target.name}-projects.png`, fullPage: false });

    await page.close();
  }
} finally {
  await browser.close();
}
