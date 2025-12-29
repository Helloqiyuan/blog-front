import http from '@/utils/request';
import type { NoteComment, CommentNode } from './types';

export const getNoteCommentByNoteIdApi = (noteId: number) => {
  return http<CommentNode<NoteComment>>({
    url: '/user/noteComment',
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
