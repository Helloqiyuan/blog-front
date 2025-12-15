import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import '@/styles/over-write-default-color.css';
import '@/styles/common.scss';
import '@/styles/loading-mask.scss';

import lazy from '@/directives/lazy';
import trans from '@/directives/trans';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.directive('lazy', lazy);
app.directive('trans', trans);

app.use(ElementPlus, {
  locale: zhCn,
});

app.mount('#app');
