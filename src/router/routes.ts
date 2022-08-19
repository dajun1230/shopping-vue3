import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login/index.vue';
import Home from '@/views/index.vue';
import GoodManage from '@/views/good/index.vue';
import OrderManage from '@/views/order/index.vue';
import UserManage from '@/views/user/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      redirect: "/userList",
      component: Home,
      children: [
        {
          path: '/goodList',
          name: 'good',
          component: GoodManage
        },
        {
          path: '/orderList',
          name: 'order',
          component: OrderManage
        },
        {
          path: '/userList',
          name: 'user',
          component: UserManage
        }
      ]
    },
  ]
});

export default router;
