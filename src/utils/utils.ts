import NProgress from 'nprogress';
import type { Ref } from 'vue';
import router from '@/router';

export const gracefulNProgressDone = (requestCount: Ref<number>) => {
  setTimeout(() => {
    if (requestCount.value === 0) {
      NProgress.done();
    }
  }, 0);
};

export const goTo = (path: string) => {
  router.push(path);
};
