import { test, expect } from '@playwright/test';

for (const route of ['/', '/ca/', '/en/']) {
  test(`follow-up runtime ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.hero-probar-link')).toHaveCount(1);
    await expect(page.locator('.hero-probar-link')).toBeVisible();
    await expect(page.locator('[data-hero-video-stage]')).toHaveCount(1);
    await expect(page.locator('.hero-video')).toHaveCount(1);
    await expect(page.locator('#formacion')).toHaveCount(1);
    await expect(page.locator('#formacion .section-particles')).toHaveCount(1);
    const headerHeight = await page.locator('.header').evaluate((el) => Math.round(el.getBoundingClientRect().height));
    expect(headerHeight).toBeGreaterThan(0);
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect.poll(() => page.locator('#aplicaciones').evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 255, 255)');
      await expect.poll(() => page.locator('#aplicaciones h2').evaluate((el) => getComputedStyle(el).color)).toBe('rgb(11, 31, 58)');
      await expect.poll(() => page.locator('#aplicaciones .itr-contexto-grid').evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(78, 107, 136)');
      await expect.poll(() => page.locator('#aplicaciones .itr-contexto-grid h3').first().evaluate((el) => getComputedStyle(el).color)).toBe('rgb(255, 255, 255)');
      await expect.poll(() => page.locator('#aplicaciones .itr-contexto-grid p').first().evaluate((el) => getComputedStyle(el).color)).toBe('rgb(255, 255, 255)');
      await expect.poll(() => page.evaluate(() => {
        const context = document.querySelector<HTMLElement>('#aplicaciones .itr-contexto-inner')?.getBoundingClientRect();
        const hero = document.querySelector<HTMLElement>('.hero-inner')?.getBoundingClientRect();
        return Boolean(context && hero && Math.round(context.left) === Math.round(hero.left) && Math.round(context.width) === Math.round(hero.width));
      })).toBe(true);
      // CSS min-height plus the existing one-pixel bottom border.
      const expectedHeader = width <= 800 ? 77 : 92;
      await expect.poll(() => page.locator('.header').evaluate((el) => Math.round(el.getBoundingClientRect().height))).toBe(expectedHeader);
      const logo = await page.locator('.header .wordmark img').boundingBox();
      const logoHeight = logo?.height ?? 0;
      expect(logoHeight).toBeGreaterThanOrEqual(width <= 500 ? 28 : 36);
      expect(logoHeight).toBeLessThanOrEqual(width <= 500 ? 32 : 40);
      const probar = await page.locator('.hero-probar-link').boundingBox();
      const inner = await page.locator('.hero-inner').boundingBox();
      expect(probar && inner && probar.x + probar.width).toBeLessThanOrEqual(Math.ceil(inner!.x + inner!.width));
    }
    await page.locator('#formacion').scrollIntoViewIfNeeded();
    const section = await page.locator('#formacion').boundingBox();
    const particles = await page.locator('#formacion .section-particles').boundingBox();
    expect(particles?.height).toBeGreaterThan((section?.height ?? 0) - 2);
  });
}

test('follow-up cookies remain functional', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('[data-consent-configure]').click();
  await expect(page.locator('dialog.cookie-dialog')).toBeVisible();
});

for (const locale of ['ca', 'en'] as const) {
  test(`${locale} landing keeps Spanish structural parity and localised controls`, async ({ page }) => {
    await page.goto(`/${locale}/`, { waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'ca' ? 'ca-ES' : 'en-GB');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('[data-module]')).toHaveCount(7);
    await expect(page.locator('[data-module] li')).toHaveCount(38);
    await expect(page.locator('#aplicaciones')).toHaveCount(1);
    await expect(page.locator('#metodo')).toHaveCount(1);
    await expect(page.locator('#formacion')).toHaveCount(1);
    await expect(page.locator('#programa')).toHaveCount(1);
    await expect(page.locator('#para-quien')).toHaveCount(1);
    await expect(page.locator('#certificacion')).toHaveCount(1);
    await expect(page.locator('#salidas-laborales')).toHaveCount(1);
    await expect(page.locator('#preguntas')).toHaveCount(1);
    await expect(page.locator('#probar')).toHaveCount(1);
    await expect(page.locator('.audience-grid .specialty')).toHaveCount(4);
    await expect(page.locator('.career-faq')).toHaveCount(5);
    await expect(page.locator('.footer-legal a')).toHaveCount(4);
    await expect(page.locator('.footer-legal a').nth(0)).toHaveAttribute('href', `/${locale}/aviso-legal/`);
    await page.locator('#hours').scrollIntoViewIfNeeded();
    await expect(page.locator('.planner label')).toContainText(locale === 'ca' ? 'Hores' : 'Study');
    await page.locator('[data-consent-configure]').click();
    await expect(page.locator('dialog.cookie-dialog h2')).toContainText(locale === 'ca' ? 'galetes' : 'Cookie');
  });
}
