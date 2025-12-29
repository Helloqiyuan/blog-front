import type { Directive, DirectiveBinding } from 'vue';
/**
 * transition
 * 图片加载时隐藏小图片的图标
 * 当组件的src变化时，显示图片opacity = '1'
 * 用于src不存在到存在的过渡效果
 */
const trans: Directive = {
  // 创建时让img隐藏
  created(el: HTMLImageElement) {
    // console.log('img create', el);

    el.style.opacity = '0';
    el.style.transition = 'opacity 1s';
  },
  // 更新时让img显示
  updated(el: HTMLImageElement, binding: DirectiveBinding) {
    // console.log('img update', el);
    if (!binding.value) {
      return;
    }
    el.src = binding.value;
    el.style.opacity = '1';
  },
};
export default trans;
