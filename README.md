# 1.使用vite

```
 yarn create vite
```

![image-20220708105046894](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b563bad7e7e419aa9cfff720d32c09d~tplv-k3u1fbpfcp-zoom-1.image)

# 2.安装路由

```
yarn add vue-router@4
```

`对vite进行配置别名`

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
​
//对别名进行配置
import { resolve } from 'path';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
​
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
​
```

`添加router/index.ts`

```
import { createRouter, createWebHistory } from 'vue-router'
​
const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/index.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/About/index.vue')
  }
]
​
export const router = createRouter({
  history: createWebHistory(),
  routes
})
​
//全球前卫
router.beforeEach((to, from,next) => {
  next()
})
```

`main.ts`

```
import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
​
const app = createApp(App)
app.use(router)
app.mount('#app')
```

`修改App.vue`

```
<template>
  <router-view></router-view>
</template> 
```

# 3.安装Axios

```
yarn add axios
```

`添加utils/request.ts`

```
//1.引入axios包
import axios from 'axios'
//2.axios创建对象
const service = axios.create({
  baseURL:'https://api.shop.eduwork.cn/',//管理后台要使用的接口的基地址
  timeout:30000,
})
​
//3.请求拦截器,请求发送出去之前触发的
service.interceptors.request.use(config => {
  //接口请求的配置信息
  return config
},err => {
  //错误信息
  return Promise.reject(err)
})
​
//4.响应拦截器
service.interceptors.response.use(res => {
  //响应回来的数据操作
  return res.data
},err => {
  //报错的是时候抛出一个报错的信息
  return Promise.reject(err)
})
​
//5.抛出对象的信息
export default service
```

`添加api/index.ts`

```
import service from "../utils/request";
​
//首页数据
export const getIndex = () => {
  return service.get('/api/index')
}
```

`views/index.vue`没有产生跨域，所以没有配置

```
<template>
  <div>首页</div>
</template>
​
<script lang="ts"  setup>
import { getIndex } from "@/api/index";
getIndex().then((res: Object) => {
  console.log(res);
});
</script>
```

产生跨越情况

`vie.config.ts`

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
​
//对别名进行配置
import { resolve } from 'path';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
​
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server:{
    open:true,//在开发服务器启动时自动在浏览器中打开应用程序。
    port:8888,//指定开发服务器端口
    proxy:{
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',//请求的地址
        changeOrigin: true,//将主机头的来源更改为目标 URL
        rewrite: (path) => path.replace(/^/api/, '')//用空字符替换掉api
      },
    }
  },
  resolve:{
    // 对别名进行配置
    alias:[
      { 
        find: '@', 
        replacement: pathResolve('src')
      }
    ]
  },
​
})
```

# 4.安装ui库

```
yarn add element-plus
```

`进行按需引入`

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

`对·vite进行配置`

```
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
​
plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
```

# 5.安装css库

`安装less`

```
yarn add less less-loader -D
```

`添加styles/index.less`

`安装Tailwind CSS`

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`

```
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`添加styles/tailwind.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`main.ts`

```
import './styles/tailwind.css'
import './styles/index.less'
```

# 5.安装pinia状态管理

```
yarn add pinia
```

`main.ts`

![image-20220708113158028](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f73d259e923843039f8a150fc5b7971a~tplv-k3u1fbpfcp-zoom-1.image)

`store/user.ts`

```
import { defineStore } from 'pinia'
​
export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 2 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

`使用方式`

```
<template>
  <div class="w-20 h-20 border border-red-500">
    首页
    <div>{{ counter.count }}</div>
  </div>
</template>
​
<script lang="ts"  setup>
import { getIndex } from "@/api/index";
import { useCounterStore } from "@/store/user";
​
const counter = useCounterStore();
// with autocompletion ✨
counter.$patch({ count: counter.count + 1 })
// or using an action instead
counter.increment()
  
getIndex().then((res: Object) => {
  console.log(res);
});
</script>
```
