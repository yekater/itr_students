import {defineConfig} from '@playwright/test';

// Portabilidad: sin rutas ni sandbox propios de un entorno concreto.
// El navegador lo instala Playwright (`npx playwright install chromium`) o se
// sobrescribe con PLAYWRIGHT_EXECUTABLE_PATH si el alojamiento lo necesita.
const executablePath=process.env.PLAYWRIGHT_EXECUTABLE_PATH||undefined;
const args=executablePath?[]:['--no-sandbox'];
export default defineConfig({
  testDir:'tests',
  workers: process.env.CI?4:2,
  use:{baseURL:'http://127.0.0.1:4322',launchOptions:{executablePath,args}},
  webServer:{
    command:'npm run preview -- --port 4322',
    url:'http://127.0.0.1:4322',
    reuseExistingServer:false,
  },
  reporter:[['list'],['json',{outputFile:'docs/qa-results.json'}]],
});
