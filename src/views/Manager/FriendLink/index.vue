<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Delete, Plus, Check, Close } from '@element-plus/icons-vue';
import type { FriendLink } from '@/apis/FriendLinkService/types';
import {
  getAllFriendLinkApi,
  getFriendLinkByIdApi,
  insertFriendLinkApi,
  updateFriendLinkApi,
  deleteFriendLinkApi,
} from '@/apis/FriendLinkService';

const friendList = ref<FriendLink[]>([]);
const loading = ref(false);

const editDialogVisible = ref(false);
const isEdit = ref(false);
const editForm = reactive<Partial<FriendLink>>({
  name: '',
  url: '',
  img: '',
  description: '',
  authorEmail: '',
  status: 0,
});
const formRef = ref();
const editLoading = ref(false);

const dialogTitle = computed(() => (isEdit.value ? '编辑友链' : '新增友链'));

const rules = {
  name: [{ required: true, message: '请填写网站名称', trigger: 'blur' }],
  authorEmail: [{ required: true, type: 'email', message: '请填写有效邮箱', trigger: 'blur' }],
  url: [{ required: true, message: '请输入网站地址', trigger: 'blur' }],
  description: [{ required: true, message: '请输入网站描述', trigger: 'blur' }],
  img: [{ required: true, message: '请上传网站图标', trigger: 'blur' }],
};

const fetchFriendList = async () => {
  loading.value = true;
  try {
    const res = await getAllFriendLinkApi();
    if (res.code === 1) {
      friendList.value = res.data || [];
    } else {
      ElMessage.error(res.message || '获取友链列表失败');
    }
  } catch (error) {
    ElMessage.error('获取友链列表失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleAdd = () => {
  isEdit.value = false;
  Object.assign(editForm, {
    id: undefined,
    name: '',
    url: '',
    img: '',
    description: '',
    authorEmail: '',
    status: 0,
  });
  editDialogVisible.value = true;
  formRef.value?.clearValidate?.();
};

const handleEdit = async (row: FriendLink) => {
  isEdit.value = true;
  editLoading.value = true;
  try {
    const res = await getFriendLinkByIdApi(row.id as number);
    if (res.code === 1 && res.data) {
      Object.assign(editForm, res.data);
    } else {
      ElMessage.error('获取友链详情失败');
      return;
    }
  } catch (error) {
    ElMessage.error('获取友链详情失败');
    console.error(error);
    return;
  } finally {
    editLoading.value = false;
  }
  editDialogVisible.value = true;
  formRef.value?.clearValidate?.();
};

const handleDelete = (row: FriendLink) => {
  ElMessageBox.confirm('确定删除该友链吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const res = await deleteFriendLinkApi(row.id as number);
        if (res.code === 1) {
          ElMessage.success('删除成功');
          await fetchFriendList();
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

const handleConfirm = async () => {
  try {
    await formRef.value?.validate?.();
    editLoading.value = true;
    const payload = { ...(editForm as FriendLink) } as FriendLink;
    const res = payload.id
      ? await updateFriendLinkApi(payload)
      : await insertFriendLinkApi(payload);
    if (res.code === 1) {
      ElMessage.success(payload.id ? '编辑成功' : '新增成功');
      editDialogVisible.value = false;
      await fetchFriendList();
    } else {
      ElMessage.error(res.message || (payload.id ? '编辑失败' : '新增失败'));
    }
  } catch (error) {
    console.error(error);
  } finally {
    editLoading.value = false;
  }
};

const handleCancelEdit = () => {
  editDialogVisible.value = false;
  Object.assign(editForm, {
    name: '',
    url: '',
    img: '',
    description: '',
    authorEmail: '',
    status: 0,
  });
  formRef.value?.clearValidate?.();
};

const handleToggleStatus = (row: FriendLink) => {
  const targetStatus = row.status === 0 ? 1 : 0;
  const confirmText = targetStatus === 1 ? '确认审核通过该友链吗？' : '确认停用该友链吗？';
  ElMessageBox.confirm(confirmText, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const payload: FriendLink = { ...(row as FriendLink), status: targetStatus };
        const res = await updateFriendLinkApi(payload);
        if (res.code === 1) {
          ElMessage.success(targetStatus === 1 ? '审核通过' : '已停用');
          await fetchFriendList();
        } else {
          ElMessage.error(res.message || (targetStatus === 1 ? '审核失败' : '停用失败'));
        }
      } catch (error) {
        ElMessage.error(targetStatus === 1 ? '审核失败' : '停用失败');
        console.error(error);
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {
      ElMessage.info('已取消');
    });
};

onMounted(async () => {
  loading.value = true;
  await fetchFriendList();
  loading.value = false;
});
</script>
<template>
  <div
    class="friendlink-manager"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <div class="function">
      <div class="right-controls">
        <el-button plain type="success" :icon="Plus" @click="handleAdd">新增友链</el-button>
      </div>
    </div>

    <el-card style="margin-top: 16px">
      <el-table :data="friendList" :loading="loading" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="名称" min-width="150" show-overflow-tooltip>
          <template #default="scope">
            <a :href="scope.row.url" target="_blank" style="text-decoration: none">
              <el-text>{{ scope.row.name }}</el-text>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="网址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="authorEmail" label="联系邮箱" width="180" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.status === 0">待审核</el-tag>
            <el-tag type="success" v-else>已通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" align="center" />
        <el-table-column label="操作" width="240" align="center" fixed="right">
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
              type="success"
              size="small"
              :icon="Check"
              @click="handleToggleStatus(scope.row)"
              v-if="scope.row.status === 0"
            >
              审核
            </el-button>
            <el-button
              plain
              type="warning"
              size="small"
              :icon="Close"
              @click="handleToggleStatus(scope.row)"
              v-else
            >
              停用
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

    <el-dialog
      v-model="editDialogVisible"
      :title="dialogTitle"
      width="600px"
      @close="handleCancelEdit"
    >
      <el-form ref="formRef" :model="editForm" :rules="rules" label-width="100px" @submit.prevent>
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="editForm.name" maxlength="60" placeholder="请输入网站名称" />
        </el-form-item>
        <el-form-item label="联系邮箱" prop="authorEmail">
          <el-input v-model="editForm.authorEmail" placeholder="请输入联系邮箱" />
        </el-form-item>
        <el-form-item label="网站网址" prop="url">
          <el-input v-model="editForm.url" placeholder="请输入网站地址" />
        </el-form-item>
        <el-form-item label="网站图标" prop="img">
          <el-input v-model="editForm.img" placeholder="请输入网站图标地址" />
        </el-form-item>
        <el-form-item label="网站描述" prop="description">
          <el-input
            v-model="editForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入网站描述"
          />
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
.friendlink-manager {
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
