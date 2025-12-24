<script setup lang="ts"></script>

<template>
  <div class="block">
    <h1><slot name="title">默认标题</slot></h1>
    <slot name="content">默认内容</slot>
  </div>
</template>

<style scoped lang="scss">
.block {
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  height: max-content;
  background-color: $boxColor;
  box-shadow: $boxShadow;
  border-radius: $radius;
  color: $fontColor;
  h1 {
    border-left: 5px solid $blogColor;
    padding-left: 10px;
    margin-bottom: 20px;
    font-family: $fontFamily;
    font-weight: normal;
  }
}
</style>
