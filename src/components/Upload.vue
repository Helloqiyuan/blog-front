<template>
  <el-upload
    class="avatar-uploader"
    action="/api/common/upload"
    :headers="headers"
    drag
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload"
    v-loading="uploading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在上传中..."
  >
    <img v-if="modelValue" :src="modelValue" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
      <el-text class="mx-1">点击上传或<strong>拖拽</strong>到此处上传</el-text>
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import useAdminStore from '@/stores/admin';
import type { UploadProps } from 'element-plus';
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const uploading = ref(false);
const adminStore = useAdminStore();
const headers = {
  Authorization: `Bearer ${adminStore.getAdminInfo()?.token}`,
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log('图片上传成功回调', response, uploadFile);
  emit('update:modelValue', response.data);
  uploading.value = false;
};
const handleAvatarError: UploadProps['onError'] = (err, uploadFile) => {
  console.log('图片上传失败回调', err, uploadFile);
  emit('update:modelValue', '');
  uploading.value = false;
  ElMessage.error('上传失败');
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  uploading.value = true;
  console.log('图片上传前回调', rawFile);

  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('只能上传图片!');
    uploading.value = false;
    return false;
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('图片大小不能超过 20MB!');
    uploading.value = false;
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100%;
  max-height: 300px;
  display: block;
  object-fit: contain;
}
.avatar-uploader-icon {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  strong {
    color: #ff9bb0;
  }
}
</style>

<style>
.avatar-uploader .el-upload-dragger {
  padding: 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
