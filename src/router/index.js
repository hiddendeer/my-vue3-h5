import { createRouter, createWebHistory } from "vue-router"


import HelloWorld from '../components/HelloWorld.vue'
import detail from '../workOrder/detail/detail.vue'
import handleOrder from '../workOrder/handleOrder/order.vue'

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/detail', component: detail, name: 'details', meta: { title: '任务详情' } },
    { path: '/handle-order', component: handleOrder, name: 'handle-order', meta: { title: '接单' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {//如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    next()
})

export default router