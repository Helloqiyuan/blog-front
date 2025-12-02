import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 代理规则
      '/api': {
        target: 'http://localhost:8080', // 后端接口地址
        changeOrigin: true, // 是否修改请求头中的 origin
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，可选
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
