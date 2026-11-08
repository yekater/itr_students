import {useEffect,useRef,useState} from 'react';
import {getDemoCase,type DemoCase,type SourceId} from '../../data/demo-case';
import {initialState,reportReady,requirements} from '../../lib/demo-engine';
import {track} from '../../lib/analytics' ;
import SourceMap from './SourceMap';
import EvidenceViewer from './EvidenceViewer';
import InvestigationGraph from './InvestigationGraph';
import MiniReport from './MiniReport';

type Props={ctaHref:string;locale?:'es'|'ca'|'en'};

export default function InvestigationDemo({ctaHref,locale='es'}:Props){
  const copy:DemoCase=getDemoCase(locale);
  const ui=copy.ui;
  const [state,setState]=useState(initialState);
  const [selected,setSelected]=useState<SourceId|null>(null);
  const [active,setActive]=useState(0);
  const [hint,setHint]=useState<string>('');
  const started=useRef(false),completed=useRef(false);
  const chapterRefs=useRef<(HTMLElement|null)[]>([]);
  const reduceMotion=useRef(false);
  const stateRef=useRef(state);
  stateRef.current=state;

  useEffect(()=>{reduceMotion.current=window.matchMedia('(prefers-reduced-motion: reduce)').matches},[]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      for(const e of entries)if(e.isIntersecting){
        const index=Number((e.target as HTMLElement).dataset.chapter);
        setActive(i=>Math.max(i,index));
        const r=requirements(stateRef.current);
        if(index===1&&!r.f01)setHint(ui.hintBeforeF01);
        else if(index===2&&(!r.f01||!r.f02))setHint(ui.hintContrast);
        else if(index===3&&!reportReady(stateRef.current))setHint(ui.hintReport+copy.missingSteps(stateRef.current).join(' '));
        else setHint('');
      }
    },{rootMargin:'-40% 0px -40% 0px'});
    chapterRefs.current.forEach(el=>el&&observer.observe(el));
    return ()=>observer.disconnect();
  },[locale]);
  // Si el jugador completa lo que faltaba, la pista activa deja de tener razón de ser.
  useEffect(()=>{
    if(!hint)return;
    const r=requirements(state);
    const ok=active<=1?r.f01:active===2?r.f01&&r.f02:reportReady(state);
    if(ok)setHint('');
  },[state,hint,active]);

  function begin(){if(!started.current){track('demo_start');started.current=true}}
  function finishIfReady(next:typeof initialState){
    if(!completed.current&&reportReady(next)){completed.current=true;track('demo_complete',{demo_step:'miniinforme-generado'})}
  }
  const selectSource=(id:SourceId)=>{begin();setSelected(id);setState(s=>s.opened.includes(id)?s:{...s,opened:[...s.opened,id]})};
  const toggleExcerpt=(excerptId:string)=>{begin();setState(s=>{const added=s.added.includes(excerptId)?s.added.filter(a=>a!==excerptId):[...s.added,excerptId];const next={...s,added};finishIfReady(next);return next})};
  const answerOrigin=(answer:'independent'|'reproduces')=>{begin();setState(s=>{const next={...s,originAnswer:answer};finishIfReady(next);return next})};
  const chooseConclusion=(id:'control'|'none'|'partial')=>{begin();setState(s=>{const next={...s,conclusion:id};finishIfReady(next);return next})};
  const reset=()=>{setState(initialState);setSelected(null);setHint('');setActive(0);started.current=false;completed.current=false};
  const goTo=(i:number)=>{
    const el=chapterRefs.current[i];
    if(!el)return;
    el.scrollIntoView({behavior:reduceMotion.current?'auto':'smooth',block:'start'});
    const h=el.querySelector<HTMLElement>('.probar-chapter-title');
    if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}
  };

  const r=requirements(state);
  const ready=reportReady(state);
  const selectedSource=selected?copy.sources.find(s=>s.id===selected)!:null;
  const f03Wrong=state.originAnswer==='independent';

  return <div className="probar-app">
    <header className="case-top">
      <span className="eyebrow">{ui.labEyebrow}</span>
      <span className="pill">{ui.pill}</span>
    </header>
    <h3 className="probar-case-title">{copy.caseTitle}</h3>
    <p className="probar-intro">{copy.caseIntro}</p>
    <p className="probar-question"><strong>{ui.questionLabel}</strong> {copy.caseQuestion}</p>

    <div className="probar-layout">
      <div className="probar-chapters">
        <article className="probar-chapter" data-chapter={0} ref={el=>{chapterRefs.current[0]=el}}>
          <p className="eyebrow">{ui.stageEyebrows[0]}</p>
          <h3 className="probar-chapter-title" id="probar-chapter-1">{ui.stage1Title}</h3>
           <p>{ui.stage1Body.split('\n').map((line,i)=><span key={i}>{i>0&&<br/>}{line}</span>)}</p>
          <SourceMap opened={state.opened} selected={selected} onSelect={selectSource} copy={copy}/>
          <EvidenceViewer source={selectedSource} state={state} onAdd={toggleExcerpt} copy={copy}/>
          <p className="probar-result" role="status">{r.f01?copy.stageResults.localizar:''}</p>
           <div className="probar-nav"><span id="probar-next-1-help" className="probar-step-help">{r.f01?'':ui.hintBeforeF01}</span><button type="button" className="button" disabled={!r.f01} aria-describedby="probar-next-1-help" onClick={()=>goTo(1)}>{ui.continue1}</button></div>
        </article>

        <article className="probar-chapter" data-chapter={1} ref={el=>{chapterRefs.current[1]=el}}>
          <p className="eyebrow">{ui.stageEyebrows[1]}</p>
          <h3 className="probar-chapter-title" id="probar-chapter-2">{ui.stage2Title}</h3>
          <p>{ui.stage2Body}</p>
           {['F02','F03','F04'].map(id=><EvidenceViewer key={id} source={copy.sources.find(s=>s.id===id)!} state={state} onAdd={toggleExcerpt} copy={copy}/>)}
          <div className="origin-quiz" role="group" aria-label={copy.originQuestion}>
            <p>{copy.originQuestion}</p>
            {copy.originOptions.map(o=><label key={o.id} className="check"><input type="radio" name="origin-f03" checked={state.originAnswer===o.id} onChange={()=>answerOrigin(o.id)}/> {o.label}</label>)}
            <p className="origin-feedback" role="status">{state.originAnswer==='reproduces'?copy.originFeedback.reproduces:f03Wrong?copy.originFeedback.independent:''}</p>
          </div>
          <p className="probar-result" role="status">{r.f02&&r.origin?copy.stageResults.contrastar:''}</p>
          <div className="probar-nav">
            <button type="button" className="text-link" onClick={()=>goTo(0)}>{ui.back}</button>
             <span id="probar-next-2-help" className="probar-step-help">{r.f02&&r.origin?'':ui.hintContrast}</span><button type="button" className="button" disabled={!r.f02||!r.origin} aria-describedby="probar-next-2-help" onClick={()=>goTo(2)}>{ui.continue2}</button>
          </div>
        </article>

        <article className="probar-chapter" data-chapter={2} ref={el=>{chapterRefs.current[2]=el}}>
          <p className="eyebrow">{ui.stageEyebrows[2]}</p>
          <h3 className="probar-chapter-title" id="probar-chapter-3">{ui.stage3Title}</h3>
          <p>{ui.stage3Body}</p>
          <div role="group" aria-label={ui.conclusionGroupAria}>
            {copy.conclusions.map(c=><label key={c.id} className="check"><input type="radio" name="conclusion" checked={state.conclusion===c.id} onChange={()=>chooseConclusion(c.id)}/> {c.label}</label>)}
            {state.conclusion&&<p className="origin-feedback" role="status">{copy.conclusionFeedback[state.conclusion]}</p>}
          </div>
          <p className="probar-result" role="status">{r.conclusion?copy.stageResults.concluir:''}</p>
          <div className="probar-nav">
            <button type="button" className="text-link" onClick={()=>goTo(1)}>{ui.back}</button>
             <span id="probar-next-3-help" className="probar-step-help">{r.conclusion?'':ui.stage3Body}</span><button type="button" className="button" disabled={!r.conclusion} aria-describedby="probar-next-3-help" onClick={()=>goTo(3)}>{ui.continue3}</button>
          </div>
        </article>

        <article className="probar-chapter" data-chapter={3} ref={el=>{chapterRefs.current[3]=el}}>
          <p className="eyebrow">{ui.stageEyebrows[3]}</p>
          <h3 className="probar-chapter-title" id="probar-chapter-4">{ui.stage4Title}</h3>
          <p>{ui.stage4Body}</p>
          <MiniReport state={state} ctaHref={ctaHref} copy={copy}/>
          <div className="probar-nav">
            <button type="button" className="text-link" onClick={()=>goTo(2)}>{ui.back}</button>
            <button type="button" className="text-link" onClick={reset}>{ui.restart}</button>
          </div>
        </article>
      </div>

      <aside className="probar-panel" aria-label={ui.panelAria}>
        <div className="probar-panel-inner">
          <InvestigationGraph state={state} copy={copy}/>
          <section aria-label={ui.fileHeading}>
            <h4>{ui.fileHeading}</h4>
            {state.added.length===0?<p>{ui.fileEmpty}</p>:<ul>
              {state.added.map(id=>{const s=copy.sources.find(x=>x.excerpts.some(e=>e.id===id))!;const e=s.excerpts.find(x=>x.id===id)!;return <li key={id} className="record"><strong>{s.id}</strong> · {e.highlight}<button type="button" className="probar-remove" onClick={()=>toggleExcerpt(id)}>{ui.remove}</button></li>})}
            </ul>}
          </section>
          <section aria-label={ui.panelAria} aria-live="polite">
            {hint&&<p className="probar-hint">{hint} <button type="button" className="text-link" onClick={()=>goTo(Math.max(0,active-1))}>{ui.back}</button></p>}
            {!hint&&ready&&<p className="probar-hint probar-hint-ok">{ui.panelStatusReady}</p>}
          </section>
        </div>
      </aside>
    </div>
    <noscript>
      <h3>{ui.noscriptTitle}</h3>
      <p>{ui.noscriptBody}</p>
    </noscript>
  </div>;
}
