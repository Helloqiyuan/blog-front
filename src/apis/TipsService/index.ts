import http from '@/utils/request';
import type { Tips } from './types';
/**
 * 随机获取count随机小提示
 * @param count 小提示数量
 * @returns 小提示列表
 */
export const getRandomTips = (count: number) => {
  return http<Tips[]>({
    url: '/tips/random',
    params: {
      count,
    },
  });
};
