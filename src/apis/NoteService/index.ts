import http from '@/utils/request';
import type { Note } from './types';
/**
 * 获取所有随笔
 * @returns 随笔列表
 */
export const getNoteListApi = () => {
  return http<Note[]>({
    url: '/note/all',
  });
};
