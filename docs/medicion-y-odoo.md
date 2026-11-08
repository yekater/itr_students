# Medición y derivación a Odoo

Los enlaces usan URL y URLSearchParams con host/path fijos. Modelo inicial: atribución propia por CTA, sin importar parámetros entrantes. Campaña osint_juridico, origen landing_osint_abogados, medio referral; utm_content distingue posiciones. Se rechaza implícitamente toda entrada: redirect, next, emails y parámetros de usuario no se copian ni se persisten.

El adaptador tipado permanece sin configurar; no hay cargas externas, cookies, almacenamiento o identificadores de marketing. configureAnalytics exige consentimiento explícito. Antes de activar un proveedor se requiere una interfaz real con aceptar, rechazar, configurar y retirada, así como política legal verificada. No se incluye un banner sin efecto. No cargar simultáneamente GTM y GA4. Parámetros limitados por tipos; no enviar datos personales ni URL libre.

Eventos disponibles: cta_info_click, course_platform_click, demo_start y demo_complete (deduplicados por montaje), program_open, faq_open. Un clic es intención, no lead ni matrícula. generate_lead no se emite localmente.

Integración futura: llegada atribuida → formulario real del receptor → confirmación de contacto/oportunidad → regla Odoo validada que aplica «OSINT · Abogados» → estado real del lead. Una UTM no crea por sí sola crm.tag ni garantiza crm.lead. No se ha verificado versión, plan, API, permisos o campos. Medición entre dominios requiere permisos/configuración en ambos dominios; las UTM no la verifican. Credenciales solo en servidor, nunca en navegador. Cualquier comunicación requiere autorización independiente.
