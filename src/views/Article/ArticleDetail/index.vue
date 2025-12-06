<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getArticleByIdApi } from '@/apis/article';
const props = defineProps<{
  id: number;
}>();
const data = ref<string>();
const getArticle = async (id: number) => {
  console.log('getArticle', id);

  const res = await getArticleByIdApi(id);
  data.value = res.data.content;
};
onMounted(() => {
  if (props.id) {
    getArticle(props.id);
  }
});
</script>
<template>
  <div class="detail-content" v-html="data"></div>
</template>

<style scoped lang="scss">
.detail-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
