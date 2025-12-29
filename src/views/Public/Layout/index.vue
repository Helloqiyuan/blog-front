<script setup lang="ts">
import { ref } from 'vue';
import LayoutAside from './components/LayoutAside.vue';
import LoginDialog from './components/LoginDialog.vue';
const topRef = ref<HTMLDivElement | null>(null);
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topRef.value?.classList.remove('hiden');
  } else {
    topRef.value?.classList.add('hiden');
  }
});
const handleToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
const dialogVisible = ref(false);
const showDialog = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <div class="content">
    <LayoutAside class="aside" @open-login-dialog="showDialog" />
    <LoginDialog v-model="dialogVisible" />
    <RouterView />
    <div class="scroll-to-top hiden" @click="handleToTop" ref="topRef">
      <span>顶部</span>
    </div>
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
.btn {
  position: fixed;
  left: 50px;
  top: 100px;
}

.aside {
  position: fixed;
  left: 0;
  top: 0;
}
.scroll-to-top {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 5px;
  position: fixed;
  right: 60px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-image: url('@/assets/to-top-arrow.svg');
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: center 5px;
  background-color: $boxColor;
  box-shadow: $boxShadow;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #e3e5e7;
  }
  span {
    user-select: none;
    font-size: 14px;
  }
}
.hiden {
  display: none;
}
</style>
