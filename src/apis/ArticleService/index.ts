import http from '@/utils/request';
import type { Article, PageQueryVO } from '@/apis/ArticleService/types';
import type { PageQueryDTO } from '@/apis/ArticleService/types';

/**
 * 新增文章
 * @param article 文章对象
 * @returns 创建后的文章或接口响应
 */
export const uploadArticleApi = (article: Article) => {
  return http<Article>({
    url: '/article',
    method: 'post',
    data: article,
  });
};
/**
 * 更新文章
 * @param article 文章对象（包含 id）
 * @returns 更新后的文章或接口响应
 */
export const updateArticleApi = (article: Article) => {
  return http<Article>({
    url: '/article',
    method: 'put',
    data: article,
  });
};

/**
 * 根据 ID 获取文章详情
 * @param id 文章 ID
 * @returns 文章详情
 */
export const getArticleByIdApi = (id: number) => {
  return http<Article>({
    url: `/article?id=${id}`,
  });
};
/**
 * 分页查询文章列表
 * @param pageQuery 分页与筛选参数
 * @returns 包含总数和文章列表的分页对象
 */
export const getArticleListApi = (pageQuery: PageQueryDTO) => {
  return http<PageQueryVO>({
    url: '/article/page',
    params: pageQuery,
  });
};
/**
 * 根据 ID 删除文章
 * @param id 文章 ID
 * @returns 删除操作的接口响应
 */
export const deleteArticleByIdApi = (id: number) => {
  return http({
    url: `/article?id=${id}`,
    method: 'delete',
  });
};
