import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Ensure the correct base path with a trailing slash
  base: '/CryptoWebsite/',
  plugins: [react()],
  build: {
    outDir: 'docs', // If you are using GitHub Pages with "docs" folder
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
