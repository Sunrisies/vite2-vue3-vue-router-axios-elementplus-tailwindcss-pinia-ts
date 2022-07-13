import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


//对别名进行配置
import { resolve } from 'path';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server:{
    open:true,//在开发服务器启动时自动在浏览器中打开应用程序。
  },
  resolve:{
    // 对别名进行配置
    alias:[
      {
        find: '@',
        replacement: pathResolve('src')
      }
    ]
  }
})

