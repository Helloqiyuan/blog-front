import http from '@/utils/request';
import type { LoginDTO, LoginVO } from './types';
/**
 * 管理员登录接口
 * @param loginDTO 登录表单数据，包含账号和密码
 * @returns 登录成功返回用户信息及 token
 */
export const LoginApi = (loginDTO: LoginDTO) => {
  return http<LoginVO>({
    url: '/admin/login',
    method: 'post',
    data: loginDTO,
  });
};
