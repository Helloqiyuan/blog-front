<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getArticleListApi } from '@/apis/article';
import type { Article } from '@/views/Note/types/index';
import { View } from '@element-plus/icons-vue';
const articleList = ref<Article[]>([]);
const getArticleList = async () => {
  const res = await getArticleListApi(1, 20);
  articleList.value = res.data.rows;
};
const loading = ref(true);

const formatDate = (date: Date | string | undefined) => {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months}个月前`;
  } else if (days > 0) {
    return `${days}天前`;
  } else {
    return '今天';
  }
};

onMounted(async () => {
  await getArticleList();
  loading.value = false;
});
</script>
<template>
  <div
    class="article-content"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <div class="note-list">
      <RouterLink
        :to="`/articleDetail?id=${item.id}`"
        class="note-item"
        target="_blank"
        v-for="item in articleList"
        :key="item.id"
      >
        <div class="note-header">
          <h3 class="note-title">{{ item.title }}</h3>
        </div>
        <div class="note-body">
          <p class="note-content">{{ item.subTitle }}</p>
        </div>
        <div class="note-footer" v-if="item.viewCount || item.createTime">
          <span class="note-meta" v-if="item.viewCount">
            <el-icon class="meta-icon"><View /></el-icon>
            {{ item.viewCount }}
          </span>
          <span class="note-meta" v-if="item.createTime">
            {{ formatDate(item.createTime) }}
          </span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-content {
  width: 100%;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.note-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: flex-start;
  max-width: 1280px;
  margin: 0 auto;
}

.note-item {
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(50% - 12px);
  min-height: 280px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  padding: 24px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #d0d0d0;
  }

  .note-header {
    margin-bottom: 16px;
  }

  .note-title {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s ease;

    &:hover {
      color: #409eff;
    }
  }

  .note-body {
    flex: 1;
    margin-bottom: 16px;
  }

  .note-content {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .note-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    font-size: 12px;
    color: #999;
  }

  .note-meta {
    display: flex;
    align-items: center;
    gap: 4px;

    .meta-icon {
      font-size: 14px;
    }
  }
}
</style>
