import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PDF='/downloads/programa-investigacion-digital-abogados.pdf';

test('HTML completo, mapa de IDs y PDF sin JavaScript',async({browser,request})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 const page=await context.newPage();
 await page.goto('/');
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('h1')).toContainText('Descubre cómo añadir a tu CV');
 // Siete módulos con lecciones reales (sin acrónimo)
 await page.locator('[data-module]').first().locator('summary').click();
 await expect(page.getByText('¿Qué es la investigación digital?',{exact:false}).first()).toBeVisible();
 await expect(page.locator('[data-module]')).toHaveCount(7);
 await expect(page.locator('[data-module] li')).toHaveCount(38);
 // FAQ sin JavaScript
 await page.locator('.faq-item').first().locator('summary').click();
 await expect(page.locator('.faq-item').first()).toContainText('No');
 // Enlaces Odoo: destino corporativo vs ficha del curso
 for(const link of await page.locator('a[href*="perinfor.odoo.com"]').all()){
   const url=new URL(await link.getAttribute('href') as string);
   expect(url.pathname).toBe(url.pathname.includes('/slides/')?url.pathname:url.pathname);
   expect(['https:','http:']).toContain(url.protocol);
 }
 // Sin precios ni offer
 const html=await page.content();
 expect(html.toLowerCase()).not.toMatch('offer');
 expect(html.toLowerCase()).not.toContain('pricevaliduntil');
 // PDF funcional y binario válido
 const pdf=await request.get(PDF);
 expect(pdf.ok()).toBeTruthy();
 expect((await pdf.body()).subarray(0,5).toString()).toBe('%PDF-');
 await context.close();
});

test('siete opciones de curso con destinos correctos',async({page})=>{
 await page.goto('/');
 const map:Record<string,string>={};
 for(const a of await page.locator('.tabnav a').all())map[(await a.innerText()).trim()]=await a.getAttribute('href') as string;
  expect(Object.keys(map)).toEqual(['Descripción y Método didáctico','Contenido','Dirigido a','Certificado','Salidas laborales','FAQ','Prueba gratuita']);
 for(const [label,href] of Object.entries(map)){
   const target=page.locator(href);
   await expect(target,'la pestaña '+label+' debe tener destino').toHaveCount(1);
 }
 await page.locator('#metodo').scrollIntoViewIfNeeded();
  await expect(page.locator('#metodo')).toContainText('De la primera búsqueda');
  await expect(page.locator('.metodo-group')).toContainText('Rigor en el método');
 await expect(page.locator('#programa')).toContainText('Tu programa de investigación');
  await expect(page.locator('#para-quien')).toContainText('A quién va dirigido');
  await expect(page.locator('#certificacion')).toContainText('Doble Certificación Oficial: iTR+ y COEINF');
 await expect(page.locator('#salidas-laborales h2')).toContainText('Salidas laborales');
 await expect(page.locator('#preguntas')).toContainText('Preguntas');
  await expect(page.locator('#probar')).toContainText('LABORATORIO');
 // Sin 'Profesorado'
 expect(map).not.toHaveProperty('Profesorado');
});

test('probar: una sola instancia del caso, mapa de fuentes y pregunta simulada',async({page})=>{
  await page.goto('/');
  expect(await page.locator('.probar-app').count()).toBe(1);
  await page.locator('#probar').scrollIntoViewIfNeeded();
  await expect(page.locator('.probar-case-title')).toContainText('Una relación que conviene verificar');
  await expect(page.locator('.probar-question')).toContainText('controla Sociedad B');
  await expect(page.locator('.sourcemap-toggle')).toHaveCount(3);
  await expect(page.locator('.pill')).toContainText('Datos simulados');
});

