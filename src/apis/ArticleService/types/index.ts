/**
 * 分页查询参数
 * @param page 当前页码
 * @param pageSize 每页数量
 * @param searchContent 搜索关键字
 */
export interface PageQuery {
  page: number;
  pageSize: number;
  searchContent: string;
}
/**
 * 文章类型
 * @param id 文章ID（可选）
 * @param title 标题
 * @param subTitle 副标题
 * @param cover 封面地址
 * @param content 内容（HTML/Markdown）
 * @param authorId 作者ID（可选）
 * @param status 状态（例如：发布/草稿，数值）
 * @param viewCount 阅读量（可选）
 * @param updateTime 更新时间（可选）
 * @param createTime 创建时间（可选）
 */
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
/**
 * 分页查询返回值
 * @param total 总记录数
 * @param rows 文章列表
 */
export interface PageQueryVO {
  total: number;
  rows: Article[];
}
