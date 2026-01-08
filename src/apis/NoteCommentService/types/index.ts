export interface CommentNode<T> {
  e: T;
  children: CommentNode<T>[];
}
export interface NoteComment {
  id?: number;
  noteId: number;
  userId: number;
  parentCommentId: number;
  rootCommentId: number;
  content: string;
  like?: number;
  updateTime?: string;
  createTime?: string;

  username?: string;
}
