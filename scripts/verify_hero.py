from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4321'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for name, w, h in [('desktop',1440,900),('mobile',390,844)]:
        page = browser.new_page(viewport={'width': w, 'height': h})
        page.goto(BASE + '/')
        page.wait_for_load_state('networkidle')
        fact = page.locator('.hero-facts div', has_text='30 horas')
        box = fact.bounding_box()
        span_h = fact.locator('span').bounding_box()
        parent = fact.locator('xpath=..').bounding_box()
        lh = page.evaluate('''() => {
            const span = [...document.querySelectorAll('.hero-facts div span')].find(s => s.textContent.includes('vídeos'));
            const cs = getComputedStyle(span);
            const rect = span.getBoundingClientRect();
            const lines = Math.round(parseInt(cs.lineHeight) ? rect.height / parseFloat(cs.lineHeight) : 0);
            const parentPad = span.closest('div');
            const pb = parentPad.getBoundingClientRect();
            return {lines, span_h: rect.height, pad_h: pb.height, overflow: rect.bottom > pb.bottom + 1};
        }''')
        print(name, '-> líneas:', lh['lines'], 'overflow:', lh['overflow'], 'alto span:', lh['span_h'], 'alto tile:', lh['pad_h'])
        page.screenshot(path=f'shots/hero_facts_{name}.png', clip={'x':0,'y':min(0,page.evaluate("document.querySelector('.hero-facts').getBoundingClientRect().top")), 'width':w,'height':h})
        page.screenshot(path=f'shots/hero_{name}.png', full_page=False)
        page.close()
    browser.close()
