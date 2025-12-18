<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Delete, Plus } from '@element-plus/icons-vue';
import {
  notePageQueryApi,
  getNoteTypeListApi,
  getNoteByIdApi,
  addNoteApi,
  editNoteApi,
  deleteNoteApi,
} from '@/apis/NoteService';
import type { Note, NoteType, PageQueryDTO } from '@/apis/NoteService/types';
import type { FormInstance } from 'element-plus';

// 状态管理
const noteList = ref<Note[]>([]);
const noteTypeList = ref<NoteType[]>([]);
const loading = ref(false);
const total = ref(0);

// 搜索表单
const searchForm = ref<PageQueryDTO>({
  page: 1,
  pageSize: 10,
  content: '',
  typeId: -1, // 表示全部类型
});

// 编辑 dialog 相关
const editDialogVisible = ref(false);
const isEdit = ref<boolean>(false); // true 为编辑，false 为新增
const editForm = ref<Partial<Note>>({
  content: '',
  typeId: undefined,
});
const formRef = ref<FormInstance>();
const editLoading = ref(false);

// Dialog 标题 (计算属性)
const dialogTitle = computed(() => (isEdit.value ? '编辑随笔' : '新增随笔'));

// 表单验证规则
const formRules = {
  content: [
    { required: true, message: '内容不能为空', trigger: 'blur' },
    { min: 1, max: 500, message: '内容长度需要在 1-500 之间', trigger: 'blur' },
  ],
  typeId: [{ required: true, message: '类型不能为空', trigger: 'change' }],
};

// 获取随笔列表
const fetchNoteList = async () => {
  loading.value = true;
  try {
    const res = await notePageQueryApi(searchForm.value);
    if (res.code === 1) {
      noteList.value = res.data.rows;
    } else {
      ElMessage.error(res.message || '获取随笔列表失败');
    }
  } catch (error) {
    ElMessage.error('获取随笔列表失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 获取随笔类型列表
const fetchNoteTypeList = async () => {
  try {
    const res = await getNoteTypeListApi();
    if (res.code === 1) {
      noteTypeList.value = res.data || [];
    } else {
      ElMessage.error(res.message || '获取随笔类型失败');
    }
  } catch (error) {
    ElMessage.error('获取随笔类型失败');
    console.error(error);
  }
};

// 重置搜索
const handleReset = () => {
  searchForm.value.content = '';
  searchForm.value.typeId = -1;
  searchForm.value.page = 1;
  fetchNoteList();
};

// 打开编辑页面
const handleEdit = async (row: Note) => {
  isEdit.value = true;
  editLoading.value = true;
  try {
    // 从后端获取完整数据
    const res = await getNoteByIdApi(row.id as number);
    if (res.code === 1 && res.data) {
      editForm.value = {
        id: res.data.id,
        content: res.data.content,
        typeId: res.data.typeId,
      };
    } else {
      ElMessage.error('获取随笔详情失败');
      return;
    }
  } catch (error) {
    ElMessage.error('获取随笔详情失败');
    console.error(error);
    return;
  } finally {
    editLoading.value = false;
  }
  editDialogVisible.value = true;
  // 重置表单验证状态
  formRef.value?.clearValidate();
};

// 打开新增页面
const handleAdd = () => {
  isEdit.value = false;
  editForm.value = {
    content: '',
    typeId: undefined,
  };
  editDialogVisible.value = true;
  formRef.value?.clearValidate();
};

// 删除随笔
const handleDelete = (note: Note) => {
  ElMessageBox.confirm('确定删除该随笔吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true;
      try {
        const res = await deleteNoteApi(note.id as number);
        if (res.code === 1) {
          ElMessage.success('删除成功');
          await fetchNoteList();
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

// 确认编辑/新增
const handleConfirm = async () => {
  try {
    await formRef.value?.validate();
    editLoading.value = true;
    const res = isEdit.value
      ? await editNoteApi(editForm.value as Note)
      : await addNoteApi(editForm.value as Note);
    if (res.code === 1) {
      ElMessage.success(isEdit.value ? '编辑成功' : '新增成功');
      editDialogVisible.value = false;
      await fetchNoteList();
    } else {
      ElMessage.error(res.message || (isEdit.value ? '编辑失败' : '新增失败'));
    }
  } catch (error) {
    console.error(error);
  } finally {
    editLoading.value = false;
  }
};

// 取消编辑/新增
const handleCancelEdit = () => {
  editDialogVisible.value = false;
  editForm.value = {
    content: '',
    typeId: undefined,
  };
  formRef.value?.clearValidate();
};

// 初始化
onMounted(async () => {
  loading.value = true;
  await fetchNoteList();
  await fetchNoteTypeList();
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
        <el-input
          v-model="searchForm.content"
          style="width: 240px"
          placeholder="搜索内容"
          clearable
          @keydown.enter="fetchNoteList"
        />
        <el-select v-model="searchForm.typeId" placeholder="请选择类型" style="width: 150px">
          <el-option label="全部" :value="-1" />
          <el-option
            v-for="item in noteTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button style="margin-left: 0" plain type="primary" @click="fetchNoteList">
          搜索
        </el-button>
        <el-button style="margin-left: 0" plain @click="handleReset">重置</el-button>
        <el-button style="margin-left: 0" plain type="success" :icon="Plus" @click="handleAdd">
          新增随笔
        </el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-card style="margin-top: 16px">
      <el-table :data="noteList" :loading="loading" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="typeName" label="类型" width="100" />
        <el-table-column prop="content" label="内容" min-width="300" show-overflow-tooltip />
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

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="searchForm.page"
        v-model:page-size="searchForm.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="fetchNoteList"
        @current-change="fetchNoteList"
        style="margin-top: 20px; justify-content: flex-end; display: flex"
      />
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
              v-for="item in noteTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="editForm.content"
            type="textarea"
            placeholder="请输入内容"
            :rows="4"
            maxlength="500"
            show-word-limit
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
