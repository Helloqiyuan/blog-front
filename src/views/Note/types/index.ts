import { SlateElement } from '@wangeditor/editor';

/* 文章类型 */
export interface Article {
  id?: number;
  title: string;
  subTitle: string;
  content: string;
  authorId?: number;
  status?: number;
  viewCount?: number;
  updateTime?: Date;
  createTime?: Date;
}
/* 富文本编辑器中的图片元素 */
type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};
