// Reglas deterministas del caso demostrativo. Sin aleatoriedad, sin red, sin evaluación externa.
import {sources,type SourceId,type DemoCase,getDemoCase,originOptions,conclusions} from '../data/demo-case';

export type OriginAnswer=(typeof originOptions)[number]['id']|null;
export type ConclusionId=(typeof conclusions)[number]['id']|null;

export type DemoState={
  opened:SourceId[];
  added:string[];
  originAnswer:OriginAnswer;
  conclusion:ConclusionId;
};

export const initialState:DemoState={opened:[],added:[],originAnswer:null,conclusion:null};

const CORRECT_ORIGIN:OriginAnswer='reproduces';
const CORRECT_CONCLUSION:ConclusionId='partial';

export const esCopy=getDemoCase('es');

export const findSource=(id:SourceId)=>sources.find(s=>s.id===id)!;
export const hasAdded=(state:DemoState,excerptId:string)=>state.added.includes(excerptId);
export const originVerified=(state:DemoState)=>state.originAnswer===CORRECT_ORIGIN;
export const conclusionChosen=(state:DemoState)=>state.conclusion===CORRECT_CONCLUSION;

export function requirements(state:DemoState){
  return {f01:hasAdded(state,'roleInA'),f02:hasAdded(state,'announcedCollaboration'),origin:originVerified(state),conclusion:conclusionChosen(state)};
}

export function reportReady(state:DemoState){
  const r=requirements(state);
  return r.f01&&r.f02&&r.origin&&r.conclusion;
}

export function missingSteps(state:DemoState,copy:DemoCase=esCopy):string[]{
  return copy.missingSteps(state);
}

export function reportLimitations(state:DemoState,copy:DemoCase=esCopy):string[]{
  const limits:string[]=[...copy.report.limitations];
  if(hasAdded(state,'selfDeclaredCollaboration'))limits.push(copy.report.f04Limit);
  return limits;
}

export function buildReport(state:DemoState,copy:DemoCase=esCopy):string{
  const addedSources=sources.filter(s=>s.excerpts.some(e=>state.added.includes(e.id)));
  const lines:string[]=[
    copy.report.title,
    '',
    copy.report.disclaimer,
    '',
    copy.report.questionHeading,
    copy.caseQuestion,
    '',
    copy.report.sourcesHeading,
  ];
  for(const s of addedSources){
    for(const e of s.excerpts.filter(x=>state.added.includes(x.id))){
      lines.push(`- ${s.id} · ${s.title} — ${copy.report.publisherPrefix}${s.publisher}, ${s.publishedAt}. ${copy.report.lineOrigin}: ${s.originGroupId}${s.derivedFrom?` (${copy.report.lineReproduces} ${s.derivedFrom})`:''}. ${copy.report.lineExtract}: ${e.text}`);
    }
  }
  lines.push(
    '',
    copy.report.originHeading,
    state.originAnswer==='reproduces'
      ?copy.report.originReproduces
      :copy.report.originUnreviewed,
    '',
    copy.report.supportedHeading,
    ...copy.report.supportedLines,
    '',
    copy.report.unconfirmedHeading,
    copy.unconfirmedHypothesis,
    '',
    copy.report.conclusionHeading,
    copy.conclusions.find(c=>c.id===state.conclusion)?.label??copy.report.noConclusion,
    '',
    copy.report.limitsHeading,
    ...reportLimitations(state,copy).map(l=>`- ${l}`),
    '',
  );
  return lines.join('\n');
}

export function downloadReport(state:DemoState,copy:DemoCase=esCopy){
  const blob=new Blob([buildReport(state,copy)],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=copy.report.filename;document.body.appendChild(a);a.click();a.remove();
  URL.revokeObjectURL(url);
}

export const REPORT_FILENAME=esCopy.report.filename;
