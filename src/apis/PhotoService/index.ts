import http from '@/utils/request';
import type { Photo } from './types';
/**
 * 获取随机图片
 * @returns 随机图片对象
 */
export const getPhotoRandom = () => {
  return http<Photo>({
    url: '/photo/random',
  });
};
