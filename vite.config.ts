import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    port: 5000,
    // Proxy API requests to the backend during local development so the
    // frontend can run on :5000 (for OAuth/login) while APIs are served
    // by the backend on :4000.
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    // Ensure proper cache-busting for Azure Front Door
    rollupOptions: {
      output: {
        // Generate unique filenames with hash for cache-busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Keep images in their own folder with hash
          if (assetInfo.name?.match(/\.(png|jpe?g|svg|gif|webp|ico)$/i)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // CSS and other assets with hash
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Ensure proper source maps for debugging
    sourcemap: true,
    // Optimize for Azure Front Door (support top-level await)
    target: 'es2022',
    minify: 'esbuild',
  },
});
