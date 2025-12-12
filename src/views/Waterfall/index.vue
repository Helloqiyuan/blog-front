<script setup lang="ts">
import { range } from '@/utils/utils';

const baseURL = 'https://qiyuan-cloud-data.oss-cn-guangzhou.aliyuncs.com/avatar/';
</script>

<template>
  <div class="waterfall-content">
    <div class="banner">
      <h1 class="title">图片壁纸</h1>
      <span class="subtitle">你是转角遇到爱，可你想过对方吗？他是转角遇到鬼呀。</span>
    </div>
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
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 200px;
  background-color: $boxColor;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  .title {
    font-weight: normal;
    font-family: serif;
  }
}
.waterfall {
  margin-top: 20px;
  width: 100%;
  min-height: 100vh;
  height: max-content;
  padding: 20px;
  background-color: $boxColor;
  border-radius: 12px;
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
