<script setup lang="ts">
import type { NoteComment, CommentNode } from '@/apis/NoteCommentService/types';

// 👇 递归组件必须有 name
defineOptions({
  name: 'CommentTree',
});

interface Props {
  nodes: CommentNode<NoteComment>[];
}

defineProps<Props>();
</script>

<template>
  <div class="comment-tree">
    <div v-for="node in nodes" :key="node.e.id" class="comment-node">
      <!-- 评论内容 -->
      <div class="comment-content">
        <div class="comment-header">
          <span class="user">用户 {{ node.e.userId }}</span>
          <span class="time">{{ node.e.createTime }}</span>
        </div>
        <div class="comment-text">
          {{ node.e.content }}
        </div>
      </div>

      <!-- 子评论 -->
      <div class="comment-children" v-if="node.children?.length">
        <CommentTree :nodes="node.children" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-node {
  margin-top: 12px;
}

.comment-content {
  padding: 10px 12px;
  border-radius: 6px;
  background: #f6f7f8;
}

.comment-header {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
}

.comment-text {
  font-size: 14px;
  color: #333;
}

.comment-children {
  margin-left: 24px;
  border-left: 2px solid #e4e6eb;
  padding-left: 12px;
}
</style>
