export interface Note {
  id?: number;
  typeId: number;
  content: string;
  updateTime?: string;
  createTime?: string;

  typeName?: string;
}
