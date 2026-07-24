import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
// https://vitejs.dev/config/
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
<<<<<<< HEAD
  },
=======
<<<<<<< HEAD
  },
=======
    proxy: {
      // Forwards /api calls to your backend server during local development.
      // Update the target if your backend runs on a different port.
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
})
