import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // new section for testing work
  test: {
    // means that what packages are using in this contest, use jsdom to replace the vitual dom
    environment: 'jsdom',
    // default is false, so must be true otherwise it's not working.
    globals: true
    // and then add test: vitest in package.json, then do npm test
          // the output will show what file will include and exclude on the testing. (so far no file yet)
  },
  preview: {
    port: process.env.PORT || 8001
  }
})
