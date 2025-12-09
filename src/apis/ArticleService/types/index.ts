export interface PageQuery {
  page: number;
  pageSize: number;
  searchContent: string;
}
/* 文章类型 */
export interface Article {
  id?: number;
  title: string;
  subTitle: string;
  cover: string;
  content: string;
  authorId?: number;
  status?: number;
  viewCount?: number;
  updateTime?: string;
  createTime?: string;
}
export interface PageQueryVO {
  total: number;
  rows: Article[];
}
