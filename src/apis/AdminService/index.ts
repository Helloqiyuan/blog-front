import http from '@/utils/request';
import type { LoginDTO, LoginVO } from './types';
import type { Result } from '@/types/Result';
export const LoginApi = (loginDTO: LoginDTO): Promise<Result<LoginVO>> => {
  return http({
    url: '/admin/login',
    method: 'post',
    data: loginDTO,
  });
};
