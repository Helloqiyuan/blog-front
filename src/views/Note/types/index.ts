import { SlateElement } from '@wangeditor/editor';

/* 文章类型 */
export interface Article {
  id?: number;
  title: string;
  subTitle: string;
  cover: string;
  content: string;
  authorId?: number;
  status?: number;
  viewCount?: number;
  updateTime?: string;
  createTime?: string;
}
/* 富文本编辑器中的图片元素 */
type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};
