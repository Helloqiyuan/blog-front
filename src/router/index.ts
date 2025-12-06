import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: 'Helloqiyuan的博客',
          },
        },
        {
          path: 'article',
          name: 'article',
          component: () => import('@/views/Article/index.vue'),
          meta: {
            title: '文章',
          },
        },
        {
          path: 'articleDetail',
          name: 'articledetail',
          component: () => import('@/views/Article/ArticleDetail/index.vue'),
          props: (route) => ({ id: Number(route.query.id) }),
        },
        {
          path: 'note',
          name: 'note',
          component: () => import('@/views/Note/index.vue'),
          meta: {
            title: '随笔',
          },
          props: (route) => ({ id: Number(route.query.id) }),
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('@/views/Comment/index.vue'),
          meta: {
            title: '留言',
          },
        },
        {
          path: 'friendlink',
          name: 'friendLink',
          component: () => import('@/views/FriendLink/index.vue'),
          meta: {
            title: '友链',
          },
        },
        {
          path: 'subscribe',
          name: 'subscribe',
          component: () => import('@/views/Subscribe/index.vue'),
          meta: {
            title: '订阅',
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/About/index.vue'),
          meta: {
            title: '关于',
          },
        },
        {
          path: 'more',
          name: 'more',
          component: () => import('@/views/More/index.vue'),
          meta: {
            title: '更多',
          },
        },
      ],
    },
  ],
});
router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
