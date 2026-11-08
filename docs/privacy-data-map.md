# Mapa de datos — landing abogados.itrplus.com (auditoría interna, 02/11/2026)

Documento interno. No se publica. Estado verificado por inspección del código fuente y observación de peticiones/almacenamiento en `npm run preview` (requisito previo a la redacción pública de la Política de privacidad).

## 1. Ámbito de la landing (estática)

| Tratamiento | Datos | Finalidad | Base propuesta | Encargados/recursos | Conservación | Transferencias | Evidencia / pregunta abierta |
|---|---|---|---|---|---|---|---|
| Servir la web estática | Petición HTTP: IP, user-agent, fecha/hora, recursos solicitados, errores | Disponibilidad, seguridad, prevención de abuso | Interés legítimo (art. 6.1.f RGPD). Se evita invocar «obligación legal» genérica: no todo el RGPD ni el ordenamiento exige logs | Proveedor de alojamiento estático (dist/) solo | La del proveedor | Sin identificar | Pregunta abierta: proveedor real de alojamiento y su política de logs/retención (no publicado aún; docs/despliegue.md confirma que DNS no configurado) |
| Preferencias de consentimiento | `itr-consent-v1` (localStorage): schemaVersion, purposesVersion, updatedAt, expiresAt, categories (analytics/marketing/externalMedia) | Recordar y respetar la decisión sobre servicios opcionales | Obligación legal/consentimiento para no esenciales (art. 6.1.c RGPD; art. 22.2 LSSI-CE) | Ninguno: solo el propio navegador | Caduca a los **12 meses** (`MAX_AGE_MONTHS = 12` en src/lib/consent.ts:16) o al borrar; nunca sale del dispositivo | No | Verificado en código y con Playwright |
| Analítica local opcional | Eventos tipados → `CustomEvent` del navegador (src/lib/analytics.ts) | Adaptador solo de prueba local, activo únicamente con consentimiento de analítica | Consentimiento (6.1.a) si se conectara un proveedor real | Ningún proveedor configurado (`services.ts` vacío) | No persiste | No | Verificado; conectar un proveedor exigiría nueva revisión legal |
| Calculadora de horas de estudio | Valores introducidos (React useState, en memoria) | Estimación ilustrativa | No constituye tratamiento de datos personales por Perinfor en servidor (se muestra el aviso de logs de alojamiento) | Ninguno | No persiste; no hay telemetry | No | Verificado: Planner.tsx sin almacenamiento ni red |
| Simulación de investigación + informe descargable | Datos simulados; entrada del usuario en memoria; informe generado como Blob local | Didáctica | Igual que anterior | Ninguno | El Blob solo se genera al pulsar «descargar»; nada se sube | No | Verificado: MiniReport.tsx + downloadReport (blob, revokeObjectURL) |
| Recursos embebidos | — | — | — | Todo same-origin: fuentes @fontsource, imágenes, hero mp4/webm y PDF del programa en public/ | — | No identificado | Verificado en dist; grep de `fetch(`/`localStorage` sin hallazgos externos |

Formularios y endpoints en la landing: **ninguno** (no hay `fetch`, `form action`, ni endpoints de servidor; Astro estático sin SSR).

## 2. Servicios fuera de la landing

| Servicio | Datos | Rol a aclarar | Evidencia / pregunta abierta |
|---|---|---|---|
| `https://perinfor.odoo.com/contactus` — formulario corporativo de contacto | Nombre, correo, teléfono, mensaje según el formulario | Datos tratados por Perinfor con su CRM; Odoo S.A. presta la plataforma (perinfor.odoo.com, instancia SaaS de Perinfor). El rol preciso (encargado/subencargado por propósito) debe confirmarse en el contrato/suscripción vigente de Odoo | Inspección static del enlace; no se enviaron datos de prueba reales. Pregunta: qué campos conserva la pipa de contactus y con qué base (precontrato propio vs respuesta a consulta) |
| `…/itr-principal` — web corporativa | Igual vía Odoo | Igual | Pregunta: condiciones del servicio suscrito, incluida ubicación de centros de datos y accesos de soporte fuera del EEE |
| `…/slides/acreditacion-tecnico-especialista-en-analisis-forense-en-la-web-10` — plataforma del curso | Datos de matrícula, actividad de estudio, certificados | Tratamiento por cuenta de Perinfor en su plataforma;* conservación académica y de precontratación/matrícula por criterio de Perinfor | Pregunta: periodo concreto de conservación de matrículas; comunicaciones comerciales que la plataforma pueda ofrecer (base art. 21 LSSI-CE si las hubiera) y su mecanismo de baja |

*No se extraen conclusiones de roles sin la documentación contractual.

## 3. Parámetros corporativos aprobados

- UTM fijos planteados en src/lib/links.ts (utm_source=landing_osint_abogados, utm_medium=referral, utm_campaign=osint_juridico, utm_content por posición). No se recopilan entradas del usuario, ni parámetros entrantes, ni datos personales en URLs.
- Sin peticiones al CRM ni analítica externa en la landing (docs/despliegue.md, docs/medicion-y-odoo.md).

## 4. Pendientes para el responsable (no resolubles desde el código)

1. Proveedor de alojamiento estático y su definición de registros, retención y encargado/subencargado (fuente: contrato de hosting antes de la primera publicación).
2. Condiciones de servicios suscritas con Odoo S.A. (plan, centros de datos, subencargados, garantías para transferencias si las hubiera).
3. Periodo concreto de conservación de matrículas y comprobantes del curso (fuente: obligaciones administrativas/fiscales y política interna de Perinfor).
4. Cualquier comunicación comercial que se envíe desde las plataformas corporativas y su base legal (fuente: configuración real de campañas en Odoo).
5. Confirmación del NIF B60721758 frente a la documentación fiscal (hallazgo del checksum anterior sigue abierto).
