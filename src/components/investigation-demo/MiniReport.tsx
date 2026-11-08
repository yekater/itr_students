import {downloadReport,missingSteps,reportReady,type DemoState} from '../../lib/demo-engine';
import {type DemoCase} from '../../data/demo-case';

type Props={state:DemoState;ctaHref:string;copy:DemoCase};

export default function MiniReport({state,ctaHref,copy}:Props){
  const ui=copy.ui;
  const ready=reportReady(state);
  if(!ready){
    return <div className="minireport minireport-pending">
      <h4>{ui.reportPendingTitle}</h4>
      <p>{ui.reportPendingIntro}</p>
      <ul>{missingSteps(state,copy).map(m=><li key={m}>{m}</li>)}</ul>
    </div>;
  }
  const achieved=[
    state.added.includes('roleInA')&&copy.outcomes[0],
    state.originAnswer==='reproduces'&&copy.outcomes[1],
    state.conclusion==='partial'&&copy.outcomes[2],
    reportReady(state)&&copy.outcomes[3],
  ].filter(Boolean) as string[];
  return <div className="minireport">
    <h4>{ui.reportTitle}</h4>
    <dl>
      <dt>{ui.reportDtQuestion}</dt><dd>{copy.caseQuestion}</dd>
      <dt>{ui.reportDtConclusion}</dt><dd>{copy.conclusions.find(c=>c.id===state.conclusion)!.label}</dd>
    </dl>
    <p>{copy.stageResults.documentar}</p>
    <button type="button" className="button" onClick={()=>downloadReport(state,copy)}>{ui.download}</button>
    <p className="minireport-closing">{copy.closingLine}</p>
    <ul className="minireport-outcomes" aria-label={ui.outcomesLabel}>
      {achieved.map(o=><li key={o}>{o}</li>)}
    </ul>
    <p className="minireport-cta">{copy.courseBridge} <a className="text-link" href={ctaHref}>{copy.requestInfo}</a></p>
  </div>;
}
