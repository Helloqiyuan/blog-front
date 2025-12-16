<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import LoadingButton from '@/components/LoadingButton.vue';
import type { Tips } from '@/apis/TipsService/types';
import type { Photo } from '@/apis/PhotoService/types';
import { getRandomTips } from '@/apis/TipsService';
import { getPhotoRandom } from '@/apis/PhotoService';
// 个人作品数据
const projects = ref([
  {
    id: 1,
    url: 'https://space.bilibili.com/478354407',
    title: 'B站主页',
    description: '初来B站，有点紧张赶紧拿出我珍藏了十年的作业写一下',
    icon: '🎀',
    iconColor: '#ff4757',
    hasSourceLink: true,
  },
  {
    id: 2,
    url: 'https://github.com/helloqiyuan',
    title: 'github主页',
    description: 'helloqiyuan的github主页',
    icon: '🌱',
    iconColor: '#2ed573',
    hasSourceLink: true,
  },
  {
    id: 3,
    url: 'https://gitee.com/helloqiyuan',
    title: 'gitee主页',
    description: 'helloqiyuan的gitee主页',
    icon: '🎗️',
    iconColor: '#ffa502',
    hasSourceLink: false,
  },
]);
const loading = ref(true);
const heroImage = ref<Photo>();

// 图片加载错误处理
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  // 设置默认占位图
  target.src =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM5OTkiPlx1NWYzZlx1NmM4NzwvdGV4dD48L3N2Zz4=';
  target.style.opacity = '1';
};

// 热搜数据
const hotSearchList = ref<Tips[]>([]);
// 获取当前日期信息
const getCurrentDate = () => {
  const now = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = weekdays[now.getDay()];

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // 这里简化处理，实际应该计算农历
  // const lunarInfo = '农历十月十一 乙巳年蛇';

  return {
    weekday,
    date: `${year}年${month}月${day}日`,
    // lunar: lunarInfo,
  };
};

const dateInfo = computed(() => getCurrentDate());
// 刷新热搜
const refreshHotSearch = async () => {
  const res = await getRandomTips(7);
  hotSearchList.value = res.data.sort((a: Tips, b: Tips) => a.priority - b.priority);
};
const getPhotoRandomData = async () => {
  const res = await getPhotoRandom();
  heroImage.value = res.data;
};
onMounted(async () => {
  await getPhotoRandomData();
  await refreshHotSearch();
  loading.value = false;
});
</script>

<template>
  <div
    class="home-container"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <!-- 顶部英雄区域 -->
    <div class="hero-section">
      <div class="hero-image">
        <!-- 图片占位，实际使用时替换为真实图片 -->
        <div class="hero-image-placeholder">
          <img v-trans="heroImage?.url" alt="hero-image" @error="handleImageError" />
        </div>
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 class="hero-weekday">{{ dateInfo.weekday }}</h1>
            <p class="hero-date">{{ dateInfo.date }}</p>
          </div>
        </div>
      </div>

      <!-- 右侧每日小提示区域 -->
      <div class="hot-search-section">
        <div class="hot-search-header">
          <h3 class="hot-search-title">每日小提示</h3>
          <LoadingButton @click="refreshHotSearch" />
        </div>
        <ul class="hot-search-list">
          <li v-for="(item, index) in hotSearchList" :key="item.id" class="hot-search-item">
            <span class="rank-number">
              {{ index + 1 }}
            </span>
            <span class="hot-search-title-text">{{ item.content }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 个人作品区域 -->
    <div class="projects-section">
      <div class="section-header">
        <div class="section-bar"></div>
        <h2 class="section-title">关于作者</h2>
      </div>

      <div class="projects-list">
        <a
          :href="project.url"
          target="_blank"
          v-for="project in projects"
          :key="project.id"
          class="project-card"
        >
          <div class="project-icon" :style="{ color: project.iconColor }">
            {{ project.icon }}
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>
          <!-- <el-link
            v-if="project.hasSourceLink"
            type="warning"
            class="source-link"
            :underline="false"
          >
            获取源码
          </el-link> -->
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: $backColor;
}

.hero-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.hero-image {
  flex: 1;
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.hero-image-placeholder {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    opacity: 0;
    object-fit: cover;
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: flex-end;
  padding: 40px;
  box-sizing: border-box;
}

.hero-content {
  color: #fff;

  .hero-weekday {
    font-family: serif;
    font-size: 48px;
    font-weight: bold;
    margin: 0 0 10px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .hero-date {
    font-size: 16px;
    margin: 0;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
}

.hot-search-section {
  width: 500px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hot-search-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.hot-search-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.hot-search-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hot-search-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
  }
  &:nth-child(1) {
    .rank-number {
      color: #ff6b35;
    }
  }
  &:nth-child(2) {
    .rank-number {
      color: #ff8c5a;
    }
  }
  &:nth-child(3) {
    .rank-number {
      color: #ffa502;
    }
  }
}

.rank-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-right: 12px;
  flex-shrink: 0;
}

.hot-search-title-text {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects-section {
  margin-top: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.section-bar {
  width: 4px;
  height: 20px;
  background-color: #ff6b35;
  border-radius: 2px;
  margin-right: 12px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    box-shadow 0.3s,
    transform 0.2s;
  text-decoration: none;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
}

.project-icon {
  font-size: 32px;
  margin-right: 16px;
  flex-shrink: 0;
}

.project-content {
  flex: 1;
}

.project-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.project-description {
  font-size: 14px;
  color: #999;
  margin: 0;
  line-height: 1.5;
}

.source-link {
  font-size: 14px;
  color: #ff6b35;
  font-weight: 500;
  flex-shrink: 0;
  margin-left: 16px;

  &:hover {
    color: #ff8c5a;
  }
}
</style>
