/**
 * 管理员登录提交表单
 * @param account 账号
 * @param password 密码
 */
export interface LoginDTO {
  account: string;
  password: string;
}
/**
 * 管理员登录返回数据
 * @param id 管理员ID
 * @param nickname 昵称
 * @param token 令牌
 * @param exp 过期时间
 */
export interface LoginVO {
  id: number;
  nickname: string;
  token: string;
  exp: string;
}
