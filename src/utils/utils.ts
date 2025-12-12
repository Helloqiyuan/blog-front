import NProgress from 'nprogress';
import type { Ref } from 'vue';
import router from '@/router';
import dayjs from '@/utils/dayjs';
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
/**
 * 距离当前的时间
 * @param date
 * @returns
 */
export const DistantFromNowAndDate = (date: Date | string) => {
  /*   if (!date) return '';
  const last = new Date(date);
  const now = new Date();
  if (last > now) {
    return '在未来';
  }
  if (now.getFullYear() - last.getFullYear() > 0) {
    return now.getFullYear() - last.getFullYear() + '年前';
  } else if (now.getMonth() - last.getMonth() > 0) {
    return now.getMonth() - last.getMonth() + '月前';
  } else if (now.getDate() - last.getDate() > 0) {
    return now.getDate() - last.getDate() + '天前';
  } else if (now.getHours() - last.getHours() > 0) {
    return now.getHours() - last.getHours() + '小时前';
  } else if (now.getMinutes() - last.getMinutes() > 0) {
    return now.getMinutes() - last.getMinutes() + '分钟前';
  } else {
    return '刚刚';
  } */
  //  使用 dayjs 处理时间格式化
  return dayjs(date).fromNow();
};

/**
 * 返回一个[min,min+1,...,max]的数组
 * @param min
 * @param max
 */
export const range = (min: number, max: number): Array<number> => {
  if (max < min) {
    [min, max] = [max, min];
  }
  const res: Array<number> = [];
  for (let i = min; i <= max; i++) {
    res.push(i);
  }
  return res;
};
