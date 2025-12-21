import { createRouter, createWebHistory } from 'vue-router';
import useAdminStore from '@/stores/admin.ts';
import { ElMessage } from 'element-plus';
import dayjs from '@/utils/dayjs';
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
          path: 'article/detail',
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
          path: 'about',
          name: 'about',
          component: () => import('@/views/About/index.vue'),
          meta: {
            title: '关于',
          },
        },
        {
          path: 'waterfall',
          name: 'waterfall',
          component: () => import('@/views/Waterfall/index.vue'),
          meta: {
            title: '瀑布',
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'logn',
      component: () => import('@/views/Manager/Login/index.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Manager/Dashboard/index.vue'),
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('@/views/Manager/Home/index.vue'),
          meta: {
            title: '管理后台',
          },
        },
        {
          path: 'article',
          name: 'dashboard-article',
          component: () => import('@/views/Manager/Article/index.vue'),
          meta: {
            title: '文章管理',
          },
        },
        {
          path: 'article/edit',
          name: 'dashboard-article-edit',
          component: () => import('@/views/Manager/Article/components/EditArticle.vue'),
          meta: {
            title: '处理文章',
          },
          props: (route) => ({ id: Number(route.query.id) }),
        },
        {
          path: 'note',
          name: 'dashboard-note',
          component: () => import('@/views/Manager/Note/index.vue'),
          meta: {
            title: '随笔管理',
          },
        },
        {
          path: 'comment',
          name: 'dashboard-comment',
          component: () => import('@/views/Manager/Comment/index.vue'),
          meta: {
            title: '留言管理',
          },
        },
        {
          path: 'friendlink',
          name: 'dashboard-friendlink',
          component: () => import('@/views/Manager/FriendLink/index.vue'),
          meta: {
            title: '友链管理',
          },
        },
        {
          path: 'log',
          name: 'dashboard-log',
          component: () => import('@/views/Manager/Log/index.vue'),
          meta: {
            title: '日志管理',
          },
        },
      ],
    },
  ],
});
router.beforeEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }

  const adminStore = useAdminStore();
  const adminInfo = adminStore.getAdminInfo();

  if (!to.fullPath.startsWith('/dashboard')) {
    return true;
  }
  if (!adminInfo || !adminInfo.token) {
    ElMessage.warning('请先重新登录');
    return '/login';
  }
  if (Number(adminInfo.exp) < dayjs().valueOf()) {
    ElMessage.warning('登录过期，请重新登录');
    return '/login';
  }
  return true;
});

export default router;
