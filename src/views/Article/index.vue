<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getArticleListApi } from '@/apis/ArticleService';
import type { Article } from '@/apis/ArticleService/types';
import { View } from '@element-plus/icons-vue';
import { DistantFromNowAndDate } from '@/utils/utils';
import type { PageQueryDTO } from '@/apis/ArticleService/types/index';
import { SortType } from '@/apis/ArticleService/types';

const articleList = ref<Article[]>([]);
const total = ref(0);
const searchForm = ref<PageQueryDTO>({
  page: 1,
  pageSize: 18,
  sortType: SortType.VIEW_COUNT_DESC,
  searchContent: '',
});
const loading = ref(false);
const getArticleList = async () => {
  loading.value = true;
  const res = await getArticleListApi(searchForm.value);
  articleList.value = res.data.rows;
  total.value = res.data.total;
  loading.value = false;
};
watch(
  searchForm,
  () => {
    getArticleList();
  },
  {
    deep: true,
  },
);
onMounted(() => {
  getArticleList();
});
</script>

<template>
  <div
    class="article-content"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <!-- 功能区 -->
    <div class="function">
      <el-radio-group v-model="searchForm.sortType">
        <el-radio :value="SortType.VIEW_COUNT_DESC" class="radio">最多点击</el-radio>
        <el-radio :value="SortType.CREATE_TIME_DESC" class="radio">最新发布</el-radio>
        <el-radio :value="SortType.UPDATE_TIME_DESC" class="radio">最新修改</el-radio>
      </el-radio-group>
      <el-input
        v-model="searchForm.searchContent"
        style="width: 240px; margin-left: auto"
        placeholder="搜索关键词"
        @keydown.enter="getArticleList"
        clearable
      />
      <el-button style="margin-left: 16px" plain type="primary" @click="getArticleList"
        >搜索</el-button
      >
      <el-button
        style="margin-right: 16px"
        plain
        type="info"
        @click="
          searchForm.searchContent = '';
          getArticleList();
        "
        >重置</el-button
      >
    </div>
    <!-- 列表区 -->
    <div class="note-list">
      <RouterLink
        :to="`/article/detail?id=${item.id}`"
        class="note-item"
        target="_blank"
        v-for="item in articleList"
        :key="item.id"
        v-scale
      >
        <div class="note-header">
          <h3 class="note-title">{{ item.title }}</h3>
        </div>
        <div class="note-body">
          <p class="note-content">{{ item.subTitle }}</p>
          <img class="note-cover" v-if="item.cover" v-lazy="item.cover" alt="" />
        </div>
        <div class="note-footer" v-if="item.viewCount || item.createTime">
          <span class="note-meta" v-if="item.viewCount">
            <el-icon class="meta-icon"><View /></el-icon>
            {{ item.viewCount }}
          </span>
          <span class="note-meta" v-if="item.createTime">
            {{ DistantFromNowAndDate(item.createTime) }}
          </span>
          <span class="note-meta" v-if="item.updateTime">
            上次修改时间：{{ DistantFromNowAndDate(item.updateTime) }}
          </span>
        </div>
      </RouterLink>
    </div>
    <!-- 分页区 -->
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="searchForm.page"
        v-model:page-size="searchForm.pageSize"
        :page-sizes="[18, 36, 54, 90, 120]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getArticleList"
        @current-change="getArticleList"
      />
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
  background-color: $backColor;
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
  box-shadow: $boxShadow;
  margin-bottom: 16px;
  border-radius: $radius;
  .radio {
    color: $lightFontColor;
  }
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
  width: calc(33.33% - 16px);
  min-height: 280px;
  background-color: $boxColor;
  border-radius: $radius;
  border: 1px solid #e8e8e8;
  padding: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: $boxShadow;
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
    color: $fontColor;
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
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .note-content {
    font-size: 14px;
    color: $lightFontColor;
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .note-cover {
    width: 250px;
    height: 150px;
    object-fit: contain;
    transition: all 1.5s ease-in-out;
    opacity: 0;
  }

  .note-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    font-size: 12px;
    color: $lightFontColor;
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
.pagination-block {
  position: sticky;
  bottom: 0;
  margin: 20px 20px 20px 0px;
  width: max-content;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: $boxColor;
  border-radius: $radius;
  border: 1px solid #e8e8e8;
  box-shadow: $boxShadow;
}
</style>
