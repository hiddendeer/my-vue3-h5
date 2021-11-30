import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{find: '@',replacement: resolve(__dirname,'src')}]
  },
  // proxy: { // 代理配置
  //   '^/api': {
  //     target: 'https://csctest.gtcloud.cn',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   }
  //   },

})
