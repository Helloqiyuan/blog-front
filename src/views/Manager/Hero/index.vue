<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Delete, Plus } from '@element-plus/icons-vue';
import {
  getPhotoList,
  getPhotoListByType,
  getPhotoById,
  addPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoTypeList,
} from '@/apis/HeroPhotoService';
import type { Photo, PhotoType } from '@/apis/HeroPhotoService/types';
import type { FormInstance } from 'element-plus';
import { lo } from 'element-plus/es/locales.mjs';
import Upload from '@/components/Upload.vue';

// 状态
const photoList = ref<Photo[]>([]);
const photoTypeList = ref<PhotoType[]>([]);
const loading = ref(false);

// 搜索表单（与随笔页面风格保持一致）
const searchForm = ref({
  typeId: -1,
});

// 编辑 dialog
const editDialogVisible = ref(false);
const isEdit = ref(false);
const editForm = ref<Partial<Photo>>({ url: '', typeId: undefined });
const formRef = ref<FormInstance>();
const editLoading = ref(false);

const dialogTitle = computed(() => (isEdit.value ? '编辑英雄图' : '新增英雄图'));

const formRules = {
  url: [{ required: true, message: '图片地址不能为空', trigger: 'blur' }],
  typeId: [{ required: true, message: '类型不能为空', trigger: 'change' }],
};

// 根据 typeId 获取类型名称
const getTypeName = (id?: number) => {
  const t = photoTypeList.value.find((i) => i.id === id);
  return t ? t.name : '-';
};

// 当类型改变时调用 API
const handleTypeChange = async () => {
  loading.value = true;
  try {
    const typeId = searchForm.value.typeId;
    let res;
    if (typeId === -1) {
      res = await getPhotoList();
    } else {
      res = await getPhotoListByType(typeId);
    }
    if (res.code === 1) {
      photoList.value = res.data || [];
    } else {
      ElMessage.error(res.message || '获取图片列表失败');
    }
  } catch (error) {
    ElMessage.error('获取图片列表失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 获取图片列表（接口返回全部）
const fetchPhotoList = async () => {
  loading.value = true;
  try {
    const res = await getPhotoList();
    // HeroPhotoService.getPhotoList 返回 Photo[] 直接
    if (res && Array.isArray(res)) {
      // 兼容后端直接返回数组或封装对象
      photoList.value = res as Photo[];
    } else if ((res as any)?.code !== undefined && (res as any).code === 1) {
      photoList.value = (res as any).data || [];
    } else if ((res as any)?.data) {
      photoList.value = (res as any).data || [];
    } else {
      photoList.value = [];
    }
  } catch (error) {
    ElMessage.error('获取图片列表失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const fetchPhotoTypeList = async () => {
  try {
    const res = await getPhotoTypeList();
    if (res && Array.isArray(res)) {
      photoTypeList.value = res as PhotoType[];
    } else if ((res as any)?.code !== undefined && (res as any).code === 1) {
      photoTypeList.value = (res as any).data || [];
    } else if ((res as any)?.data) {
      photoTypeList.value = (res as any).data || [];
    } else {
      photoTypeList.value = [];
    }
  } catch (error) {
    ElMessage.error('获取图片类型失败');
    console.error(error);
  }
};

const handleEdit = async (row: Photo) => {
  isEdit.value = true;
  editLoading.value = true;
  try {
    const res = await getPhotoById(row.id as number);
    if (res.code === 1) {
      editForm.value = res.data;
    }
  } catch (error) {
    ElMessage.error('获取图片详情失败');
    console.error(error);
    return;
  } finally {
    editLoading.value = false;
  }
  editDialogVisible.value = true;
  formRef.value?.clearValidate();
};

const handleAdd = () => {
  isEdit.value = false;
  editForm.value = { url: '', typeId: undefined };
  editDialogVisible.value = true;
  formRef.value?.clearValidate();
};

const handleDelete = (photo: Photo) => {
  ElMessageBox.confirm('确定删除该图片吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const res = await deletePhoto(photo.id as number);
        if ((res as any)?.code === undefined) {
          ElMessage.success('删除成功');
          await fetchPhotoList();
        } else if ((res as any).code === 1) {
          ElMessage.success('删除成功');
          await fetchPhotoList();
        } else {
          ElMessage.error((res as any).message || '删除失败');
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

const handleConfirm = () => {
  editLoading.value = true;

  formRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        let res;
        if (isEdit.value) {
          res = await updatePhoto(editForm.value as Photo);
        } else {
          res = await addPhoto(editForm.value as Photo);
        }
        if (res.code === 1) {
          if (isEdit.value) {
            ElMessage.success('更新成功');
          } else {
            ElMessage.success('新增成功');
          }
          fetchPhotoList();
          editLoading.value = false;
          editDialogVisible.value = false;
        } else {
          ElMessage.error(res.message || '操作失败');
        }
      } catch (e) {
        ElMessage.error('操作失败');
      } finally {
      }
    }
  });
};

const handleCancelEdit = () => {
  editDialogVisible.value = false;
  editForm.value = { url: '', typeId: undefined };
  formRef.value?.clearValidate();
};

onMounted(async () => {
  loading.value = true;
  await fetchPhotoList();
  await fetchPhotoTypeList();
  loading.value = false;
});
</script>

<template>
  <div
    class="note-manager"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <!-- 功能栏 -->
    <div class="function">
      <div class="right-controls">
        <el-select
          v-model="searchForm.typeId"
          placeholder="请选择类型"
          style="width: 150px"
          @change="handleTypeChange"
        >
          <el-option label="全部" :value="-1" />
          <el-option
            v-for="item in photoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button style="margin-left: 0" plain type="success" :icon="Plus" @click="handleAdd">
          新增图片
        </el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-card style="margin-top: 16px">
      <el-table :data="photoList" :loading="loading" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="图片预览" width="140">
          <template #default="{ row }">
            <el-image :src="row.url" style="width: 120px; height: 60px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120">
          <template #default="{ row }">{{ getTypeName(row.typeId) }}</template>
        </el-table-column>
        <el-table-column prop="url" label="地址" min-width="280" show-overflow-tooltip />
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

    <!-- 编辑/新增 Dialog -->
    <el-dialog
      v-model="editDialogVisible"
      :title="dialogTitle"
      width="500px"
      @close="handleCancelEdit"
    >
      <el-form
        ref="formRef"
        :model="editForm"
        :rules="formRules"
        label-width="80px"
        @submit.prevent="handleConfirm"
      >
        <el-form-item label="类型" prop="typeId">
          <el-select v-model="editForm.typeId" placeholder="请选择类型" style="width: 100%">
            <el-option
              v-for="item in photoTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图片地址" prop="url">
          <!-- <el-input v-model="editForm.url" placeholder="请输入图片地址" /> -->
          <upload v-model="editForm.url" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleCancelEdit">取消</el-button>
        <el-button type="primary" :loading="editLoading" @click="handleConfirm"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.note-manager {
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
  box-shadow: $boxShadow;
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
