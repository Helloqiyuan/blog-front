<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Banner from '@/components/Banner.vue';
import { getAllNoteListApi } from '@/apis/NoteService';
import type { Note } from '@/apis/NoteService/types';
const noteList = ref<Note[]>([]);
const getNoteList = async () => {
  const res = await getAllNoteListApi();
  noteList.value = res.data;
};
onMounted(() => {
  getNoteList();
});
</script>

<template>
  <div class="note-content">
    <Banner>
      <template #title>随笔一记</template>
      <template #subtitle>放假买个地球仪吧，世界那么大你不但可以看看，还可以转转。</template>
    </Banner>
    <div class="note-list">
      <div class="note-item" v-scale v-for="note in noteList" :key="note.id">
        <div class="aside">
          <img src="@/assets/circle.svg" class="bread-crumb" alt="circle" />
          <div class="line"></div>
        </div>
        <div class="main">
          <div class="note-header">
            <img class="note-avatar" src="@/assets/images/img.jpg" alt="" />
            <div class="note-publisher-info">
              <h3 class="note-nickname">Helloqiyuan</h3>
              <div class="note-create-time">{{ note.createTime }}</div>
            </div>
          </div>
          <div class="note-body">
            <div class="note-title">{{ note.typeName }}</div>
            <div class="note-detail">
              <img class="note-point" src="@/assets/point.svg" alt="point" />
              {{ note.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.note-content {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: $backColor;
}
.note-list {
  margin-top: 20px;
  width: 100%;
  height: max-content;
  border-radius: $radius;
  background-color: $boxColor;
  box-shadow: $boxShadow;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.note-item {
  width: 100%;
  height: max-content;
  display: flex;
  transition: all 1s ease-in-out;
  .aside {
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bread-crumb {
      width: 20px;
      height: 20px;
    }
    .line {
      align-self: start;
      width: 25px;
      flex: 1;
      border-right: 3px solid #dbdbdf;
    }
  }
  .main {
    flex: 1;
    .note-header {
      display: flex;
      gap: 10px;
      .note-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .note-publisher-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .note-nickname {
          font-family: $fontFamily;
        }
        .note-create-time {
          font-family: $fontFamily;
        }
      }
    }
    .note-body {
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin: 20px 0;
      background-color: #fafafc;
      .note-title {
        border-left: 5px solid #35b378;
        padding: 10px 10px 10px 15px;
        background-color: #ececec;
      }
      .note-detail {
        padding: 20px 0 0 15px;
        display: flex;
        align-items: center;
        .note-point {
          width: 8px;
          height: 8px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
