<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getArticleListApi } from '@/apis/article';
import type { Article } from '@/views/Note/types/index';
import { View } from '@element-plus/icons-vue';
import { formatDate } from '@/utils/utils';
import type { PageQuery } from '@/views/Article/types/index';
const articleList = ref<Article[]>([]);
const searchForm = ref<PageQuery>({
  page: 1,
  pageSize: 10,
  searchContent: '',
});
const getArticleList = async () => {
  const res = await getArticleListApi(searchForm.value);
  articleList.value = res.data.rows;
};
const loading = ref(false);
const sortType = ref(-1);
watch(sortType, (newValue) => {
  if (sortType.value === -1) {
    return;
  }
  loading.value = true;
  if (newValue === 0) {
    articleList.value.sort((a: Article, b: Article) => {
      if (!a.viewCount || !b.viewCount) return 0;
      return b.viewCount - a.viewCount;
    });
  } else {
    articleList.value.sort((a: Article, b: Article) => {
      if (!a.createTime || !b.createTime) return 0;
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
    });
  }
  loading.value = false;
});

onMounted(async () => {
  loading.value = true;
  await getArticleList();
  sortType.value = 0;
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
    <div class="function">
      <el-radio-group v-model="sortType">
        <el-radio :value="0">最多点击</el-radio>
        <el-radio :value="1">最新发布</el-radio>
      </el-radio-group>
      <el-input
        v-model="searchForm.searchContent"
        style="width: 240px; margin-left: auto"
        placeholder="搜索关键词"
        @keydown.enter="getArticleList"
        clearable
      />
      <el-button style="margin: 0 16px 0 8px" plain type="primary" @click="getArticleList"
        >搜索</el-button
      >
    </div>
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
          <span class="note-meta" v-if="item.updateTime">
            上次修改时间：{{ formatDate(item.updateTime) }}
          </span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-content {
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: max-content;
  padding: 20px;
  background-color: #f5f5f5;
}
.function {
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  padding-left: 20px;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: $boxColor;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  border-radius: 12px;
}
.note-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: flex-start;
  margin: 0 auto;
}

.note-item {
  display: flex;
  flex-direction: column;
  width: calc(50% - 12px);
  min-height: 280px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  padding: 24px;
  text-decoration: none;
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
