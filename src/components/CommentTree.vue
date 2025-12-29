<script setup lang="ts">
import type { NoteComment, CommentNode } from '@/apis/NoteCommentService/types';
import { ref } from 'vue';
import { DistantFromNowAndDate } from '@/utils/utils';
import { addNoteCommentApi } from '@/apis/NoteCommentService';
import useUserStore from '@/stores/user';
import { ElMessage } from 'element-plus';

// 👇 递归组件必须有 name
defineOptions({
  name: 'CommentTree',
});
const props = defineProps<Props>();
const userStore = useUserStore();

interface Props {
  nodes: CommentNode<NoteComment>[];
}
// 本级评论区中的回复输入框显示状态
const showInput = ref<boolean[]>(Array(props.nodes.length).fill(false));
// 本级评论区中的回复折叠状态
const showReply = ref<boolean[]>(Array(props.nodes.length).fill(false));
const commentForm = ref<NoteComment>({
  noteId: 0,
  userId: -1,
  parentCommentId: 0,
  content: '',
});
/**
 * 回复评论
 * @param noteId 评论所属的随笔id
 * @param parentCommentId 评论所属的父级评论的id
 */
const send = async (noteId: number, parentCommentId: number) => {
  try {
    commentForm.value.noteId = noteId;
    commentForm.value.userId = userStore.getUserInfo()?.id as number;
    commentForm.value.parentCommentId = parentCommentId;
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
const deleteComment = async () => {
  ElMessage.info('正在开发中...');
};
</script>

<template>
  <div class="comment-tree">
    <div v-for="(node, index) in nodes" :key="index" class="comment-node">
      <!-- 评论内容 -->
      <div class="comment-content">
        <div class="comment-header">
          <span class="user">{{ node.e.username }}</span>
          <span class="time">{{ DistantFromNowAndDate(node.e?.createTime as string) }}</span>
          <el-button
            type="warning"
            v-if="node.e.userId === userStore.getUserInfo()?.id"
            @click="deleteComment"
            >删除</el-button
          >
        </div>
        <div class="comment-text">
          {{ node.e.content }}
        </div>
        <div class="func">
          <!-- 左侧的回复区域 -->
          <div class="reply" @click="showInput[index] = !showInput[index]">
            <img class="avatar" src="@/assets/reply.svg" />
            <span style="user-select: none">回复</span>
          </div>
          <!-- 右侧的展开回复按钮 -->
          <div
            class="more"
            v-if="node.children?.length > 0"
            @click="showReply[index] = !showReply[index]"
            v-rotate="showReply[index]"
          />
        </div>
        <div class="input" v-if="showInput[index]">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="沟通交流，拉近你我。"
            v-model="commentForm.content"
          />
          <el-button type="primary" @click="send(node.e.noteId, node.e.id as number)"
            >发送</el-button
          >
        </div>
      </div>

      <!-- 子评论 -->
      <div class="comment-children" v-if="node.children?.length && showReply[index]">
        <CommentTree :nodes="node.children" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-node {
  margin-top: 12px;
}

.comment-content {
  padding: 10px 12px;
  border-radius: 6px;
  background: #ececec;
}

.comment-header {
  font-size: 12px;
  color: black;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  .user {
    font-weight: normal;
    font-size: 22px;
    font-family: $fontFamily;
  }
}

.comment-text {
  font-size: 14px;
  color: #333;
}
.func {
  width: 100%;
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
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
  .more {
    display: block;
    width: 16px;
    height: 16px;
    border: none;
    cursor: pointer;
    background: url('@/assets/arrow-down.svg') no-repeat center;
    background-size: contain;
  }
}
.input {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.comment-children {
  margin-left: 24px;
  border-left: 2px solid #e4e6eb;
  padding-left: 12px;
}
</style>
