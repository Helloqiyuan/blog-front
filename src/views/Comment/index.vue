<script setup lang="ts">
import Banner from '@/components/Banner.vue';
</script>

<template>
  <div class="comment-content">
    <Banner>
      <template #title>留言板</template>
      <template #subtitle>只要有快递还在路上，就感觉这生活，还算有点希望。</template>
    </Banner>
  </div>
</template>

<style scoped lang="scss">
.comment-content {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: $backColor;
}
</style>
