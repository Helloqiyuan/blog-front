import http from '@/utils/request';
import type { User, UserLoginVO } from './types';
/**
 * 用户登录
 */
export const loginApi = (data: User) => {
  return http<UserLoginVO>({
    url: '/common/user/login',
    method: 'POST',
    data,
  });
};
/**
 * 用户注册
 */
export const registerApi = (data: User) => {
  return http({
    url: '/common/user/register',
    method: 'POST',
    data,
  });
};
/**
 * 申请注册的验证码
 */
export const sendRegisterEmailApi = (email: string) => {
  return http({
    url: '/common/user/sendEmailExp',
    params: { email },
  });
};
