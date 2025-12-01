/* 热搜类型 */
export interface Tips {
  id: number;
  content: string;
  status: boolean;
  priority: number;
  createTime: Date;
  updateTime: Date;
}

/* 图片类型 */
export interface Photo {
  id: number;
  url: string;
  type: number;
  createTime: Date;
}
