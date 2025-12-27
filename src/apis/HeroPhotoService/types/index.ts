/**
 * 图片类型
 * @param id 图片ID
 * @param url 图片地址
 * @param typeId 图片类型（自定义数值）
 * @param createTime 创建时间
 */
export interface Photo {
  id?: number;
  url: string;
  typeId: PhotoType;
  updateTime?: string;
  createTime?: string;
}
/**
 * 图片类型
 * @param id 图片类型ID
 * @param name 图片类型名称
 */
export interface PhotoType {
  id?: number;
  name: string;
}
