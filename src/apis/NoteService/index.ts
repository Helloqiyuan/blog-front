import http from '@/utils/request';
import type { Note, NoteType, PageQueryDTO, PageQueryVO } from './types';
/**
 * 分页查询随笔
 * @returns 随笔列表
 */
export const notePageQueryApi = (pageQueryDTO: PageQueryDTO) => {
  return http<PageQueryVO>({
    url: '/note/page',
    params: pageQueryDTO,
  });
};
/**
 * 获取所有随笔
 * @returns 全部随笔列表
 */
export const getAllNoteListApi = () => {
  return http<Note[]>({
    url: '/note/all',
  });
};
/**
 * 获取所有随笔类型
 */
export const getNoteTypeListApi = () => {
  return http<NoteType[]>({
    url: '/notetype/all',
  });
};
/**
 * 根据 ID 获取单条随笔
 */
export const getNoteByIdApi = (id: number) => {
  return http<Note>({
    url: '/note',
    params: { id },
  });
};
/**
 * 新增随笔
 */
export const addNoteApi = (note: Note) => {
  return http<Note>({
    url: '/note',
    method: 'POST',
    data: note,
  });
};
/**
 * 编辑随笔
 */
export const editNoteApi = (note: Note) => {
  return http<Note>({
    url: '/note',
    method: 'PUT',
    data: note,
  });
};
/**
 * 删除随笔
 */
export const deleteNoteApi = (id: number) => {
  return http<Note>({
    url: '/note',
    method: 'DELETE',
    params: { id },
  });
};