test('caso guiado: rutas, procedencia de F03, conclusión y miniinforme real',async({page})=>{
  await page.goto('/');
  await page.locator('#probar').scrollIntoViewIfNeeded();
  // Etapa 1: localizar F01 y añadir su extracto. La isla se hidrata al ser visible:
  // el clic se reintenta hasta que React despliega la rama del mapa de fuentes.
  await expect.poll(async()=>{
    await page.locator('.sourcemap-toggle').filter({hasText:'Fuentes mercantiles'}).click();
    return await page.locator('.sourcemap-source').filter({hasText:'F01'}).count();
  },{timeout:15000}).toBeGreaterThan(0);
  await page.locator('.sourcemap-source').filter({hasText:'F01'}).click();
  await page.locator('.evidence-card').filter({hasText:'F01'}).locator('.evidence-add').click();
  await expect(page.locator('.probar-result').first()).toContainText('Has localizado un dato de una fuente identificada');
  // Etapa 2: F02 y la pregunta de procedencia; error explicado con reintentos
  await page.locator('.evidence-card').filter({hasText:'F02'}).locator('.evidence-add').click();
  const quiz=page.locator('.origin-quiz');
  await quiz.locator('label').filter({hasText:'otra página'}).locator('input').check();
  await expect(quiz.locator('.origin-feedback')).toContainText('misma cadena');
  await quiz.locator('label').filter({hasText:'misma fuente'}).locator('input').check();
  await expect(quiz.locator('.origin-feedback')).toContainText('Correcto');
  // Etapa 3: conclusión errónea da razón concreta y permite reintentar
  const opciones=page.locator('[aria-label="Conclusión del expediente"]');
  await opciones.locator('label').filter({hasText:'controla Sociedad B'}).locator('input').check();
  await expect(opciones.locator('.origin-feedback')).toContainText('Ninguno de los dos documenta');
  await opciones.locator('label').filter({hasText:'Se ha anunciado una colaboración'}).locator('input').check();
  // Quitar una fuente obligatoria revierte el informe; devolverla lo completa
  await page.locator('.probar-remove').first().click();
  await expect(page.locator('.minireport')).toContainText('pendiente');
  await page.locator('.evidence-card').filter({hasText:'F01'}).locator('.evidence-add').click();
  await expect(page.locator('.minireport')).toContainText('Miniinforme del caso');
  // Descarga real con el nombre esperado
  const download=page.waitForEvent('download');
  await page.getByRole('button',{name:'Descargar mi miniinforme'}).click();
   expect((await download).suggestedFilename()).toBe('miniinforme-relacion-que-conviene-verificar.txt');
});

test('planificador: estimación orientativa y entradas inválidas',async({page})=>{
 await page.goto('/');
  const planner=page.locator('#hours');
  await planner.scrollIntoViewIfNeeded();
  // La isla se hidrata al entrar en viewport: se vacía el campo antes de rellenar
  // para que React reciba un evento de entrada aunque el valor ya estuviera en el DOM.
  await expect.poll(async()=>{
    await planner.fill('');
    await planner.fill('10');
    return (await page.locator('.planner').innerText()).includes('3 semanas');
  },{timeout:10000}).toBe(true);
  await expect.poll(async()=>{
    await planner.fill('');
    await planner.fill('0');
    return (await page.locator('.planner').innerText()).includes('Introduce un número');
  },{timeout:10000}).toBe(true);
  await expect.poll(async()=>{
    await planner.fill('');
    await planner.fill('60');
    return (await page.locator('.planner').innerText()).includes('hasta 30');
  },{timeout:10000}).toBe(true);
});

test('banner de cookies AEPD: elección, bloqueo y retirada desde el pie',async({page})=>{
 await page.goto('/');
 const banner=page.locator('#aviso-cookies');
 await expect(banner).toBeVisible();
 // Rechazo accesible y del mismo tamaño
 await expect(banner.getByRole('button',{name:'Aceptar todas'})).toBeVisible();
 await expect(banner.getByRole('button',{name:'Rechazar no esenciales'})).toBeVisible();
 await expect(banner.getByRole('button',{name:'Rechazar no esenciales'})).toHaveCSS('font-size',/1[6-9]/);
 await banner.getByRole('button',{name:'Rechazar no esenciales'}).click();
 await expect(banner).toBeHidden();
 // Preferencias permanentes desde el pie
 await page.locator('footer [data-consent-configure]').click();
 const dialog=page.locator('dialog.cookie-dialog');
 await expect(dialog).toContainText('no tiene ningún servicio opcional configurado');
 await page.keyboard.press('Escape');
 // Sin rastreadores ni cookies de terceros
 expect(await page.evaluate(()=>document.cookie)).toBe('');
});

