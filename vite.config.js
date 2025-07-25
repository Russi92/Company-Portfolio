// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://theway4business.27lashabab.com',
        changeOrigin: true,
        // احذف rewrite أو خليه يسيب /api زي ما هو
        // إما كده:
        // rewrite: path => path,
        // أو امسحه خالص:
      }
    }
  }
})


