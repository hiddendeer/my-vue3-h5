import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const { resolve } = require("path");

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/  base: './',
export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: { charset: false },
    },
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
  // 别名配置
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  // 打包文件切割等配置
  build: {
    sourcemap: true,
    outDir: 'dist',
    minify: 'terser',
    assetsDir: 'static',
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/')
            : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        }
      }
    }
  }

  // proxy: { // 代理配置
  //   '^/api': {
  //     target: 'https://csctest.gtcloud.cn',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   }
  //   },

})
