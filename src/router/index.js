import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/index.vue';
import Products from '@/pages/products/index.vue';
import Orders from '@/pages/orders/index.vue';
import Login from '@/pages/user/login.vue';
import Register from '@/pages/user/register.vue';
import Product from '@/pages/products/_id.vue';
import ProductCreate from '@/pages/products/create.vue';
import ProductEdit from '@/pages/products/edit.vue';
import Logout from "@/pages/user/logout";
import axios from 'axios';
import store from '@/store/index.js'

const requireAuth = () => (from, to, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (isAuthenticated) return next()

    next('/login')
}

const enhanceAccessToeken = () => {
    const {accessToken, email, name} = localStorage
    if (!accessToken) return
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    store.state.user.email = email;
    store.state.user.name = name;

    console.log(store);
}
enhanceAccessToeken()

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name:'Login',
            component: Login
        },
        {
            path: '/logout',
            name:'Logout',
            component: Logout
        },
        {
            path: '/register',
            name:'Register',
            component: Register
        },
        {
            path: '/products',
            name: 'Products',
            component: Products
        },
        {
            path: '/products/:id',
            name: 'Product',
            component: Product,
            beforeEnter: requireAuth(),
        },
        {
            path: '/products/create',
            name: 'ProductCreate',
            component: ProductCreate,
            beforeEnter: requireAuth(),
        },
        {
            path: '/products/edit/:id',
            name: 'ProductEdit',
            component: ProductEdit,
            beforeEnter: requireAuth(),
        },
        {
            path: '/orders',
            name: 'Orders',
            component: Orders,
            beforeEnter: requireAuth(),
        }
    ]
})

export default router;