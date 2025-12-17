// src/directives/scale.ts
import type { Directive, DirectiveBinding } from 'vue';

interface SlideOptions {
  distance?: number; // 初始向下位移(px)
  duration?: number; // 动画时长(ms)
  delay?: number; // 延迟(ms)
  threshold?: number; // 视口触发比例
}

const scale: Directive = {
  mounted(el, binding: DirectiveBinding<SlideOptions>) {
    const { distance = 40, duration = 500, delay = 0, threshold = 0.15 } = binding.value || {};

    /* ---------------- 初始状态 ---------------- */
    el.style.transform = `translateY(${distance}px)`;
    el.style.opacity = '0';
    el.style.willChange = 'transform, opacity';

    /* ---------------- 回弹曲线（关键） ---------------- */
    el.style.transition = `
      transform ${duration}ms cubic-bezier(0.15, 2.2, 0.25, 1) ${delay}ms,
      opacity ${duration}ms ease-out ${delay}ms
    `;

    /* ---------------- 进入视口触发 ---------------- */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        requestAnimationFrame(() => {
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });

        // 只触发一次
        observer.unobserve(el);
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(el);
    (el as any).__scaleObserver__ = observer;
  },

  unmounted(el) {
    const observer = (el as any).__scaleObserver__;
    if (observer) {
      observer.disconnect();
      delete (el as any).__scaleObserver__;
    }
  },
};

export default scale;
