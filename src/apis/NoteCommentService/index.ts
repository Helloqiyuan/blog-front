import http from '@/utils/request';
import type { NoteComment, CommentNode } from './types';

export const getNoteCommentByNoteIdApi = (noteId: number) => {
  return http<CommentNode<NoteComment>>({
    url: '/common/noteComment',
    params: { noteId },
  });
};
/**
 * 添加评论
 */
export const addNoteCommentApi = (data: any) => {
  return http({
    url: '/user/noteComment',
    method: 'POST',
    data,
  });
};
/**
 * 根据id获取评论
 * 仅获取评论本身 不包含子评论
 */
export const getByIdApi = (id: number) => {
  return http<NoteComment>({
    url: `/common/noteComment/${id}`,
  });
};
/**
 * 删除评论
 */
export const deleteNoteCommentApi = (id: number) => {
  return http({
    url: `/user/noteComment`,
    method: 'DELETE',
    params: { id },
  });
};
