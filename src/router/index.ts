import { createRouter, createWebHistory } from 'vue-router'

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

export const router = createRouter({
    history: createWebHistory(),
    routes
})

//全球前卫
router.beforeEach((to, from,next) => {
    next()
})