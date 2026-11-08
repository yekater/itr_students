import {type DemoCase} from '../../data/demo-case';
import {type DemoState} from '../../lib/demo-engine';

type Props={state:DemoState;copy:DemoCase};

// Grafo progresivo: ninguna línea A→B de control; solo lo documentado o autodeclarado.
export default function InvestigationGraph({state,copy}:Props){
  const f01=state.added.includes('roleInA');
  const f02=state.added.includes('announcedCollaboration');
  const f03=state.originAnswer==='reproduces';
  const f04=state.added.includes('selfDeclaredCollaboration');
  const ui=copy.ui;
  const links=[
    {on:f01,kind:'doc',from:'person',to:'a',label:ui.graphLines.f01,labelX:280,labelY:58},
    {on:f02,kind:'doc',from:'b',to:'a',label:ui.graphLines.f02,labelX:390,labelY:190},
    {on:f04,kind:'self',from:'person',to:'b',label:ui.graphLines.f04,labelX:132,labelY:190},
  ] as const;
  const nodePos={person:[90,84],a:[470,84],b:[280,262]} as const;
  return <figure className="igraph">
    <svg viewBox="0 0 560 330" role="img" aria-label={ui.graphAria}>
      {links.filter(l=>l.on).map(l=>{
        const [x1,y1]=nodePos[l.from as 'person'|'a'|'b'],[x2,y2]=nodePos[l.to as 'person'|'a'|'b'];
        const labelOffset = l.from === 'person' ? -18 : l.from === 'b' ? 18 : 12;
        const labelX = (x1 + x2) / 2 + labelOffset;
        const labelY = (y1 + y2) / 2 - (l.from === 'person' ? 12 : 4);
        return <g key={l.label} className={`igraph-link igraph-${l.kind}`}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1}/>
          <text x={labelX} y={labelY} textAnchor="middle"><tspan className="igraph-label-plate">{l.label}</tspan></text>
        </g>;
      })}
      {f03&&<g className="igraph-link igraph-echo">
        <line x1={280} y1={72} x2={210} y2={132} pathLength={1}/>
        <text x={238} y={112} textAnchor="middle"><tspan className="igraph-label-plate">{ui.graphLines.f03}</tspan></text>
      </g>}
      {(['person','a','b'] as const).map(k=>{
        const [x,y]=nodePos[k];
        return <g key={k}>
          <circle cx={x} cy={y} r={30} className="igraph-node"/>
          <text x={x} y={y+5} textAnchor="middle" aria-hidden="true">{copy.graph[k].short}</text>
          <text x={x} y={y+52} textAnchor="middle" className="igraph-node-label">{copy.graph[k].label}</text>
        </g>;
      })}
      {f03&&<g>
        <circle cx={280} cy={72} r={20} className="igraph-node igraph-node-echo"/>
        <text x={280} y={76} textAnchor="middle" aria-hidden="true">F03</text>
      </g>}
    </svg>
    <figcaption>
       <p>{ui.graphNote}</p>
      <strong>{ui.graphListLabel}</strong>
      <ul>
        {f01&&<li>{ui.graphLines.f01}</li>}
        {f02&&<li>{ui.graphLines.f02}</li>}
        {f03&&<li>{ui.graphLines.f03}</li>}
        {f04&&<li>{ui.graphLines.f04}</li>}
        {!f01&&!f02&&!f04&&<li>{ui.graphLines.none}</li>}
      </ul>
    </figcaption>
  </figure>;
}
