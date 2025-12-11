/**
 * 小提示类型
 * @param id 主键ID
 * @param content 关键字内容
 * @param status 是否启用
 * @param priority 优先级（数值，越大越优先）
 * @param createTime 创建时间
 * @param updateTime 更新时间
 */
export interface Tips {
  id: number;
  content: string;
  status: boolean;
  priority: number;
  createTime: Date;
  updateTime: Date;
}
