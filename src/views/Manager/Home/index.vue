<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CommentTree from '@/components/CommentTree.vue';
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

    <div class="none" v-else>
      <div class="reply">
        <img class="avatar" src="@/assets/reply.svg" />
        <span style="user-select: none">回复</span>
      </div>
      <div class="empty">暂无评论</div>
    </div>
  </div>
</template>

<style scoped>
.comment-page {
  max-width: 700px;
  margin: 0 auto;
}
.none {
  width: 100%;
  height: max-content;
  .reply {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    .avatar {
      display: block;
      user-select: none;
      width: 16px;
      object-fit: contain;
    }
  }
}
.empty {
  color: #999;
  margin-top: 20px;
}
</style>
