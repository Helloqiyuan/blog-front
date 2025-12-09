<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
// @ts-expect-error 忽略导入检查
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type { Article } from '@/apis/ArticleService/types';
import { getArticleByIdApi, uploadArticleApi, updateArticleApi } from '@/apis/ArticleService';
import type { IEditorConfig } from '@wangeditor/editor';
import { ElMessage } from 'element-plus';
import Upload from '@/components/Upload.vue';
import router from '@/router';
const props = defineProps<{
  id: string;
}>();
const isEdit = ref(false);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const titleRef = ref();
const subTitleRef = ref();
// 对话框显示与否
const dialogVisible = ref(false);
const form = ref<Article>({
  title: '',
  subTitle: '',
  cover: '',
  content: '',
});

const mode = 'default';
const toolbarConfig = {};
// 文章是否在上传
const uploading = ref(false);
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {},
  // 其他属性...
};
// @ts-expect-error 忽略属性不存在
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/article/upload',
  fieldName: 'file',
  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 5 * 1024 * 1024, // 5M
  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 10,
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],
  // 跨域是否传递 cookie ，默认为 false
  withCredentials: true,
  // 超时时间，默认为 10 秒
  timeout: 10 * 1000, // 10 秒
  // 上传之前触发
  onBeforeUpload(file: File) {
    console.log('上传前触发钩子。。。');
    // file 选中的文件，格式如 { key: file }
    return file;
  },

  // 上传进度的回调函数
  onProgress(progress: number) {
    // progress 是 0-100 的数字
    console.log('progress', progress);
  },

  // 单个文件上传成功之后
  onSuccess(file: File, res: any) {
    console.log(`${file.name} 上传成功`, res);
  },

  // 单个文件上传失败
  onFailed(file: File, res: any) {
    console.log(`${file.name} 上传失败`, res);
  },

  // 上传错误，或者触发 timeout 超时
  onError(file: File, err: any, res: any) {
    console.log(`${file.name} 上传出错`, err, res);
  },
};

// 创建事件
const handleCreated = (editor: unknown) => {
  editorRef.value = editor;
};
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
const handleTransURL = (url: string) => {
  console.log('father', url);
  form.value.cover = url;
};
onMounted(async () => {
  if (props.id) {
    isEdit.value = true;
    const res = await getArticleByIdApi(props.id);
    form.value = res.data;
  }
});
// 销毁实例
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
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
      <Toolbar
        style="border: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="
          height: 100%;
          min-height: 500px;
          overflow-y: hidden;
          border: 1px solid #ccc;
          border-top: none;
        "
        v-model="form.content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="信息完善" width="500" class="dialog">
    <span>{{ isEdit ? '修改封面' : '上传封面' }}</span>
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
  height: calc(100vh - 200px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
