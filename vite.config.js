import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import demoApi from './server/demo-api.cjs';
export default defineConfig({
  plugins: [react(), {
    name: 'classroom-api',
    configureServer(server) { server.middlewares.use(demoApi.createDemoApi()); },
    configurePreviewServer(server) { server.middlewares.use(demoApi.createDemoApi()); },
  }],
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 5173, strictPort: true },
});
