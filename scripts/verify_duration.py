from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4321'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(BASE + '/')
    page.wait_for_load_state('networkidle')

    # Block 1: expand competency overview panel
    page.locator('[data-competency="overview"] .itr-competency__control').click()
    card = page.locator('[data-competency="overview"]').inner_text()
    print('COMPETENCIAS: "30 horas" x', card.count('30 horas'),
          '| frase nueva:', 'carga formativa estimada' in card and 'completar la evaluación' in card,
          '| texto antiguo:', '15 h 10 min' in card or 'planificación vigentes' in card)

    # Block 2: formacion section (dedicacion article + planner)
    sec = page.locator('#formacion')
    txt = sec.inner_text()
    print('RIGOR: "30 horas" x', txt.count('30 horas'),
          '| frase nueva:', 'ver los vídeos' in txt and 'completar la evaluación' in txt,
          '| texto antiguo:', '15 h 10 min' in txt or 'según el programa facilitado' in txt)

    # Block 3: FAQ - open it
    faq_item = page.locator('.faq-item', has_text='duración efectiva').first
    faq_item.locator('summary').click()
    page.wait_for_timeout(300)
    faq = faq_item.inner_text()
    print('FAQ: "30 horas" x', faq.count('30 horas'),
          '| frase nueva:', 'carga formativa estimada' in faq and 'completar la evaluación' in faq,
          '| texto antiguo:', '15 h 10 min' in faq or 'planificación vigentes' in faq)

    page.screenshot(path='shots/duration_blocks.png', full_page=True)
    browser.close()
