export interface User {
  id?: number;
  username?: string;
  email: string;
  password: string;
  lastLoginTime?: string;
  updateTime?: string;
  createTime?: string;
}
export interface UserLoginVO {
  id: number;
  username: string;
  token: string;
  exp: string;
}
