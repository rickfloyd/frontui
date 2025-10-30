import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: { usePolling: true },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        cssnano({
          preset: ['default', { colormin: false }],
        }),
      ],
    },
  },
  build: {
    minify: false,
    sourcemap: true,
  },
});
