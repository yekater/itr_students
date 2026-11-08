/**
 * Cursor-reactive particle background for the closing ("TU SIGUIENTE PASO") section.
 * Shared by /, /ca/ and /en/: same colors, density, movement and pointer interaction.
 * Stops offscreen and on hidden tabs, follows section resizes, disabled with
 * prefers-reduced-motion; idempotent per section to avoid duplicate loops/canvases.
 */
const initialized = new WeakSet<HTMLElement>();

export function initFinalParticles(section: HTMLElement): void {
  const canvas = section.querySelector<HTMLCanvasElement>('.final-particles');
  if (!canvas || initialized.has(section) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  initialized.add(section);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  type P = {x: number; y: number; vx: number; vy: number; r: number};
  let particles: P[] = [];
  let raf = 0;
  let running = false;
  let visible = false;
  const mouse = {x: -9e3, y: -9e3};

  function spawn(): P {
    return {x: Math.random() * section.offsetWidth, y: Math.random() * section.offsetHeight, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: .8 + Math.random() * 1.6};
  }

  function resize() {
    const w = section.offsetWidth, h = section.offsetHeight;
    canvas!.width = Math.round(w * dpr);
    canvas!.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({length: Math.min(110, Math.round(w * h / 16000))}, spawn);
  }

  function step() {
    const w = section.offsetWidth, h = section.offsetHeight;
    ctx!.clearRect(0, 0, w, h);
    for (const p of particles) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy, R = 130;
      if (d2 < R * R && d2 > .01) {
        const d = Math.sqrt(d2), f = (1 - d / R) * 1.6;
        p.vx += dx / d * f * .12;
        p.vy += dy / d * f * .12;
      }
      p.vx *= .96;
      p.vy *= .96;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(150,205,245,.55)';
      ctx!.fill();
    }
    raf = requestAnimationFrame(step);
  }

  function sync() {
    const shouldRun = visible && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      raf = requestAnimationFrame(step);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
      ctx!.clearRect(0, 0, section.offsetWidth, section.offsetHeight);
    }
  }

  resize();
  new ResizeObserver(resize).observe(section);
  section.addEventListener('pointermove', (e: PointerEvent) => {
    const r = section.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  section.addEventListener('pointerleave', () => {
    mouse.x = -9e3;
    mouse.y = -9e3;
  });
  new IntersectionObserver(([entry]) => {
    visible = !!entry && entry.intersectionRatio > .05;
    sync();
  }, {threshold: [0, .05]}).observe(section);
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('astro:before-swap', () => {
    document.removeEventListener('visibilitychange', sync);
    running = false;
    cancelAnimationFrame(raf);
    initialized.delete(section);
  }, {once: true});
}
