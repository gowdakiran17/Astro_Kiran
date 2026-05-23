import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { enterDevPlugin, enterProdPlugin } from 'vite-plugin-enter-dev';

export default defineConfig({
  root: 'src/client',
  plugins: [...enterProdPlugin(), ...enterDevPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true
  }
});
