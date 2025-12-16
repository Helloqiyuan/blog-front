<script setup lang="ts">
import { onMounted, ref } from 'vue';
const refreshIcon = ref<HTMLDivElement | null>(null);
onMounted(() => {
  let d = 0;
  refreshIcon.value!.onclick = () => {
    d += 360;
    refreshIcon.value!.style.transform = `rotate(${d}deg)`;
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
  background-image: url('@/assets/loading.svg');
  background-size: cover;
  transition: all 0.5s;
  &:hover {
    background-image: url('@/assets/loading-hover.svg');
  }
}
</style>
