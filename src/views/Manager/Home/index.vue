<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CommentTree from '../../../components/CommentTree.vue';
import { getNoteCommentByNoteIdApi } from '@/apis/NoteCommentService';
import type { CommentNode, NoteComment } from '@/apis/NoteCommentService/types';

const commentTree = ref<CommentNode<NoteComment>[]>([]);

onMounted(async () => {
  const res = await getNoteCommentByNoteIdApi(1);
  commentTree.value = res.data.children;
});
</script>
<template>
  <div class="comment-page">
    <h2>评论区</h2>

    <CommentTree v-if="commentTree.length" :nodes="commentTree" />

    <div v-else class="empty">暂无评论</div>
  </div>
</template>

<style scoped>
.comment-page {
  max-width: 700px;
  margin: 0 auto;
}

.empty {
  color: #999;
  margin-top: 20px;
}
</style>
