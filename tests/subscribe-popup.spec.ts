import {test,expect} from '@playwright/test';

const endpoint='https://perinfor.odoo.com/website/form/mailing.contact';

test('popup valida y envía la solicitud a la lista de estudiantes',async({page})=>{
  await page.route(endpoint,route=>route.fulfill({status:200,body:''}));
  await page.goto('/');
  const popup=page.locator('#sub-popup');
  await expect(popup).toBeVisible({timeout:5000});
  const input=popup.locator('input[type=email]');
  await input.fill('correo-invalido');
  await popup.locator('button[type=submit]').click();
  expect(await input.evaluate((el:HTMLInputElement)=>el.validity.valid)).toBe(false);
  await input.fill('prueba@example.com');
  const requestPromise=page.waitForRequest(endpoint);
  await popup.locator('button[type=submit]').click();
  const request=await requestPromise;
  expect(request.method()).toBe('POST');
  expect(Object.fromEntries(new URLSearchParams(request.postData()||''))).toEqual({name:'prueba@example.com',email:'prueba@example.com',list_ids:'3'});
  await expect(popup.locator('[data-sub-msg]')).toContainText('No podemos confirmar');
  expect(await page.evaluate(()=>localStorage.getItem('sub_popup_done'))).toBeNull();
  await popup.locator('button[data-sub-close]').click();
  await page.reload();
  await page.waitForTimeout(1200);
  await expect(popup).toBeHidden();
});

test('popup permite reintentar tras un error de red',async({page})=>{
  await page.route(endpoint,route=>route.abort('failed'));
  await page.goto('/');
  const popup=page.locator('#sub-popup');
  await expect(popup).toBeVisible();
  await popup.locator('input[type=email]').fill('prueba@example.com');
  await popup.locator('button[type=submit]').click();
  await expect(popup.locator('[data-sub-msg]')).toContainText('Inténtalo de nuevo');
  await expect(popup.locator('button[type=submit]')).toBeEnabled();
});
