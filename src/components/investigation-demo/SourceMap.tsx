import {useState} from 'react';
import {type DemoCase,type SourceId} from '../../data/demo-case';

type Props={opened:SourceId[];selected:SourceId|null;onSelect:(id:SourceId)=>void;copy:DemoCase};

export default function SourceMap({opened,selected,onSelect,copy}:Props){
  const [expanded,setExpanded]=useState<string[]>([copy.categories[0].id]);
  const toggle=(id:string)=>setExpanded(e=>e.includes(id)?e.filter(x=>x!==id):[...e,id]);
  return <div className="sourcemap" aria-label={copy.ui.mapAria}>
    {copy.categories.map(c=>{
      const open=expanded.includes(c.id);
      return <div className="sourcemap-branch" key={c.id}>
        <button type="button" className="sourcemap-toggle" aria-expanded={open} onClick={()=>toggle(c.id)}>
          <span aria-hidden="true">{open?'−':'+'}</span> {c.label}
          <small>{c.description}</small>
        </button>
        {open&&<ul>
          {copy.sources.filter(s=>s.categoryId===c.id).map(s=>
            <li key={s.id}>
              <button type="button" className="sourcemap-source" aria-pressed={selected===s.id} onClick={()=>onSelect(s.id)}>
                 <strong>{s.id}</strong> {s.title}<span className="sourcemap-action">{copy.ui.open} {s.id}</span>
                {opened.includes(s.id)&&<span className="sourcemap-opened">{copy.ui.opened}</span>}
              </button>
            </li>)}
        </ul>}
      </div>;
    })}
  </div>;
}
