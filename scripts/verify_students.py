from playwright.sync_api import sync_playwright

CHECKS = {
    '/':   ['Curso iTR+ de investigación digital para estudiantes', 'Matricularme', 'Alumnos que buscan prácticas',
            'primer empleo', 'Dirigido a estudiantes', 'empleabilidad'],
    '/ca/':['Curs iTR+ per a estudiants', 'Matricular-me', 'primer treball', 'ocupabilitat'],
    '/en/':['iTR+ course for students', 'Enroll now', 'first job', 'employability'],
}
BANNED = ['Contratar', 'Contractar', 'para abogados', 'per a advocats', 'course for lawyers',
          'práctica jurídica', 'validez judicial', 'validesa judicial', 'judicial validity', 'Un despacho', 'despachos y']

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1360, 'height': 900})
    page.set_default_timeout(60000)
    for route, needles in CHECKS.items():
        page.goto('http://127.0.0.1:4173' + route)
        page.wait_for_load_state('networkidle')
        text = page.content()
        results = []
        for n in needles:
            results.append(('OK ' if (n in text) else 'FAIL', n))
        banned_hits = [b for b in BANNED if b in text]
        print('==', route, flush=True)
        for st, n in results: print(' ', st, n, flush=True)
        print('  BANNED:', banned_hits if banned_hits else 'none', flush=True)
        page.screenshot(path='shots/verify' + route.replace('/', '_').rstrip('_') + '.png', full_page=True)
    browser.close()

