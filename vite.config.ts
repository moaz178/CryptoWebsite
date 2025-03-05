import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({

  base: '/CryptoWebsite',
  plugins: [react()],
  build: {
    outDir: 'docs', 
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
