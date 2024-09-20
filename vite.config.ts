import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'topbar',
      remotes: {
        mediastore: 'http://localhost:3001/assets/remoteEntry.js',
        front_and_sidebar: 'http://localhost:3002/assets/remoteEntry.js',
      },
      exposes: {
        './TopBar': './src/components/TopBar',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    })
  ],
  server: {
    port: 3015,
  },
  preview: {
    port: 3015,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
  },
});
