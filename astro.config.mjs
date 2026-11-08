import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
const site = process.env.PUBLIC_SITE_URL || 'https://preview.itr.invalid';
const url = new URL(site);
if (process.env.PUBLIC_DEPLOY_ENV === 'production' && (url.protocol !== 'https:' || /localhost|\.invalid$|\.example$|127\.0\.0\.1/.test(url.hostname))) throw new Error('Configura PUBLIC_SITE_URL con el dominio HTTPS definitivo');
export default defineConfig({site, integrations:[react()], vite:{plugins:[tailwindcss()]}});
