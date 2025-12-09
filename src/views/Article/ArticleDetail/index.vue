<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getArticleByIdApi } from '@/apis/ArticleService';
import type { Article } from '@/apis/ArticleService/types';
import { View } from '@element-plus/icons-vue';
import dayjs from '@/utils/dayjs';
import { ElMessage } from 'element-plus';
const props = defineProps<{
  id: string;
}>();

const article = ref<Article>({
  title: '',
  subTitle: '',
  cover: '',
  content: '',
});

const getArticle = async (id: string) => {
  console.log('getArticle', id);
  const res = await getArticleByIdApi(id);
  if (res.data) {
    article.value = res.data;
  }
};
onMounted(() => {
  if (props.id) {
    getArticle(props.id);
  } else {
    ElMessage.error('文章不存在');
  }
});
</script>
<template>
  <div class="article-detail">
    <div class="detail-card">
      <div class="detail-header">
        <h1 class="detail-title">
          {{ article.title }}
        </h1>
        <p class="detail-subtitle">{{ article.subTitle }}</p>
        <div class="detail-meta" v-if="article.viewCount || article.createTime">
          <span class="meta-item" v-if="article.viewCount">
            <el-icon class="meta-icon"><View /></el-icon>
            {{ article.viewCount }}
          </span>
          <span class="meta-item" v-if="article.createTime">
            {{ article.createTime + ' ' + dayjs(article.createTime).format('dddd') }}
          </span>
        </div>
      </div>
      <div class="detail-content" v-html="article.content"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-detail {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.detail-card {
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.detail-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-title {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.detail-subtitle {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  color: #999;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;

  .meta-icon {
    font-size: 16px;
  }
}

.detail-content {
  line-height: 1.8;
  color: #333;
  font-size: 16px;

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }

  :deep(p) {
    margin-bottom: 16px;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 16px 0;
  }

  :deep(ul),
  :deep(ol) {
    margin-bottom: 16px;
    padding-left: 24px;
  }

  :deep(li) {
    margin-bottom: 8px;
  }

  :deep(blockquote) {
    border-left: 4px solid #409eff;
    padding-left: 16px;
    margin: 16px 0;
    color: #666;
    font-style: italic;
  }

  :deep(code) {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
  }

  :deep(pre) {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  :deep(a) {
    color: #409eff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
