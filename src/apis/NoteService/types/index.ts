export interface Note {
  id?: number;
  typeId: number;
  content: string;
  updateTime?: string;
  createTime?: string;

  typeName?: string;
}
export interface NoteType {
  id?: number;
  name: string;
  createTime?: string;
}
export interface PageQueryDTO {
  page: number;
  pageSize: number;
  content: string;
  typeId: number;
}
export interface PageQueryVO {
  total: number;
  rows: Note[];
}
