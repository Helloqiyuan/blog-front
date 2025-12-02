import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/Home/index.vue'),
        },
        {
          path: 'article',
          name: 'article',
          component: () => import('@/views/Article/index.vue'),
        },
        {
          path: 'note',
          name: 'note',
          component: () => import('@/views/Note/index.vue'),
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('@/views/Comment/index.vue'),
        },
        {
          path: 'friendlink',
          name: 'friendLink',
          component: () => import('@/views/FriendLink/index.vue'),
        },
        {
          path: 'subscribe',
          name: 'subscribe',
          component: () => import('@/views/Subscribe/index.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/About/index.vue'),
        },
        {
          path: 'more',
          name: 'more',
          component: () => import('@/views/More/index.vue'),
        },
      ],
    },
  ],
});

export default router;
