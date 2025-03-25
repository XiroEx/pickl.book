import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Ensures updates happen automatically
      manifest: {
        name: "pickl.book",
        short_name: "pickl.book",
        theme_color: "#00ff00",
        background_color: "#00ff00",
        display: "standalone", // Enables full-screen mode
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/pb.jpg",
            sizes: "192x192",
            type: "image/jpg"
          },
          {
            src: "/pb.jpg",
            sizes: "512x512",
            type: "image/jpg"
          }
        ]
      },
      devOptions: {
        enabled: true, // Enables PWA in dev mode
        type: "module"
      }
    })
  ],
})
