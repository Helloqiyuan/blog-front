<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { ref, shallowRef, onBeforeUnmount, watch } from 'vue';
// @ts-expect-error 忽略导入检查
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type { IEditorConfig, IDomEditor } from '@wangeditor/editor';
import useAdminStore from '@/stores/admin';
const adminStore = useAdminStore();
const mode = 'default';
const toolbarConfig = {};
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
/**
 * 为什么还要搞一个content？
 * 因为组件上用的v-model所以得搞一个响应式对象
 * props只可读
 */
const content = ref('');
/**
 * 为什么用watch 因为那边传过来的数据是从服务器来的 有点慢
 */
watch(
  () => props.modelValue,
  (newValue) => {
    content.value = newValue;
  },
);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {},
};
// @ts-expect-error 忽略属性不存在
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/article/upload',
  fieldName: 'file',
  maxFileSize: 5 * 1024 * 1024, // 5M
  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 10,
  allowedFileTypes: ['image/*'],
  // 跨域是否传递 cookie ，默认为 false
  withCredentials: true,
  timeout: 10 * 1000, // 10 秒
  headers: {
    Authorization: `Bearer ${adminStore.getAdminInfo()?.token}`,
  },
  // 上传之前触发
  onBeforeUpload(file: File) {
    console.log('上传前触发钩子。。。');
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
// @ts-expect-error 忽略属性不存在
editorConfig.MENU_CONF['uploadVideo'] = {
  server: '/api/article/upload',
  fieldName: 'file',
  maxFileSize: 100 * 1024 * 1024, // 100M
  maxNumberOfFiles: 3,
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['video/*'],
  // 跨域是否传递 cookie ，默认为 false
  withCredentials: true,
  // 超时时间，默认为 10 秒
  timeout: 600 * 1000, // 10min
  headers: {
    Authorization: `Bearer ${adminStore.getAdminInfo()?.token}`,
  },
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
const handleCreated = (editor: Editor) => {
  editorRef.value = editor;
};
const handleChange = (editor: IDomEditor) => {
  emit('update:modelValue', editor.getHtml() === '<p><br></p>' ? '' : editor.getHtml());
};
// 销毁实例
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
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
    @onChange="handleChange"
    v-model="content"
    :defaultConfig="editorConfig"
    :mode="mode"
    @onCreated="handleCreated"
  />
</template>

<style scoped lang="scss"></style>
