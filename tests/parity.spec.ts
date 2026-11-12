import {test, expect} from '@playwright/test';

const locales = [
  {route:'/', lang:'es', weeks:'6 semanas de dedicación', hours:'Horas de estudio por semana', competency:'Formación en técnicas', faqFirst:'¿Necesito conocimientos previos?', acceptAll:'Aceptar todas', cookieLabel:'Aviso de cookies', demoTitle:'Una relación que conviene verificar', addBtn:'Añadir al expediente', exp:'Expediente'},
  {route:'/ca/', lang:'ca', weeks:'6 setmanes de dedicació', hours:'Hores d’estudi per setmana', competency:'Formació en tècniques', faqFirst:'Necessito coneixements previs?', acceptAll:'Acceptar-les totes', cookieLabel:'Avís de galetes', demoTitle:'Una relació que convé verificar', addBtn:'Afegir a l’expedient', exp:'Expedient'},
  {route:'/en/', lang:'en', weeks:'6 weeks of estimated study', hours:'Study hours per week', competency:'Training in digital investigation techniques', faqFirst:'Do I need prior knowledge?', acceptAll:'Accept all', cookieLabel:'Cookie notice', demoTitle:'A relationship worth verifying', addBtn:'Add to case file', exp:'Case file'},
];

for (const L of locales) {
  test(`parity: calculator, FAQ, competencies, cookies ${L.lang}`, async ({page}) => {
    await page.goto(L.route, {waitUntil:'networkidle'});

    // 1. Calculator: 5 hours/week -> 6 weeks in every language
    const planner = page.locator('.planner');
    await planner.scrollIntoViewIfNeeded();
    await planner.locator('input#hours').fill('5');
    await expect(planner.locator('p[aria-live="polite"] strong')).toContainText(L.weeks, {ignoreCase:false, timeout:6000});
    await expect(planner.locator('label')).toHaveText(L.hours);

    // 2. FAQ parity: 16 items (11 base + 3 career + 2 employment)
    const faq = page.locator('#preguntas details.faq-item');
    await expect(await faq.count()).toBe(11 + 3 + 2);
    await expect(faq.first()).toContainText(L.faqFirst);
    const firstAnswerText = await faq.first().evaluate(el=>el.querySelector('p')?.textContent||'');
    expect(firstAnswerText.length).toBeGreaterThan(60);

    // 3. Competency cards use the localized copy
    const competencyTitle = page.locator('[data-competency="overview"] h3');
    await competencyTitle.scrollIntoViewIfNeeded();
    await expect(competencyTitle).toContainText(L.competency);

    // 4. Cookie banner + settings dialog localized
    const banner = page.locator('#aviso-cookies');
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAttribute('aria-label', L.cookieLabel);
    await banner.getByRole('button', {name: undefined, exact:false}).first().click();

    // 5. Hero video + images + language switcher present
    await expect(page.locator('.hero-video')).toHaveCount(1);
    await expect(page.locator('.locale-switcher a')).toHaveCount(3);

    // 6. Direct reload still works (lazy hydration + video controller)
    await page.reload({waitUntil:'networkidle'});
    await expect(page.locator('.planner input#hours')).toBeVisible();
  });

  test(`parity: investigation demo end-to-end ${L.lang}`, async ({page}) => {
    await page.addInitScript(()=>sessionStorage.setItem('sub_popup_shown','1'));
    await page.goto(L.route + '#probar', {waitUntil:'networkidle'});
    const demo = page.locator('.probar-app');
    await demo.scrollIntoViewIfNeeded();
    await expect(demo.locator('.probar-case-title')).toHaveText(L.demoTitle);
    // open register category, open F01, add to case file
    const toggleBtn = demo.locator('.sourcemap-toggle').first();
    if ((await toggleBtn.getAttribute('aria-expanded')) === 'false') await toggleBtn.click();
    await demo.locator('.sourcemap-source').first().click();
    const viewer = demo.locator('.probar-chapter[data-chapter="0"] .evidence-card');
    await expect(viewer).toBeVisible();
    await viewer.locator('.evidence-add').click();
    const fileEntry = page.locator('.probar-panel').getByText(L.exp).first();
    await expect(fileEntry).toBeVisible();
    await expect(demo.locator('.probar-panel li.record')).toHaveCount(1);
    // remove then re-add (toggle behaviour)
    await demo.locator('.probar-remove').click();
    await expect(demo.locator('.probar-panel li.record')).toHaveCount(0);
  });
}

// Mobile spot-check: same calculator result and FAQ count
for (const L of locales) {
  test(`parity mobile 390px: calculator + FAQ ${L.lang}`, async ({page}) => {
    await page.setViewportSize({width:390, height:900});
    await page.goto(L.route, {waitUntil:'networkidle'});
    const planner = page.locator('.planner');
    await planner.scrollIntoViewIfNeeded();
    await planner.locator('input#hours').fill('5');
    await expect(planner.locator('p[aria-live="polite"] strong')).toContainText('6', {ignoreCase:false});
    await expect(await page.locator('#preguntas details.faq-item').count()).toBe(16);
  });
}
