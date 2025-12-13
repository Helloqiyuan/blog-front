<script setup lang="ts">
import { ref } from 'vue';
import {
  House,
  Document,
  EditPen,
  ChatDotRound,
  Link,
  Connection,
  Monitor,
  Camera,
} from '@element-plus/icons-vue';
const menuItems = [
  { id: '', label: '欢迎回来', icon: House },
  { id: '/article', label: '文章管理', icon: Document },
  { id: '/note', label: '随笔管理', icon: EditPen },
  { id: '/comment', label: '留言管理', icon: ChatDotRound },
  { id: '/friendlink', label: '友链管理', icon: Link },
  { id: '/subscribe', label: '订阅管理', icon: Connection },
  { id: '/about', label: '关于', icon: Monitor },
  { id: '/waterfall', label: '瀑布', icon: Camera },
];
</script>

<template>
  <aside class="layout-aside">
    <!-- 用户头像 -->
    <div class="user-avatar">
      <div class="avatar-placeholder"></div>
    </div>

    <!-- 导航菜单 -->
    <nav class="nav-menu">
      <RouterLink
        :to="`/dashboard${item.id}`"
        v-for="item in menuItems"
        :key="item.id"
        class="nav-item"
      >
        <el-icon class="nav-icon">
          <component :is="item.icon" />
        </el-icon>
        <span class="nav-label">{{ item.label }}</span>
      </RouterLink>
      <RouterLink to="/" class="nav-item">
        <el-icon class="nav-icon">
          <component :is="House" />
        </el-icon>
        <span class="nav-label">主页</span>
      </RouterLink>
    </nav>

    <!-- 底部信息 -->
    <footer class="aside-footer">
      <el-link href="https://beian.miit.gov.cn/" target="_blank" type="info" class="footer-item"
        >赣ICP备2025077425号</el-link
      >
    </footer>
  </aside>
</template>

<style scoped lang="scss">
.layout-aside {
  min-width: 250px;
  height: 100vh;
  background: #fff;
  display: flex;
  border-right: 1px solid #ccc;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0 0;
  box-sizing: border-box;
  position: relative;
}

.user-avatar {
  width: 100%;
  margin-bottom: 15px;
  padding: 0 15px;

  .avatar-placeholder {
    height: 60px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('@/assets/images/avatar.png');
    background-position: center;
  }
}

.nav-menu {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 15px;
}

.nav-item {
  user-select: none;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  color: #333;
  position: relative;

  .nav-icon {
    font-size: 18px;
    margin-right: 12px;
    color: #666;
  }

  .nav-label {
    flex: 1;
    font-size: 14px;
  }

  &:hover {
    background: #f5f5f5;
  }

  &.router-link-exact-active {
    background: #fff3e0;
    color: #ff6b35;

    .nav-icon {
      color: #ff6b35;
    }
  }
}

.aside-footer {
  width: 100%;
  padding: 20px 15px;
  font-size: 12px;
  color: #999;
  text-align: center;
  line-height: 1.8;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
}

.footer-item {
  margin-bottom: 8px;
}
</style>
