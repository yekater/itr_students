from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4321'
PAGES = ['/', '/ca/', '/en/']
DEVICES = [
    ('desktop', 1440, 900),
    ('laptop', 1280, 800),
    ('tablet', 820, 1180),
    ('mobile', 390, 844),
]

def visible_ctas(page):
    ctas = page.evaluate('''() => {
        const isPurchase = a => {
            const href = a.getAttribute('href') || '';
            return href.includes('/slides/acreditacion');
        };
        const els = [...document.querySelectorAll('a')].filter(isPurchase);
        return els.map(a => {
            const r = a.getBoundingClientRect();
            const style = getComputedStyle(a);
            let p = a, hiddenByParent = false;
            return {
                href: r.href_raw || a.getAttribute('href'),
                visible: r.width > 0 && r.height > 0 &&
                    style.visibility !== 'hidden' && style.display !== 'none' &&
                    style.opacity !== '0' &&
                    r.top >= -r.height && r.top < window.innerHeight &&
                    r.bottom > 0,
                rect: {top: r.top, left: r.left, w: r.width, h: r.height},
                cls: a.className,
                text: (a.textContent || '').trim().slice(0, 40),
                header: !!a.closest('.header'),
                mobilebar: !!a.closest('.mobile-cta'),
            };
        });
    }''')
    return [c for c in ctas if c['visible']]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for dev, w, h in DEVICES:
        ctx = browser.new_context(viewport={'width': w, 'height': h})
        for route in PAGES:
            page = ctx.new_page()
            page.goto(BASE + route)
            page.wait_for_load_state('networkidle')
            total = page.evaluate('document.body.scrollHeight')
            step = h // 2
            worst = 0
            worst_els = []
            dup_same_text = []
            y = 0
            steps = 0
            while y < total + h and steps < 80:
                page.evaluate(f'window.scrollTo(0, {y})')
                page.wait_for_timeout(120)
                vis = visible_ctas(page)
                if len(vis) > worst:
                    worst = len(vis)
                    worst_els = vis
                # same CTA text visible twice
                texts = [v['text'] for v in vis]
                for t in set(texts):
                    if t and texts.count(t) > 1:
                        dup_same_text.append((y, t, texts.count(t)))
                y += step
                steps += 1
            print(f'== {dev} {route}  (scrollHeight {total})')
            print(f'   MAX purchase CTAs visible simultaneously: {worst}')
            for e in worst_els:
                print(f'     - [{e["text"]!r}] cls={e["cls"][:40]!r} header={e["header"]} mobilebar={e["mobilebar"]} pos={e["rect"]}')
            if dup_same_text:
                seen = set()
                for y, t, n in dup_same_text:
                    k = (t, n)
                    if k not in seen:
                        seen.add(k); print(f'   SAME TEXT x{n} at scrollY={y}: {t!r}')
            page.close()
        ctx.close()
    browser.close()
