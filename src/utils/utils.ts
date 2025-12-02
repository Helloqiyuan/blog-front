import NProgress from 'nprogress';
import type { Ref } from 'vue';

export const gracefulNProgressDone = (requestCount: Ref<number>) => {
  setTimeout(() => {
    if (requestCount.value === 0) {
      NProgress.done();
    }
  }, 0);
};
