<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Article } from '@/apis/ArticleService/types';
import { getArticleByIdApi, uploadArticleApi, updateArticleApi } from '@/apis/ArticleService';
import { ElMessage } from 'element-plus';
import Upload from '@/components/Upload.vue';
import WangEditor from '@/components/WangEditor.vue';
import router from '@/router';
const props = defineProps<{
  id?: number;
}>();
// 编辑或新增
const isEdit = ref(false);
// 标题ref
const titleRef = ref();
// 副标题ref
const subTitleRef = ref();
// 对话框显示与否
const dialogVisible = ref(false);

const form = ref<Article>({
  title: '',
  subTitle: '',
  cover: '',
  content: '',
});
// 文章是否在上传
const uploading = ref(false);
/* 保存/编辑文章 */
const saveOrEdit = async () => {
  if (!form.value.title || !form.value.subTitle || !form.value.content) {
    ElMessage.error('请填写完整信息');
    return;
  }
  uploading.value = true;
  let res;
  if (isEdit.value) {
    res = await updateArticleApi(form.value);
  } else {
    res = await uploadArticleApi(form.value);
  }
  uploading.value = false;

  if (res.code === 1) {
    ElMessage.success('提交成功');
    form.value = {
      title: '',
      subTitle: '',
      cover: '',
      content: '',
    };
    dialogVisible.value = false;
    router.go(-1);
  } else {
    ElMessage.error('提交失败');
  }
};
/**
 * 文章封面
 * @param url 文章封面url
 */
const handleTransURL = (url: string) => {
  form.value.cover = url;
};
onMounted(async () => {
  if (props.id) {
    isEdit.value = true;
    const res = await getArticleByIdApi(props.id);
    form.value = res.data;
  }
});
</script>

<template>
  <div class="content">
    <div class="title">
      <el-text class="text" @click="titleRef.focus()" size="large" style="user-select: none"
        >标题：</el-text
      >
      <el-input
        class="input"
        ref="titleRef"
        v-model="form.title"
        style="width: 300px"
        placeholder="请输入文章标题"
      />
      <el-text class="text" @click="subTitleRef.focus()" size="large" style="user-select: none"
        >副标题：</el-text
      >
      <el-input
        class="input"
        ref="subTitleRef"
        v-model="form.subTitle"
        style="width: 300px"
        placeholder="请输入文章副标题"
      />
      <el-button plain class="button" type="primary" @click="dialogVisible = true">{{
        isEdit ? '提交修改' : '提交文章'
      }}</el-button>
    </div>
    <div class="editor">
      <WangEditor v-model="form.content" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="信息完善" width="500" class="dialog">
    <span>{{ isEdit ? '修改封面' : '上传封面' }}(可选)</span>
    <Upload :url="form.cover" @transURL="handleTransURL" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveOrEdit" :loading="uploading"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 20px;
}
.title {
  width: calc(100vw - 290px);
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.input {
  margin-right: 50px;
  width: 600px;
}
.button {
  margin-left: auto;
}
.editor {
  width: calc(100vw - 290px);
  height: calc(100vh - 200px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
