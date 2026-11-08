import {type DemoCase} from '../../data/demo-case';
import {hasAdded, type DemoState} from '../../lib/demo-engine';

type Props={source:DemoCase['sources'][number]|null;state:DemoState;onAdd:(excerptId:string)=>void;copy:DemoCase};

export default function EvidenceViewer({source,state,onAdd,copy}:Props){
  const ui=copy.ui;
  if(!source)return <div className="evidence-empty"><p>{ui.empty}</p></div>;
  const excerpt=source.excerpts[0];
  const added=hasAdded(state,excerpt.id);
  const addable=source.id==='F01'||source.id==='F02'||source.id==='F04';
  return <article className="evidence-card" aria-label={`${source.id}: ${source.title}`}>
    <header>
      <span className="evidence-id">{source.id}</span>
      <div><h4>{source.title}</h4><p className="evidence-meta">{source.typeLabel} · {source.publisher} · {source.publishedAt}</p></div>
    </header>
    <p className="evidence-origin">{ui.originLabel}{source.originNote}</p>
    <blockquote cite={source.id}>{excerpt.highlight&&excerpt.text.includes(excerpt.highlight)
      ?excerpt.text.split(excerpt.highlight).map((part,i)=><span key={i}>{i>0&&<mark>{excerpt.highlight}</mark>}{part}</span>)
      :excerpt.text}</blockquote>
    {excerpt.limitations.length>0&&<ul className="evidence-limits" aria-label={ui.limitsLabel}>
      {excerpt.limitations.map(l=><li key={l}>{l}</li>)}
    </ul>}
    {addable?
      <button type="button" className="button evidence-add" aria-pressed={added} onClick={()=>onAdd(excerpt.id)}>
        {added?ui.added:ui.add}
      </button>
      :<p className="evidence-note">{ui.readNote}</p>}
  </article>;
}
