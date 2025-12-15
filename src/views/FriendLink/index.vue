<script setup lang="ts">
import Banner from '@/components/Banner.vue';
</script>

<template>
  <div class="friend-link-content">
    <Banner>
      <template #title>友情链接</template>
      <template #subtitle>如果你去抢银行，不论成功还是失败，未来十年内你都不用再上班。</template>
    </Banner>
  </div>
</template>

<style scoped lang="scss">
.friend-link-content {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: $backColor;
}
</style>