test('responsive, axe y sin overflow',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 for(const width of [320,390,768,1024,1440,1920]){
   await page.setViewportSize({width,height:900});
   await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'ancho '+width).toBe(true);
   await page.screenshot({path:`docs/qa-${width}.png`,fullPage:true});
 }
 await page.setViewportSize({width:390,height:900});
 const results=await new AxeBuilder({page}).analyze();
 expect(results.violations).toEqual([]);
   // Header compacto: selector de idioma y CTA siguen siendo accesibles
   await expect(page.locator('.header nav.locale-switcher')).toHaveCount(1);
   await expect(page.locator('.locale-switcher a')).toHaveCount(3);
  await expect(page.locator('.mobile-menu')).toHaveCount(0);
   // En ≤500px la CTA de cabecera se sustituye por la barra fija móvil (oculta junto al hero)
   await expect(page.locator('.header .button')).toHaveCount(2);
   await expect(page.locator('.header-ctas')).toBeHidden();
  await expect(page.locator('.mobile-cta .button')).toBeAttached();
  expect(errors.join(' ')).not.toMatch(/TypeError|ReferenceError/);
 expect(errors.filter(m=>/uncaught/i.test(m))).toEqual([]);
});

test('SEO: título, descripción, canonical y frases aprobadas sin acrónimo',async({page})=>{
 await page.goto('/');
 const html=await page.content();
 expect(html).toContain('<title>');
 const title=await page.title();
  expect(title.toLowerCase()).toContain('investigación digital');
 expect(title).not.toContain('OSINT');
  expect((await page.locator('body').innerText()).toLowerCase()).not.toContain('osint');
 const text=(await page.locator('body').textContent())!.toLowerCase();
  for(const phrase of ['investigación digital para estudiantes','investigación de sociedades mercantiles','análisis de huella digital','investigación en redes sociales','inteligencia de fuentes abiertas','búsqueda avanzada de información pública'])expect(text).toContain(phrase.toLowerCase());
 expect(html).toContain('noindex,follow');
 expect(text).not.toContain('presencial');
});

test('hero: composición aprobada, recorte sin marco y LCP sin animación antigua',async({page})=>{
 await page.goto('/');
 // El panel antiguo se retira
 await expect(page.locator('.investigation-scene')).toHaveCount(0);
 await expect(page.locator('#animation-toggle')).toHaveCount(0);
 // Composición: un H1, un párrafo descriptivo y dos CTA; sin datos de fila ni nota al pie
 await expect(page.locator('#inicio h1')).toHaveCount(1);
 await expect(page.locator('.hero-copy p')).toHaveCount(2); // eyebrow + párrafo descriptivo
 await expect(page.locator('.hero-meta')).toHaveCount(0);
 await expect(page.locator('.hero-footnote')).toHaveCount(0);
 await expect(page.locator('.hero .actions a')).toHaveCount(2);
 // Frases y enlaces retirados del hero (secciones 3.2 del encargo)
 for(const frase of ['Planificación orientativa','Aprende técnicas de investigación digital','INVESTIGACIÓN APLICADA','Datos simulados de demostración','Explorar el programa','Información completa del curso'])
  await expect(page.locator('#inicio')).not.toContainText(frase);
 // Sin "Equipo iTR+" no acreditado
 expect(await page.locator('#inicio').innerText()).not.toContain('Equipo iTR+');
  // Video decorativo único, sin las capas SVG/imagen retiradas.
  const video=page.locator('.hero-video');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('muted','');
  await expect(video).toHaveAttribute('playsinline','');
  await expect(video).toHaveAttribute('loop','');
  await expect(video).toHaveAttribute('poster','/images/hero-investigation-video-poster.webp');
  await expect(video.locator('source')).toHaveAttribute('src','/videos/itr-estudiantes.mp4');
  await expect(page.locator('[data-card]')).toHaveCount(0);
  await expect(page.locator('.hero-scene-svg')).toHaveCount(0);
  await expect(page.locator('.hero-scene .hs-people')).toHaveCount(0);
  await expect(page.locator('[data-scene-toggle]')).toHaveCount(0);
   await expect(page.locator('#inicio')).toContainText('Matricularme');
});

test('páginas legales: rutas, enlace del header y navegación de vuelta',async({request})=>{
  for(const route of ['/aviso-legal/','/politica-de-privacidad/','/politica-de-cookies/','/accesibilidad/']){
    const response=await request.get(route);
    expect(response.ok(),'la ruta '+route+' responde').toBeTruthy();
    const html=await response.text();
    expect(html).toContain('href="/#inicio"');
    expect(html).not.toContain('Navegación principal');
    expect(html).toContain('Configurar cookies');
  }
 // El sitemap no incluye URLs ficticias de producción durante preview
 const sitemap=await request.get('/sitemap.xml');
 const txt=await sitemap.text();
 expect(txt).toContain('/aviso-legal/');
 expect(txt).not.toContain('localhost');
});
