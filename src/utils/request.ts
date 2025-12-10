import axios from 'axios';
import NProgress from './nprogress';
import { ref } from 'vue';
import { gracefulNProgressDone } from './utils';
import useAdminStore from '@/stores/admin';
import router from '@/router';
import { ElMessage } from 'element-plus';
const http = axios.create({
  baseURL: '/api',
  timeout: 60000,
});
const requestCount = ref<number>(0);
const adminStore = useAdminStore();
http.interceptors.request.use(
  (config) => {
    const token = adminStore.getAdminInfo()?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (requestCount.value === 0) {
      NProgress.start();
    }
    requestCount.value++;
    return config;
  },
  (err) => {
    requestCount.value--;
    gracefulNProgressDone(requestCount);
    console.log(err);
  },
);

http.interceptors.response.use(
  (response) => {
    requestCount.value--;
    gracefulNProgressDone(requestCount);
    return response.data;
  },
  function (error) {
    console.warn('http.interceptors.response:' + error);
    if (error.status === 401) {
      ElMessage.warning('登录已过期，请重新登录');
      router.replace({ path: '/login' });
    }
    requestCount.value--;
    gracefulNProgressDone(requestCount);
    return Promise.reject(error);
  },
);
export default http;
