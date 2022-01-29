import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require("path");

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/  base: './',
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      },
      sass: {
        charset: false
      }
    }
  },
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: 'src/assets/quasar-variables.scss'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },

  // proxy: { // 代理配置
  //   '^/api': {
  //     target: 'https://csctest.gtcloud.cn',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   }
  //   },

})
