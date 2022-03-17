import { createRouter, createWebHashHistory } from "vue-router"


import HelloWorld from '../components/HelloWorld.vue'
import lianxi from '../components/lianxi.vue'
import detail from '../workOrder/detail/detail.vue'
import ts from '../workOrder/typeScript/index.vue'
import handleOrder from '../workOrder/handleOrder/order.vue'
import Index from '@/views/index.vue'
import Admin from '@/views/admin.vue'
import Login from '@/views/login/index.vue'
import indexManage from '@/views/login/indexManage.vue'

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/lianxi', component: lianxi },
    { path: '/detail', component: detail, name: 'details', meta: { title: '任务详情' } },
    { path: '/handle-order', component: handleOrder, name: 'handle-order', meta: { title: '任务详情' } },
    { path: '/index', component: Index, name: 'Index', meta: { title: '首页' } },
    { path: '/admin', component: Admin, name: 'Admin', meta: { title: '管理' } },
    { path: '/login', component: Login, name: 'Login', meta: { title: '用户登录' } },
    { path: '/login_m', component: indexManage, name: 'indexManage', meta: { title: '管理员登录' } },
    { path: '/ts', component: ts, name: 'ts', meta: { title: 'ts练习' } },
];
// history: createWebHistory(),

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {//如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }

    const auth = localStorage.getItem('auth')
    const orderCode = localStorage.getItem('orderCode')

    if (!orderCode && to.path == '/index') {
        next('/login')
        return
    }

    if (to.path == '/' && auth && auth == 'tourist') {
        next('/index')
        return
    }
    if (to.path == '/' && auth && auth == 'admin') {
        next('/admin')
        return
    }

    if (to.path == '/login_m' || to.path == '/login') {
        next()
        return
    }

    if (!auth && to.path != '/login') {
        next('/login')
        return
    }

    next()
})

router.afterEach((to, from, failure) => {
})

export default router