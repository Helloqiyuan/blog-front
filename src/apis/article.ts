import type { Result } from '@/types/Result';
import http from '@/utils/request';
import type { Article } from '@/views/Note/types';

export const uploadArticleApi = (article: Article): Promise<Result<string>> => {
  return http({
    url: '/article',
    method: 'post',
    data: article,
  });
};

export const getArticleByIdApi = (id: number) => {
  return http({
    url: `/article?id=${id}`,
  });
};
export const getArticleListApi = (page: number, pageSize: number) => {
  return http({
    url: '/article/page',
    params: {
      page,
      pageSize,
    },
  });
};
