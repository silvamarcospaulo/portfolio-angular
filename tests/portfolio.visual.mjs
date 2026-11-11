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

    await page.locator('#section-projetos').evaluate(element => {
      const anchor = element.closest('.projects-scroll-space');
      if (!anchor) throw new Error('Missing native project scroll wrapper');
      const start = anchor.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: start + 2, behavior: 'instant' });
    });
    await page.waitForTimeout(400);
    const projectSlides = page.locator('.project-slide');
    assert.equal(await projectSlides.count(), 2, `Expected only the two approved projects on ${target.name}`);
    const approvedTitles = await projectSlides.locator('h3').allTextContents();
    assert.ok(approvedTitles[0]?.startsWith('Vorix'), `Vorix must be the first project on ${target.name}`);
    assert.equal(approvedTitles[1], 'Gold & Silver', `Gold & Silver must be the second project on ${target.name}`);

    const projectStructure = await page.evaluate(() => {
      const viewport = document.querySelector('.projects-viewport');
      const track = document.querySelector('.projects-track');
      const slides = [...document.querySelectorAll('.project-slide')];
      return {
        layout: getComputedStyle(track).display,
        travel: track.scrollWidth - viewport.clientWidth,
        overflow: getComputedStyle(viewport).overflowX,
        internalScroll: slides.some(slide => ['auto', 'scroll'].includes(getComputedStyle(slide).overflowY)),
        pageOverflow: document.documentElement.scrollWidth > innerWidth + 4
      };
    });
    assert.ok(!projectStructure.internalScroll, `Project cards cannot scroll internally on ${target.name}`);
    assert.ok(!projectStructure.pageOverflow, `Project showcase overflows the page on ${target.name}`);
    await page.screenshot({ path: `test-results/${target.name}-projects.png`, fullPage: false });

    if (target.width >= 1024 && target.height > 700) {
      assert.equal(projectStructure.layout, 'block', `Desktop projects should have independent panels on ${target.name}`);
      const sticky = await page.locator('#section-projetos').evaluate(element => getComputedStyle(element).position);
      assert.equal(sticky, 'sticky', `Desktop projects must use native sticky positioning on ${target.name}`);

      const panelSizing = await page.locator('.project-slide.is-active').evaluate(slide => {
        const rect = slide.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          bottom: rect.bottom,
          viewportWidth: innerWidth,
          viewportHeight: innerHeight
        };
      });
      assert.ok(panelSizing.width >= Math.min(1300, panelSizing.viewportWidth * 0.7),
        `Project card is too narrow on ${target.name}: ${JSON.stringify(panelSizing)}`);
      assert.ok(panelSizing.height >= Math.min(500, panelSizing.viewportHeight * 0.6),
        `Project card is too short on ${target.name}: ${JSON.stringify(panelSizing)}`);
      assert.ok(panelSizing.top >= -4 && panelSizing.bottom <= panelSizing.viewportHeight + 4,
        `Project card exceeds viewport vertically on ${target.name}: ${JSON.stringify(panelSizing)}`);

      const panelState = async () => page.locator('.project-slide').evaluateAll(slides => slides.map(slide => {
        const bounds = slide.getBoundingClientRect();
        const style = getComputedStyle(slide);
        return { title: slide.querySelector('h3')?.textContent?.trim(), visibility: style.visibility,
          opacity: Number(style.opacity), x: bounds.x, width: bounds.width };
      }));

      const initial = await panelState();
      assert.equal(initial[0].visibility, 'visible', `First project should be visible on entry on ${target.name}`);
      assert.equal(initial[1].visibility, 'hidden', `Next project must not peek beside the first on ${target.name}`);
      assert.equal(await page.locator('.project-slide.is-active').count(), 1);

      await page.waitForTimeout(650);
      await page.mouse.wheel(0, 700);
      await page.mouse.wheel(0, 700);
      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(1050);

      const second = await panelState();
      assert.equal(second[0].visibility, 'hidden', `First project remained visible on ${target.name}`);
      assert.equal(second[1].visibility, 'visible', `Second project did not enter on ${target.name}`);
      assert.equal(await page.locator('.project-slide.is-active h3').innerText(), 'Gold & Silver');
      assert.equal(await page.locator('.project-slide.is-active').count(), 1);

      const location = await page.locator('.project-slide.is-active').evaluate(slide => {
        const card = slide.getBoundingClientRect();
        const viewport = document.querySelector('.projects-viewport').getBoundingClientRect();
        const section = document.querySelector('#section-projetos').getBoundingClientRect();
        return { centerError: Math.abs((card.left + card.right) / 2 - (viewport.left + viewport.right) / 2),
          sectionTop: section.top, sectionBottom: section.bottom };
      });
      assert.ok(location.centerError < 12, `Second project was not centered on ${target.name}: ${JSON.stringify(location)}`);
      assert.ok(Math.abs(location.sectionTop) < 20, `Project section unpinned prematurely on ${target.name}: ${JSON.stringify(location)}`);

      await page.waitForTimeout(500);
      const stopped = await panelState();
      assert.deepEqual(stopped, second, `Cards moved again without a new gesture on ${target.name}`);
      await page.screenshot({ path: `test-results/${target.name}-projects-scrolled.png`, fullPage: false });

      await page.mouse.wheel(0, -700);
      await page.waitForTimeout(1100);
      assert.match(await page.locator('.project-slide.is-active h3').innerText(), /^Vorix/,
        `Reverse gesture failed on ${target.name}`);

      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(1100);
      assert.equal(await page.locator('.project-slide.is-active h3').innerText(), 'Gold & Silver',
        `Second distinct gesture failed on ${target.name}`);

      await page.mouse.wheel(0, 700);
      await page.waitForTimeout(650);
      const exitState = await page.locator('#section-projetos').evaluate(section => {
        const bounds = section.getBoundingClientRect();
        const parent = section.parentElement?.getBoundingClientRect();
        return {
          top: bounds.top, bottom: bounds.bottom, height: bounds.height,
          position: getComputedStyle(section).position,
          parentTop: parent?.top, parentBottom: parent?.bottom,
          scrollY, maxScroll: document.documentElement.scrollHeight - innerHeight, innerHeight,
          activeCard: document.querySelector('.project-slide.is-active h3')?.textContent?.trim()
        };
      });
      assert.ok(exitState.bottom < exitState.innerHeight, `Last card did not release page scroll on ${target.name}: ${JSON.stringify(exitState)}`);

      const afterExit = await page.evaluate(() => scrollY);
      await page.mouse.wheel(0, 380);
      await page.waitForTimeout(350);
      const afterContinuation = await page.evaluate(() => scrollY);
      assert.ok(afterContinuation > afterExit + 120,
        `Page is still capturing scroll after the final project on ${target.name}`);

      await page.mouse.wheel(0, -700);
      await page.waitForTimeout(480);
      assert.equal(await page.locator('.project-slide.is-active h3').innerText(), 'Gold & Silver',
        `Returning from below should show the final project on ${target.name}`);

      await page.mouse.wheel(0, -700);
      await page.waitForTimeout(1000);
      assert.match(await page.locator('.project-slide.is-active h3').innerText(), /^Vorix/,
        `Returning upward through projects did not reach the first panel on ${target.name}`);

    } else {
      assert.equal(projectStructure.layout, 'flex', `Mobile or compact projects must use native horizontal slides on ${target.name}`);
      assert.ok(projectStructure.travel > 0, `Horizontal travel is missing on ${target.name}`);
      assert.ok(['auto', 'scroll'].includes(projectStructure.overflow), `Native project scrolling is missing on ${target.name}`);
      await page.locator('.projects-viewport').evaluate(element => { element.scrollLeft = element.clientWidth; });
      await page.waitForTimeout(300);
      assert.ok(await page.locator('.projects-viewport').evaluate(element => element.scrollLeft) > 0,
        `Project carousel did not swipe on ${target.name}`);
    }

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
