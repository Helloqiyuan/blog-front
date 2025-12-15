<script setup lang="ts"></script>

<template>
  <div class="banner">
    <h1 class="title"><slot name="title"></slot></h1>
    <span class="subtitle"><slot name="subtitle"></slot></span>
  </div>
</template>

<style scoped lang="scss">
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
  box-shadow: $boxShadow;
  .title {
    font-weight: normal;
    font-family: $font;
  }
}
</style>
