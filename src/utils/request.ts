import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import NProgress from './nprogress';
import { ref } from 'vue';
import { gracefulNProgressDone } from './utils';
import type { Result } from '@/apis/types';
import useAdminStore from '@/stores/admin';
import useUserStore from '@/stores/user';
import router from '@/router';
import { ElMessage } from 'element-plus';
const Instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 60000,
});
const requestCount = ref<number>(0);
const adminStore = useAdminStore();
const userStore = useUserStore();
Instance.interceptors.request.use(
  (config) => {
    console.log('请求地址:', config.url);
    let token;
    if (config.url?.startsWith('/admin')) {
      token = adminStore.getAdminInfo()?.token;
    } else {
      token = userStore.getUserInfo()?.token;
    }
    console.log('config' + config.url);

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

Instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('请求结果:', response.data);
    requestCount.value--;
    gracefulNProgressDone(requestCount);
    return response.data;
  },
  function (error) {
    console.log('请求结果:', error);
    if (error.status === 401) {
      ElMessage.warning('登录已过期，请重新登录');
      // router.replace({ path: '/login' });
    } else if (error.status === 500) {
      ElMessage.error('服务器异常，请联系管理员');
    }
    requestCount.value--;
    gracefulNProgressDone(requestCount);
    return Promise.reject(error);
  },
);
const http = <T>(config: AxiosRequestConfig): Promise<Result<T>> => {
  return Instance(config) as Promise<Result<T>>;
};
export default http;
