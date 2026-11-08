type Particle = { x: number; y: number; vx: number; vy: number; r: number };

const roots = new WeakSet<HTMLElement>();

export function initSectionParticles(section: HTMLElement): void {
  if (roots.has(section)) return;
  const canvas = section.querySelector<HTMLCanvasElement>('.section-particles');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  roots.add(section);
  const pointer = { x: -9999, y: -9999 };
  let particles: Particle[] = [];
  let raf = 0;
  let visible = false;

  const spawn = (): Particle => ({
    x: Math.random() * section.offsetWidth,
    y: Math.random() * section.offsetHeight,
    vx: (Math.random() - .5) * .12,
    vy: (Math.random() - .5) * .1,
    r: .8 + Math.random() * 1.4,
  });
  const resize = () => {
    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const density = window.matchMedia('(max-width: 600px)').matches ? 30000 : 16000;
    particles = Array.from({ length: Math.min(120, Math.max(20, Math.round(rect.width * rect.height / density))) }, spawn);
  };
  const draw = () => {
    if (!visible || document.hidden) { raf = 0; return; }
    const width = section.offsetWidth;
    const height = section.offsetHeight;
    if (Math.abs(height - (parseFloat(canvas.style.height) || 0)) > 1 || Math.abs(width - (parseFloat(canvas.style.width) || 0)) > 1) { resize(); }
    ctx.clearRect(0, 0, width, height);
    for (const particle of particles) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 110 && distance > 0) {
        const force = (1 - distance / 110) * .28;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }
      particle.vx *= .965;
      particle.vy *= .965;
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < -8) particle.x = width + 8;
      if (particle.x > width + 8) particle.x = -8;
      if (particle.y < -8) particle.y = height + 8;
      if (particle.y > height + 8) particle.y = -8;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(145,211,245,.42)';
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  const start = () => { visible = true; if (!raf) raf = requestAnimationFrame(draw); };
  const stop = () => { visible = false; if (raf) cancelAnimationFrame(raf); raf = 0; ctx.clearRect(0, 0, section.offsetWidth, section.offsetHeight); };
  const onMove = (event: PointerEvent) => {
    const rect = section.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    start();
  };
  const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };
  let resizeRaf = 0;
  const scheduleResize = () => { if (!resizeRaf) resizeRaf = requestAnimationFrame(() => { resizeRaf = 0; resize(); }); };
  scheduleResize();
  const resizeObserver = new ResizeObserver(scheduleResize);
  resizeObserver.observe(section);
  const visibilityObserver = new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop(), { threshold: .03 });
  visibilityObserver.observe(section);
  section.addEventListener('pointermove', onMove, { passive: true });
  section.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
}
