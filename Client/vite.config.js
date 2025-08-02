// import react from '@vitejs/plugin-react-swc';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     allowedHosts: ['ngrok-free.app'], // 🛡️ Allow any *.ngrok-free.app subdomain
//   },
// });

// import react from '@vitejs/plugin-react-swc';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // 🌐 Accept connections from any network
//     origin: 'https://ddc9e5e941ea.ngrok-free.app', // 🛂 Explicit origin for CORS
//     allowedHosts: ['ddc9e5e941ea.ngrok-free.app'], // ✅ Match the full ngrok host
//     cors: true, // ✅ Ensure frontend doesn’t block CORS
//   },
// });

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      '8bf66de24435.ngrok-free.app'  // 👈 Add your full Ngrok domain here
    ],
  },
});
