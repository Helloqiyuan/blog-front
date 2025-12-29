<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CommentTree from '@/components/CommentTree.vue';
import { getNoteCommentByNoteIdApi } from '@/apis/NoteCommentService';
import type { CommentNode, NoteComment } from '@/apis/NoteCommentService/types';
import { addNoteCommentApi } from '@/apis/NoteCommentService';
import useUserStore from '@/stores/user';
import { ElMessage } from 'element-plus';

const commentTree = ref<CommentNode<NoteComment>[]>([]);
const props = defineProps(['noteId']);
const showInput = ref(false);
const userStore = useUserStore();
const commentForm = ref<NoteComment>({
  noteId: 0,
  userId: -1,
  parentCommentId: 0,
  content: '',
});
/**
 * 回复评论
 */
const send = async () => {
  try {
    commentForm.value.noteId = props.noteId;
    commentForm.value.userId = userStore.getUserInfo()?.id as number;
    // 根评论，parentCommentId设为-1
    commentForm.value.parentCommentId = -1;
    const res = await addNoteCommentApi(commentForm.value);
    if (res.code === 1) {
      commentForm.value = {
        noteId: 0,
        userId: -1,
        parentCommentId: 0,
        content: '',
      };
      ElMessage.success('评论发送成功');
      window.location.reload();
    } else {
      ElMessage.error(res.message || '评论发送失败，请稍后重试');
    }
  } catch (error) {
    ElMessage.error(error || '评论发送失败，请稍后重试');
  }
};
onMounted(async () => {
  const res = await getNoteCommentByNoteIdApi(props.noteId);
  commentTree.value = res.data.children;
});
</script>

<template>
  <div class="comment">
    <h3>评论</h3>
    <CommentTree v-if="commentTree.length" :nodes="commentTree" />
    <div class="none" v-else>
      <div class="reply" @click="showInput = !showInput">
        <img class="avatar" src="@/assets/reply.svg" />
        <span style="user-select: none">回复</span>
      </div>
      <div class="input" v-if="showInput">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="沟通交流，拉近你我。"
          v-model="commentForm.content"
        />
        <el-button type="primary" @click="send">发送</el-button>
      </div>
      <div class="empty">暂无评论</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment {
  // max-width: 700px;
  width: 100%;
  margin: 0 auto;
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
}
</style>
