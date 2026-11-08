// Escenas de «Salidas laborales»: crossfade de la imagen fija según el artículo visible.
// Sin GSAP en el proyecto: IntersectionObserver + transiciones CSS. Sin rAF permanente.
export function initCareersScroll(){
  const root=document.querySelector<HTMLElement>('.itr-careers');
  if(!root||root.dataset.careersBound)return;
  root.dataset.careersBound='1';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return; // bloques estáticos, sin efectos

  root.classList.add('itr-careers-js');
  const articles=[...root.querySelectorAll<HTMLElement>('.itr-careers-articles .salida')];
  const scenes=[...root.querySelectorAll<HTMLElement>('.itr-careers-scene')];
  const counter=root.querySelector<HTMLElement>('.itr-careers-counter');
  const roles=root.querySelector<HTMLElement>('.itr-careers-roles');
  const desktop=window.matchMedia('(min-width: 1024px)');
  let active=0;
  let sceneObserver:IntersectionObserver|null=null;
  let revealObserver:IntersectionObserver|null=null;

  function setScene(index:number){
    if(index===active||index<0||index>=scenes.length)return;
    active=index;
    scenes.forEach((scene,i)=>scene.classList.toggle('is-active',i===index));
    if(counter)counter.textContent=`0${index+1} / 04`;
  }

  // Escena correcta tras carga por ancla, restauración del scroll o salto rápido:
  // el artículo que contiene el punto medio del viewport manda.
  function syncFromViewport(){
    const mid=window.innerHeight*.5;
    let current=-1;
    for(const article of articles){
      const r=article.getBoundingClientRect();
      if(r.top<=mid&&r.bottom>=mid)current=Number(article.dataset.scene);
    }
    if(current===-1){
      const last=articles[articles.length-1].getBoundingClientRect();
      current=last.top<mid?Number(articles[articles.length-1].dataset.scene):0;
    }
    setScene(current);
  }

  function enableDesktop(){
    if(!desktop.matches||sceneObserver)return;
    sceneObserver=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting)setScene(Number((entry.target as HTMLElement).dataset.scene));
    },{rootMargin:'-42% 0px -42% 0px'});
    articles.forEach(article=>sceneObserver!.observe(article));
  }
  function disableDesktop(){
    sceneObserver?.disconnect();sceneObserver=null;
  }

  // Revelado único: artículos y filas de roles con stagger corto; sin JS, todo visible.
  revealObserver=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){
      entry.target.classList.add('is-revealed');
      revealObserver?.unobserve(entry.target);
    }
  },{rootMargin:'0px 0px -12% 0px',threshold:.05});
  [...articles,...(roles?[roles]:[])].forEach(el=>revealObserver!.observe(el));

  enableDesktop();
  syncFromViewport();
  desktop.addEventListener('change',()=>{
    if(desktop.matches){enableDesktop();syncFromViewport()}else disableDesktop();
  });
  window.addEventListener('load',syncFromViewport,{once:true});
  // Re-medición tras fuentes/imágenes para no quedar en una escena antigua.
  if(document.fonts?.ready)document.fonts.ready.then(syncFromViewport);
}
