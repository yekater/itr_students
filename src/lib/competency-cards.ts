// Состояния карточек компетенций: явное раскрытие (клик), подавление (закрытие по
// клику/Escape) и временные hover/focus. Только память страницы, без localStorage.
export function initCompetencyCards(){
  const roots=document.querySelectorAll<HTMLElement>('.itr-competencies');
  if(!roots.length)return;
  const canHover=window.matchMedia('(hover: hover) and (pointer: fine)');

  roots.forEach(root=>{
    if(root.dataset.competencyBound)return;
    root.dataset.competencyBound='1';
    root.classList.add('itr-competencies--ready');

    const cards=[...root.querySelectorAll<HTMLElement>('.itr-competency')];
    const state=cards.map(()=>({pinned:false,suppressed:false,temp:false}));

    function sync(i:number){
      const card=cards[i],s=state[i];
      const open=(s.pinned&&!s.suppressed)||s.temp;
      card.classList.toggle('is-open',open);
      card.querySelector('.itr-competency__control')!.setAttribute('aria-expanded',String(open));
    }
    function open(i:number){state[i].temp=true;sync(i)}
    function closeTemp(i:number){state[i].temp=false;sync(i)}
    function close(i:number){state[i].temp=false;state[i].pinned=false;sync(i)}

    cards.forEach((card,i)=>{
      const control=card.querySelector<HTMLButtonElement>('.itr-competency__control')!;

      card.addEventListener('pointerenter',e=>{
        if(e.pointerType!=='mouse'||!canHover.matches)return;
        if(!state[i].suppressed)open(i);
      });
      card.addEventListener('pointerleave',e=>{
        if(e.pointerType!=='mouse'||!canHover.matches)return;
        state[i].suppressed=false; // уход курсора снимает подавление
        if(!state[i].pinned)close(i);else closeTemp(i);
      });
      control.addEventListener('click',()=>{
        if(state[i].pinned&&!state[i].suppressed){
          state[i].pinned=false;state[i].suppressed=true;close(i);
        }else{
          state[i].pinned=true;state[i].suppressed=false;state[i].temp=false;sync(i);
        }
      });
      card.addEventListener('focusin',()=>{if(!state[i].suppressed)open(i)});
      card.addEventListener('focusout',e=>{
        if(card.contains(e.relatedTarget as Node))return;
        state[i].suppressed=false;
        if(!state[i].pinned)close(i);else closeTemp(i);
      });
      card.addEventListener('keydown',e=>{
        if(e.key==='Escape'&&(state[i].pinned||state[i].temp)){
          state[i].suppressed=true;close(i);
        }
      });
    });

    // Внешний details: при закрытии сбрасываем hover/focus-состояния.
    const details=root.closest('details');
    if(details)details.addEventListener('toggle',()=>{
      if(details.open)return;
      state.forEach((s,i)=>{s.pinned=false;s.suppressed=false;s.temp=false;sync(i)});
    });
  });
}
