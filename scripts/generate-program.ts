import PDFDocument from 'pdfkit';
import {createWriteStream,mkdirSync} from 'node:fs';
import {curriculum} from '../src/data/curriculum';
import {durationDetail,COURSE_URL} from '../src/data/site';
import {courseFormat} from '../src/data/course-format';

mkdirSync('public/downloads',{recursive:true});
const doc=new PDFDocument({size:'A4',margin:48,bufferPages:true,info:{Title:'iTR+ · Programa de investigación digital para abogados',Author:'iTR+',Subject:'Programa, metodología de estudio autónomo y acceso permanente'}});
const stream=createWriteStream('public/downloads/programa-investigacion-digital-abogados.pdf');
doc.pipe(stream);
doc.registerFont('Inter','node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
doc.registerFont('IBM Plex Sans','node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff');
const width=doc.page.width-96;
function label(text:string){doc.font('Inter').fontSize(9).fillColor('#2563A6').text(text,{characterSpacing:1.2});doc.moveDown(1.1);}
function title(text:string){doc.font('IBM Plex Sans').fontSize(25).fillColor('#0B1F3A').text(text,{width,lineGap:3});doc.moveDown(.7);}
function body(text:string){doc.font('Inter').fontSize(11).fillColor('#163A63').text(text,{width,lineGap:4});doc.moveDown(.8);}
function section(heading:string,text:string){doc.font('IBM Plex Sans').fontSize(15).fillColor('#0B1F3A').text(heading,{width});doc.moveDown(.35);body(text);}
function page(kicker:string,heading:string){doc.addPage();label(kicker);title(heading);}

label('FORMACIÓN ESPECIALIZADA · INVESTIGACIÓN DIGITAL');
doc.font('IBM Plex Sans').fontSize(40).fillColor('#0B1F3A').text('iTR+');doc.moveDown(.7);
title('Curso iTR+ para abogados');
body('Aprende a buscar, contrastar y documentar información pública con una metodología práctica y rigurosa.');
doc.moveDown(.3);
section('7 módulos · 38 lecciones · Evaluación final','Investigación en fuentes abiertas con enfoque jurídico, desde los fundamentos hasta la elaboración de informes.');
section('Estudio autónomo, a tu ritmo',courseFormat.mode+' '+courseFormat.pace);
section('PDF, vídeos y foro',courseFormat.materials+' '+courseFormat.support);
section('Materiales para siempre',courseFormat.access);
body(durationDetail);

page('CÓMO APRENDERÁS','Una formación que se adapta a tu agenda');
section('01 / Entra en tu espacio de formación','Accede a la plataforma iTR+ con tu usuario y contraseña. Puedes estudiar aunque trabajes a jornada completa: el aprendizaje es autónomo y no requiere horarios de clase obligatorios.');
section('02 / Trabaja el PDF de cada módulo',courseFormat.materials+' Lee los contenidos y utiliza las referencias y los vídeos enlazados para avanzar por las lecciones.');
section('03 / Practica y contrasta','Trabaja las actividades, los ejemplos y los cuestionarios del programa. La dedicación estimada es orientativa: puedes repartirla como necesites y repasar un módulo antes de seguir.');
section('04 / Pregunta en el foro',courseFormat.support+' Utiliza este espacio para consultar los contenidos y las actividades del curso.');
section('05 / Completa la evaluación','El test final es adicional a las 38 lecciones y permite evaluar los conocimientos adquiridos. No hay una fecha límite para completar la formación.');
section('06 / Conserva el acceso',courseFormat.access+' Puedes volver a consultar los PDF, los enlaces a vídeos y los recursos cuando los necesites.');

for(const [i,module] of curriculum.entries()){
  page(`PROGRAMA / MÓDULO 0${i+1}`,module.title);
  body('Material de estudio en PDF con enlaces a vídeos y recursos complementarios. Estudia por tu cuenta y plantea tus dudas en el foro del curso.');
  doc.moveDown(.5);
  for(const [j,lesson] of module.lessons.entries()){
    doc.font('Inter').fontSize(12).fillColor('#0B1F3A').text(`${i+1}.${j+1}. ${lesson}`,{width,lineGap:6});
    doc.moveDown(.8);
  }
}
page('EVALUACIÓN Y CONTINUIDAD','Lo que viene después de los módulos');
section('Evaluación final','Test final adicional a las 38 lecciones. La formación incluye actividades, cuestionarios y un foro de consulta con el creador y el mentor del curso.');
section('Certificado final','La formación contempla un certificado final. Consulta su denominación, entidad emisora y alcance vigentes. La referencia a COEINF y sus condiciones siguen pendientes de confirmación. No se presenta como una titulación oficial ni garantiza la admisión judicial de informes.');
section('Acceso permanente',courseFormat.access+' No se establece un plazo de finalización.');
section('Uso profesional responsable','La información pública no implica tratamiento irrestricto. Respeta la finalidad legítima, la privacidad y los límites de acceso; distingue hallazgos, indicios e hipótesis.');
doc.moveDown(.5);
doc.font('IBM Plex Sans').fontSize(15).fillColor('#0B1F3A').text('Información completa y acceso');
doc.moveDown(.5).font('Inter').fontSize(11).fillColor('#2563A6').text('Consultar la ficha del curso y acceder a iTR+',{link:COURSE_URL,underline:true});
doc.moveDown(.7).fontSize(8).text(COURSE_URL,{width,link:COURSE_URL,lineGap:2});

const range=doc.bufferedPageRange();
for(let i=range.start;i<range.start+range.count;i++){
  doc.switchToPage(i);
  const bottom=doc.page.margins.bottom;doc.page.margins.bottom=0;
  doc.moveTo(48,doc.page.height-48).lineTo(doc.page.width-48,doc.page.height-48).lineWidth(.5).strokeColor('#d8e1e9').stroke();
  doc.font('Inter').fontSize(8).fillColor('#507DA8').text('iTR+ · Programa de investigación digital para abogados',48,doc.page.height-34,{width:width-70,lineBreak:false});
  doc.text(`${i+1} / ${range.count}`,doc.page.width-100,doc.page.height-34,{width:52,align:'right',lineBreak:false});
  doc.page.margins.bottom=bottom;
}
doc.end();
await new Promise<void>((resolve,reject)=>{stream.on('finish',resolve);stream.on('error',reject)});
