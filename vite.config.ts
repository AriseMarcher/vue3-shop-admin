import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src') // 绝对路径
    }
  }
})
