import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_USER_SERVICE_URL': JSON.stringify(process.env.VITE_USER_SERVICE_URL)
  },
  server: {
    proxy: {
      // Example proxying if you want to avoid CORS issues in development
      '/api': 'http://localhost:3001', // Adjust according to your backend API
    }
  },
});
