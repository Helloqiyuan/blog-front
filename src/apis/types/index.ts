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
/**
 * 分页结果
 * @param total 总数
 * @param rows 分页数据
 */
export interface PageResult<T> {
  total: number;
  rows: T[];
}
