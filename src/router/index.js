import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component:()=>import('@/views/Main.vue'),
        redirect: 'home',
        children:[
        ]
    },
    {
        path: "/login",
        name: "login",
        component:()=>import('@/views/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        componrnt:()=>import('@/views/404.vue'),
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router