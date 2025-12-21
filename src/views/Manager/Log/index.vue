<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { logPageQueryApi } from '@/apis/LogService';
import type { Log, PageQueryDTO } from '@/apis/LogService/types';
import dayjs from '@/utils/dayjs';
// 状态管理
const logList = ref<Log[]>([]);
const loading = ref(false);
const total = ref(0);
const dateRange = ref<[string, string] | null>(null);
// 搜索表单
const searchForm = ref<PageQueryDTO>({
  page: 1,
  pageSize: 20,
  operateNickname: '',
  type: -1,
  startTime: '',
  endTime: '',
});

// 获取日志列表
const fetchLogList = async () => {
  loading.value = true;
  try {
    const res = await logPageQueryApi(searchForm.value);
    if (res.code === 1) {
      logList.value = res.data.rows || [];
      total.value = res.data.total;
    } else {
      ElMessage.error(res.message || '获取日志列表失败');
    }
  } catch (error) {
    ElMessage.error('获取日志列表失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  searchForm.value.page = 1;
  // 更新dateRange用于界面显示
  if (searchForm.value.startTime && searchForm.value.endTime) {
    dateRange.value = [searchForm.value.startTime, searchForm.value.endTime];
  } else {
    dateRange.value = null;
  }
  fetchLogList();
};

// 重置搜索
const handleReset = () => {
  searchForm.value.operateNickname = '';
  searchForm.value.startTime = '';
  searchForm.value.endTime = '';
  searchForm.value.page = 1;
  dateRange.value = null;
  fetchLogList();
};

// 处理页面大小变化
const handleSizeChange = () => {
  searchForm.value.page = 1;
  fetchLogList();
};

// 处理当前页变化
const handleCurrentChange = () => {
  fetchLogList();
};

// 处理日期选择
const handleDateChange = (val: [string, string] | null) => {
  if (val && val.length === 2) {
    searchForm.value.startTime = val[0];
    searchForm.value.endTime = val[1];
  } else {
    searchForm.value.startTime = '';
    searchForm.value.endTime = '';
  }
};

// 初始化
onMounted(async () => {
  loading.value = true;
  await fetchLogList();
  loading.value = false;
});
</script>

<template>
  <div
    class="log-manager"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <!-- 功能栏 -->
    <div class="function">
      <div class="right-controls">
        <el-input
          v-model="searchForm.operateNickname"
          style="width: 200px"
          placeholder="操作人昵称"
          clearable
          @keydown.enter="handleSearch"
        />
        <el-select
          v-model="searchForm.type"
          @change="handleSearch"
          placeholder="操作类型"
          style="width: 120px"
        >
          <el-option label="全部日志" :value="-1"></el-option>
          <el-option label="操作日志" :value="0"></el-option>
          <el-option label="登录日志" :value="1"></el-option>
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleDateChange"
          style="width: 360px"
        />
        <el-button style="margin-left: 0" plain type="primary" @click="handleSearch">
          搜索
        </el-button>
        <el-button style="margin-left: 0" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-card style="margin-top: 16px">
      <el-table :data="logList" :loading="loading" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="operateNickname" label="操作人" width="120" />
        <el-table-column prop="className" label="类名" min-width="150" show-overflow-tooltip />
        <el-table-column prop="methodName" label="方法名" min-width="120" show-overflow-tooltip />
        <el-table-column prop="methodParams" label="参数" min-width="200" show-overflow-tooltip />
        <el-table-column prop="returnValue" label="返回值" min-width="200" show-overflow-tooltip />
        <el-table-column prop="costTime" label="耗时(ms)" width="100" align="center" />
        <el-table-column
          prop="operateTime"
          label="操作时间"
          width="180"
          align="center"
          show-overflow-tooltip
        />
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="searchForm.page"
        v-model:page-size="searchForm.pageSize"
        :page-sizes="[20, 30, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 20px; justify-content: flex-end; display: flex"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.log-manager {
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
