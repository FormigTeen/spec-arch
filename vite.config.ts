import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/spec-arch/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Evita falhas de import dinâmico (ex.: dagre do Mermaid) no GitHub Pages
      // ao aglutinar os imports dinâmicos no bundle principal.
      output: {
        inlineDynamicImports: true,
      },
    },
  }
});
