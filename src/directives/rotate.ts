import type { Directive, DirectiveBinding } from 'vue';

const rotate: Directive = {
  mounted(el, binding) {
    el.style.transition = 'transform 0.3s ease';
  },
  updated(el, binding) {
    el.style.transform = binding.value ? 'rotate(180deg)' : 'rotate(0deg)';
  },
};

export default rotate;
