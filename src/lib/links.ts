import { COURSE_URL } from '../data/site';

export function destination(type:'contact'|'course', id:string) {
 const contactContent:Record<string,string>={
  header_contacto:'header_contacto',
  acceso_permanente_contacto:'acceso_permanente_contacto',
  siguiente_paso_contacto:'siguiente_paso_contacto',
  footer_contactar:'footer_contactar',
  pie:'footer_contactar',
  legal:'footer_contactar',
 };
 const base=type==='contact'?'https://perinfor.odoo.com/contactus':COURSE_URL;
 const url=new URL(base);
 url.search=new URLSearchParams({utm_source:'landing_osint_abogados',utm_medium:'referral',utm_campaign:'osint_juridico',utm_content:contactContent[id]??id}).toString();
 return url.href;
}
