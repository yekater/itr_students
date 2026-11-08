type ServiceDefinition={
  id:string;
  name:string;
  category:'analytics'|'marketing'|'externalMedia';
  purpose:string;
  duration:string;
  optional:boolean;
  active:boolean;
};

// Registro central de servicios opcionales (contrato del encargo, apagado por defecto).
// Al conectar un proveedor real se añade aquí con `active: true`; el mecanismo de
// consentimiento evita su arranque hasta disponer de la elección del usuario.
export const services: readonly ServiceDefinition[]=[
  // Ningún servicio opcional configurado en esta landing: sin GA4, GTM, píxeles,
  // reproductores externos ni gadgets de terceros. Ver docs/privacidad-y-cookies.md.
] as const;
