import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 root: '',
 build: {
  outDir: 'dist',
  
 },
 plugins: [tailwindcss(),],
},
)