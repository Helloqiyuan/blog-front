<script setup lang="ts">
import { onMounted, ref } from 'vue';
const refreshIcon = ref<HTMLDivElement | null>(null);
onMounted(() => {
  let d = 180;
  refreshIcon.value!.onclick = () => {
    refreshIcon.value!.style.transform = `rotate(${d}deg)`;
    d += 180;
  };
});
</script>

<template>
  <div ref="refreshIcon" class="refresh-icon"></div>
</template>

<style scoped lang="scss">
.refresh-icon {
  font-size: 18px;
  color: #666;
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-image: url('../../../src/assets/loading.svg');
  background-size: cover;
  transition: all 0.3s;

  &:hover {
    color: #409eff;
    // transform: scale(1.5);
  }
}
</style>
