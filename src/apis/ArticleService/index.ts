import type { Result } from '@/types/Result';
import http from '@/utils/request';
import type { Article, PageQueryVO } from '@/apis/ArticleService/types';
import type { PageQuery } from '@/apis/ArticleService/types';

export const uploadArticleApi = (article: Article): Promise<Result<string>> => {
  return http({
    url: '/article',
    method: 'post',
    data: article,
  });
};
export const updateArticleApi = (article: Article): Promise<Result<string>> => {
  return http({
    url: '/article',
    method: 'put',
    data: article,
  });
};

export const getArticleByIdApi = (id: string) => {
  return http({
    url: `/article?id=${id}`,
  });
};
export const getArticleListApi = (pageQuery: PageQuery): Promise<Result<PageQueryVO>> => {
  return http({
    url: '/article/page',
    params: pageQuery,
  });
};
export const deleteArticleByIdApi = (id: number): Promise<Result<string>> => {
  return http({
    url: `/article?id=${id}`,
    method: 'delete',
  });
};
