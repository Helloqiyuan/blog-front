<script setup lang="ts">
import { range } from '@/utils/utils';
import Banner from '@/components/Banner.vue';

const baseURL = 'https://qiyuan-cloud-data.oss-cn-guangzhou.aliyuncs.com/avatar/';
</script>

<template>
  <div class="waterfall-content">
    <Banner>
      <template #title>图片壁纸</template>
      <template #subtitle>你是转角遇到爱，可你想过对方吗？他是转角遇到鬼呀。</template>
    </Banner>
    <div class="waterfall">
      <!-- i列 -->
      <div class="column" v-for="i in 4" :key="i">
        <!-- 主要用来设置gap -->
        <div class="each-line">
          <img v-lazy="baseURL + j + '.jpg'" v-for="j in range(i * 100, (i + 2) * 100)" :key="j" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.waterfall-content {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: $backColor;
}
.waterfall {
  margin-top: 20px;
  width: 100%;
  min-height: 100vh;
  height: max-content;
  padding: 20px;
  background-color: $boxColor;
  border-radius: $radius;
  display: flex;
  gap: 12px;
  .column {
    flex: 1;
    display: flex;
    flex-direction: row;
    .each-line {
      display: flex;
      width: 100%;
      gap: 12px;
      flex-direction: column;
      img {
        display: block;
        width: 100%;
        min-height: 200px;
        transition: all 1s;
        opacity: 0;
      }
    }
  }
}
</style>
