// Sistema de consentimiento independiente de React (contrato del encargo).
// Sirve a la vez para la landing y las páginas legales; conserva el rechazo y caduca.

export type ConsentCategory = 'analytics' | 'marketing' | 'externalMedia';

export type ConsentRecord = {
  schemaVersion: number;
  purposesVersion: string;
  updatedAt: string;
  expiresAt: string;
  categories: Record<ConsentCategory, boolean>;
};

export const PURPOSES_VERSION = '2026-10-25';
export const SCHEMA_VERSION = 1;
export const MAX_AGE_MONTHS = 12;
export const STORAGE_KEY = 'itr-consent-v1';

const CATEGORIES: ConsentCategory[] = ['analytics', 'marketing', 'externalMedia'];

function denial(): ConsentRecord {
  const now = new Date();
  const expires = new Date(now);
  expires.setMonth(expires.getMonth() + MAX_AGE_MONTHS);
  return {schemaVersion: SCHEMA_VERSION, purposesVersion: PURPOSES_VERSION, updatedAt: now.toISOString(), expiresAt: expires.toISOString(), categories: {analytics: false, marketing: false, externalMedia: false}};
}

const listeners = new Set<() => void>();
let memoryRecord: ConsentRecord | null = null;

function validate(value: unknown): ConsentRecord | null {
  try {
    const record = value as ConsentRecord;
    if (!record || record.schemaVersion !== SCHEMA_VERSION || record.purposesVersion !== PURPOSES_VERSION) return null;
    if (typeof record.expiresAt !== 'string' || new Date(record.expiresAt).getTime() < Date.now()) return null;
    if (!CATEGORIES.every(category => typeof record.categories?.[category] === 'boolean')) return null;
    return record;
  } catch { return null; }
}

function readStored(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return validate(JSON.parse(raw));
  } catch { return null; }
}

function persist(record: ConsentRecord | null): void {
  try {
    if (record) localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* sin almacenamiento: estado en memoria */ }
}

function current(): ConsentRecord {
  return memoryRecord ?? (memoryRecord = readStored()) ?? (memoryRecord = denial());
}

function notify(): void {
  listeners.forEach(listener => listener());
}

export function get(): ConsentRecord | null {
  return readStored();
}

export function allows(category: ConsentCategory): boolean {
  return current().categories[category] === true;
}

export function save(categories: Partial<Record<ConsentCategory, boolean>>): void {
  const record = denial();
  CATEGORIES.forEach(category => { record.categories[category] = categories[category] === true; });
  memoryRecord = record;
  persist(record);
  notify();
}

export function rejectOptional(): void {
  save({});
}

export function openPreferences(): void {
  document.querySelector<HTMLDialogElement>('dialog.cookie-dialog')?.showModal();
  document.querySelector<HTMLElement>('dialog.cookie-dialog input[name="analytics"]')?.focus();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function listenStorage(): void {
  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY) return;
    memoryRecord = event.newValue ? validate(JSON.parse(event.newValue)) : null;
    notify();
  });
}
