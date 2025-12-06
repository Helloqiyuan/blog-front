<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
//@ts-expect-error 忽略导入检查
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type { Article } from './types';
import { uploadArticleApi } from '@/apis/article';
import type { IEditorConfig } from '@wangeditor/editor';
import { ElMessage } from 'element-plus';
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const titleRef = ref();
const form = ref<Article>({
  title: '',
  subTitle: '',
  content: '',
});

const toolbarConfig = {};
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {},
  // 其他属性...
};
// @ts-expect-error 忽略属性不存在
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/upload/articlePicture',
  // 后端期望的字段名为 'file'
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

    // TS 语法
    // onBeforeUpload(file) {    // JS 语法
    // file 选中的文件，格式如 { key: file }
    return file;

    // 可以 return
    // 1. return file 或者 new 一个 file ，接下来将上传
    // 2. return false ，不上传这个 file
  },

  // 上传进度的回调函数
  onProgress(progress: number) {
    // TS 语法
    // onProgress(progress) {       // JS 语法
    // progress 是 0-100 的数字
    console.log('progress', progress);
  },

  // 单个文件上传成功之后
  onSuccess(file: File, res: any) {
    // TS 语法
    // onSuccess(file, res) {          // JS 语法
    console.log(`${file.name} 上传成功`, res);
  },

  // 单个文件上传失败
  onFailed(file: File, res: any) {
    // TS 语法
    // onFailed(file, res) {           // JS 语法
    console.log(`${file.name} 上传失败`, res);
  },

  // 上传错误，或者触发 timeout 超时
  onError(file: File, err: any, res: any) {
    // TS 语法
    // onError(file, err, res) {               // JS 语法
    console.log(`${file.name} 上传出错`, err, res);
  },
};

const mode = 'default';

// 创建事件
const handleCreated = (editor: unknown) => {
  editorRef.value = editor;
};
/* 点击保存上传服务器 */
const save = async () => {
  if (!form.value.title || !form.value.subTitle || !form.value.content) {
    ElMessage.error('请填写完整信息');
    return;
  }
  const res = await uploadArticleApi(form.value);
  if (res.code === 1) {
    ElMessage.success('提交成功');
  } else {
    ElMessage.error('提交失败');
  }
};

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
      <el-text class="text" @click="titleRef.focus()" style="user-select: none">标题：</el-text>
      <el-input
        class="input"
        ref="titleRef"
        v-model="form.title"
        style="width: 300px"
        placeholder="请输入文章标题"
      />
      <el-text class="text" @click="titleRef.focus()" style="user-select: none">副标题：</el-text>
      <el-input
        class="input"
        ref="titleRef"
        v-model="form.subTitle"
        style="width: 300px"
        placeholder="请输入文章副标题"
      />
      <el-button class="button" type="primary" @click="save">提交</el-button>
    </div>
    <div class="editor">
      <Toolbar
        style="border: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden; border: 1px solid #ccc; border-top: none"
        v-model="form.content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
