<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Delete, Plus } from '@element-plus/icons-vue';
import { getArticleListApi, deleteArticleByIdApi } from '@/apis/ArticleService';
import type { Article, PageQuery } from '@/apis/ArticleService/types';
import router from '@/router';
import type { RouterLink } from 'vue-router';

// 状态管理
const articleList = ref<Article[]>([]);
const loading = ref(false);

// 搜索表单
const searchForm = ref<PageQuery>({
  page: 1,
  pageSize: 100,
  searchContent: '',
});

// 获取文章列表
const fetchArticleList = async () => {
  loading.value = true;
  try {
    const res = await getArticleListApi(searchForm.value);
    if (res.code === 1) {
      articleList.value = res.data.rows || [];
    } else {
      ElMessage.error(res.message || '获取文章列表失败');
    }
  } catch (error) {
    ElMessage.error('获取文章列表失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  searchForm.value.page = 1;
  fetchArticleList();
};

// 重置搜索
const handleReset = () => {
  searchForm.value.searchContent = '';
  searchForm.value.page = 1;
  fetchArticleList();
};

// 打开新增对话框
const handleAdd = () => {
  router.push('/dashboard/article/edit');
};

// 打开编辑对话框
const handleEdit = (row: Article) => {
  router.push({
    path: '/dashboard/article/edit',
    query: {
      id: row.id,
    },
  });
};

// 删除文章
const handleDelete = (article: Article) => {
  ElMessageBox.confirm('确定删除该文章吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const res = await deleteArticleByIdApi(article.id!);
        if (res.code === 1) {
          ElMessage.success('删除成功');
          await fetchArticleList();
        } else {
          ElMessage.error(res.message || '删除失败');
        }
      } catch (error) {
        ElMessage.error('删除失败');
        console.error(error);
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};
// 初始化
onMounted(async () => {
  loading.value = true;
  await fetchArticleList();
  loading.value = false;
});
</script>

<template>
  <div
    class="article-manager"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <!-- 功能栏 -->
    <div class="function">
      <div class="right-controls">
        <el-input
          v-model="searchForm.searchContent"
          style="width: 240px"
          placeholder="搜索关键词"
          clearable
          @keydown.enter="handleSearch"
        />
        <el-button style="margin: 0 8px" plain type="primary" @click="handleSearch">
          搜索
        </el-button>
        <el-button plain @click="handleReset">重置</el-button>
        <el-button type="success" @click="handleAdd" :icon="Plus">新增文章</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-card style="margin-top: 16px">
      <el-table :data="articleList" :loading="loading" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="title" label="标题" min-width="150" show-overflow-tooltip>
          <template #default="scope">
            <RouterLink :to="`/article/detail?id=${scope.row.id}`" style="text-decoration: none">
              <el-text>{{ scope.row.title }}</el-text>
            </RouterLink>
          </template>
        </el-table-column>
        <el-table-column prop="subTitle" label="副标题" min-width="120" show-overflow-tooltip>
          <template #default="scope">
            <RouterLink :to="`/article/detail?id=${scope.row.id}`" style="text-decoration: none">
              <el-text>{{ scope.row.subTitle }}</el-text>
            </RouterLink>
          </template>
        </el-table-column>
        <el-table-column prop="viewCount" label="浏览数" width="100" align="center" />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="updateTime"
          label="修改时间"
          width="180"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="scope">
            <el-button
              plain
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleEdit(scope.row)"
              v-if="scope.row.id"
            >
              编辑
            </el-button>
            <el-button
              plain
              type="danger"
              size="small"
              :icon="Delete"
              @click="handleDelete(scope.row)"
              v-if="scope.row.id"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.article-manager {
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
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: $boxColor;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  border-radius: 6px;
  padding: 0 20px;

  .right-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

:deep(.el-table__row) {
  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
