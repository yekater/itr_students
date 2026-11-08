// Separación entre marca y titular jurídico (contrato del encargo, apartado 14.2).
// Los datos del prestador solo se rellenan con hechos confirmados por el cliente:
// vacíos en desarrollo, señalados en docs/datos-pendientes.md antes de publicar en producción.
export const brand = {
  name: 'iTR+',
  product: 'Curso de investigación digital para estudiantes',
  courseProduct: 'Acreditación Técnico Especialista en Análisis Forense en la Web',
} as const;

function env(name: string): string {
  const value = import.meta.env[name] as string | undefined;
  return typeof value === 'string' && value.trim() ? value : '';
}

export const owner = {
  identity: env('PUBLIC_OWNER') || 'Jose Manuel Rodriguez Sanchez',
  nif: env('PUBLIC_NIF') || '52397964P',
  address: env('PUBLIC_ADDRESS') || 'Calle Ferreria, 28bis, local, 08014, Barcelona, España',
  email: env('PUBLIC_EMAIL') || 'info@perinfor.com',
  phoneDisplay: '+34 619 22 31 58',
  phoneHref: 'tel:+34619223158',
  website: 'abogados.itrplus.com',
  registrationData: env('PUBLIC_REGISTRATION') || 'No inscrita en el Registro Mercantil de Barcelona',
} as const;

export const ownerComplete = Boolean(owner.identity && owner.nif && owner.address && owner.email);
