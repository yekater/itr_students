import {test,expect} from '@playwright/test';
const locales=[['','ES'],['ca/','CA'],['en/','EN']];
test('hero icons + structure parity across locales',async({page})=>{
  for(const[path,name]of locales){
    await page.goto(`http://127.0.0.1:4322/${path}`);
    await expect(page.locator('.hero-perks .perk-icon')).toHaveCount(3);
    await expect(page.locator('.hero .arrow-icon')).toHaveCount(1);
    await expect(page.locator('.hero .hero-probar-link')).toHaveCount(1);
    await expect(page.locator('.hero .hero-facts div')).toHaveCount(4);
    await expect(page.locator('.hero video')).toHaveCount(1);
    await expect(page.locator('ul.hero-perks li').nth(0)).toContainText('PDF');
  }
});
