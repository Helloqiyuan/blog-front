import type { Result } from '@/types/Result';
import http from '@/utils/request';
import type { Article } from '@/views/Note/types';
import type { PageQuery } from '@/views/Article/types';

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

export const getArticleByIdApi = (id: number) => {
  return http({
    url: `/article?id=${id}`,
  });
};
export const getArticleListApi = (pageQuery: PageQuery) => {
  return http({
    url: '/article/page',
    params: pageQuery,
  });
};
