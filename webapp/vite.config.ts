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
        name: "PickleMaps",
        short_name: "PickleMaps",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone", // Enables full-screen mode
        start_url: "/",
        icons: [
          {
            src: "/pickleball.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pickleball.png",
            sizes: "512x512",
            type: "image/png"
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
