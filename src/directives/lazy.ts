import type { Directive, DirectiveBinding } from 'vue';
/**
 * 图片懒加载
 * 当组件在视口中出现了至少10%时加载src
 */
const lazy: Directive = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0]?.isIntersecting) {
          el.src = binding.value;
          el.style.opacity = '1';
          observer.unobserve(el);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );
    // 开始监听
    observer.observe(el);
  },
};
export default lazy;
