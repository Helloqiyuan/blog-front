<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import type { UploadProps, UploadUserFile } from 'element-plus';
const props = defineProps<{
  acontent: string;
}>();

const fileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 1, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`,
  );
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false,
  );
};
const handleSucceed: UploadProps['onSuccess'] = (res, file, fileList) => {
  console.log('Success', res, file, fileList);
};
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo dark"
    action="http://localhost:8080/upload"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="1"
    :on-exceed="handleExceed"
    :on-success="handleSucceed"
  >
    <el-button type="primary"> </el-button>
  </el-upload>
</template>

<style scoped lang="scss">
.margin-top {
  margin-top: 20px;
}
</style>
