import { test, expect } from '@playwright/test';

const granularity = (n: number) => Math.round(n);

for (const route of ['/', '/ca/', '/en/']) {
  test(`header container alignment ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    for (const width of [1440, 1024, 768, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(300);
      const box = (sel: string) => page.locator(sel).evaluate((el) => { const r = el.getBoundingClientRect(); return { l: r.left, r: r.right }; });
      const logo = await box('.header .wordmark');
      const hero = await box('.hero-inner');
      const contactVisible = await page.locator('.header-inner .header-ctas').isVisible();
      // Background must remain full width
      const headerBg = await page.locator('.header').evaluate((el) => { const r = el.getBoundingClientRect(); return { l: r.left, w: r.width }; });
      expect(headerBg.l).toBe(0);
      expect(granularity(headerBg.w)).toBe(width);
      expect(granularity(logo.l)).toBe(granularity(hero.l));
      const container = await box('.header .container.header-inner');
      if (contactVisible) {
        const ctas = await box('.header-inner .header-ctas');
        expect(granularity(ctas.r)).toBe(granularity(container.r));
      }
      if (width >= 1024) {
        expect(granularity(container.r)).toBe(granularity(hero.r));
      }
    }
  });
}
