<script setup lang="ts">
import LayoutAside from './components/LayoutAside.vue';
</script>

<template>
  <div class="content">
    <LayoutAside class="aside" />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  position: relative;

  &::before {
    content: '';
    display: block;
    min-width: 250px;
  }
}

.aside {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
