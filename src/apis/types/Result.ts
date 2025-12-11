/**
 * 后端统一返回类型
 * @param code 状态码（0/1）
 * @param data 返回的数据主体
 * @param message 返回信息/提示
 */
export interface Result<T> {
  code: number;
  data: T;
  message: string;
}
