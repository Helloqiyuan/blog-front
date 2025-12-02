import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ref } from 'vue';
import { gracefulNProgressDone } from './utils';

NProgress.configure({
  showSpinner: false,
});

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
});
const requestCount = ref<number>(0);
http.interceptors.request.use(
  (config) => {
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
    console.log('出错了');
    requestCount.value--;
    gracefulNProgressDone(requestCount);
    return Promise.reject(error);
  },
);
export default http;
