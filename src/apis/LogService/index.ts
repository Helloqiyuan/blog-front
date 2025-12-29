import http from '@/utils/request';
import type { PageQueryDTO, PageQueryVO } from './types';
export const logPageQueryApi = (pageQueryDTO: PageQueryDTO) => {
  return http<PageQueryVO>({
    url: '/manager/log/page',
    params: pageQueryDTO,
  });
};
