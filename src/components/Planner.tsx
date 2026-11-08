import {useState} from 'react';
import {courseHours} from '../data/site';

type Copy={title:string; label:string; weeks:(weeks:number)=>string; invalid:string; note:string};
type Props={locale?:'es'|'ca'|'en'; copy?:Copy; rootMargin?:string};

const spanish:Copy={title:'Haz espacio para aprender.',label:'Horas de estudio por semana',weeks:(weeks:number)=>`${weeks} semanas de dedicación orientativa.`,invalid:`Introduce un número de horas mayor que 0 y hasta ${courseHours}.`,note:'Estimación sobre la carga formativa del curso. No es un calendario contratado. Tu elección no se guarda ni se envía.'};
const catalan:Copy={title:'Fes espai per aprendre.',label:'Hores d’estudi per setmana',weeks:(weeks:number)=>`${weeks} setmanes de dedicació orientativa.`,invalid:`Introdueix un nombre d’hores superior a 0 i fins a ${courseHours}.`,note:`Estimació sobre ${courseHours} hores. No és un calendari contractat. La teva elecció no es desa ni s’envia.`};
const english:Copy={title:'Make room to learn.',label:'Study hours per week',weeks:(weeks:number)=>`${weeks} weeks of estimated study.`,invalid:`Enter a number of hours greater than 0 and up to ${courseHours}.`,note:`Estimate based on ${courseHours} hours. This is not a contracted schedule. Your choice is not saved or sent.`};

const byLocale:{es:Copy;ca:Copy;en:Copy}={es:spanish,ca:catalan,en:english};

export default function Planner({locale='es',copy}:Props){
  const defaultCopy=copy??byLocale[locale];
  const [hours,setHours]=useState('5');
  const n=Number(hours);
  const valid=Number.isFinite(n)&&n>0&&n<=courseHours;

  return <div className="planner"><h3>{defaultCopy.title}</h3><label htmlFor="hours">{defaultCopy.label}</label><input id="hours" name="hours" type="number" min="1" max={courseHours} inputMode="numeric" value={hours} onChange={e=>setHours(e.target.value)}/><p aria-live="polite">{valid?<><strong>{defaultCopy.weeks(Math.ceil(courseHours/n))}</strong></>:defaultCopy.invalid}</p><small>{defaultCopy.note}</small></div>
}
