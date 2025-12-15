<script setup lang="ts">
import Banner from '@/components/Banner.vue';
</script>

<template>
  <div class="note-content">
    <Banner>
      <template #title>随笔一记</template>
      <template #subtitle>放假买个地球仪吧，世界那么大你不但可以看看，还可以转转。</template>
    </Banner>
  </div>
</template>

<style scoped lang="scss">
.note-content {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: $backColor;
}
</style>
