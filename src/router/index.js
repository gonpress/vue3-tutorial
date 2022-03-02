import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/index.vue';
import Products from '@/pages/products/index.vue';
import Orders from '@/pages/orders/index.vue';
import Login from '@/pages/user/login.vue';
import Register from '@/pages/user/register.vue';
import Product from '@/pages/products/_id.vue';
import ProductCreate from '@/pages/products/create.vue';
import ProductEdit from '@/pages/products/edit.vue';


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
        },
        {
            path: '/products/create',
            name: 'ProductCreate',
            component: ProductCreate,
        },
        {
            path: '/products/edit/:id',
            name: 'ProductEdit',
            component: ProductEdit,
        },
        {
            path: '/orders',
            name: 'Orders',
            component: Orders
        }
    ]
})

export default router;