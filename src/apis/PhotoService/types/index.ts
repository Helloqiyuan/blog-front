export enum PhotoType {
  /** 风景图 */
  SCENERY = 1,
  /** 人文图 */
  HUMANITIES = 2,
}
/**
 * 图片类型
 * @param id 图片ID
 * @param url 图片地址
 * @param type 图片类型（自定义数值）
 * @param createTime 创建时间
 */
export interface Photo {
  id: number;
  url: string;
  type: PhotoType;
  createTime: Date;
}
