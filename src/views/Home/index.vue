<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import type { Tips } from './type';
import { getRandomTips } from '@/apis/tips';
// 个人作品数据
const projects = ref([
  {
    id: 1,
    title: '旧版博客',
    description: '一个功能完善的博客,感谢支持Star。',
    icon: '🎀',
    iconColor: '#ff4757',
    hasSourceLink: true,
  },
  {
    id: 2,
    title: '简约博客',
    description: '一个简洁而又简单的博客,感谢支持Star。',
    icon: '🌱',
    iconColor: '#2ed573',
    hasSourceLink: true,
  },
  {
    id: 3,
    title: '博客小程序',
    description: '本站的微信小程序博客版本,欢迎扫码体验。',
    icon: '🎗️',
    iconColor: '#ffa502',
    hasSourceLink: false,
  },
]);

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
  const lunarInfo = '农历十月十一 乙巳年蛇';

  return {
    weekday,
    date: `${year}年${month}月${day}日`,
    lunar: lunarInfo,
  };
};

const dateInfo = computed(() => getCurrentDate());

// 刷新热搜
const refreshHotSearch = async () => {
  const res = await getRandomTips(7);
  hotSearchList.value = res.data.sort((a: Tips, b: Tips) => a.priority - b.priority);
  console.log(hotSearchList.value);
};
onMounted(() => {
  refreshHotSearch();
});
</script>

<template>
  <div class="home-container">
    <!-- 顶部英雄区域 -->
    <div class="hero-section">
      <div class="hero-image">
        <!-- 图片占位，实际使用时替换为真实图片 -->
        <div class="hero-image-placeholder"></div>
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 class="hero-weekday">{{ dateInfo.weekday }}</h1>
            <p class="hero-date">{{ dateInfo.date }} {{ dateInfo.lunar }}</p>
          </div>
        </div>
      </div>

      <!-- 右侧热搜区域 -->
      <div class="hot-search-section">
        <div class="hot-search-header">
          <h3 class="hot-search-title">每日小提示</h3>
          <el-icon class="refresh-icon" @click="refreshHotSearch">
            <Refresh />
          </el-icon>
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
        <h2 class="section-title">一些无人问津的个人作品</h2>
      </div>

      <div class="projects-list">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-icon" :style="{ color: project.iconColor }">
            {{ project.icon }}
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>
          <el-link
            v-if="project.hasSourceLink"
            type="warning"
            class="source-link"
            :underline="false"
          >
            获取源码
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  width: 100%;
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: flex-end;
  padding: 40px;
  box-sizing: border-box;
}

.hero-content {
  color: #fff;

  .hero-weekday {
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

.refresh-icon {
  font-size: 18px;
  color: #666;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    color: #409eff;
    transform: rotate(180deg);
  }
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
  transition: background-color 0.2s;

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
