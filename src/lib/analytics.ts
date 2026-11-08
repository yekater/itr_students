type EventName='cta_info_click'|'course_platform_click'|'demo_start'|'demo_complete'|'program_open'|'faq_open';
type Parameters=Partial<Record<'cta_id'|'section_id'|'destination_type'|'module_id'|'demo_step'|'campaign',string>>;
type Handler=(event:EventName,parameters:Parameters)=>void;
let adapter:Handler|undefined;
export function configureAnalytics(handler:Handler,consent:boolean){adapter=consent?handler:undefined;}
export function track(event:EventName,parameters:Parameters={}){adapter?.(event,parameters);}
// Adaptador de prueba local: se activa solo con consentimiento explícito de analítica.
// Ningún proveedor externo está configurado; no envía datos fuera del navegador.
export const testHandler:Handler=(event,parameters)=>{window.dispatchEvent(new CustomEvent('itr-analytics-event',{detail:{event,parameters}}));};
