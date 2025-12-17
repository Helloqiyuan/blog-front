<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import { User, EditPen, Message, Document } from '@element-plus/icons-vue';
</script>

<template>
  <div class="about-content">
    <Banner>
      <template #title>关于</template>
      <template #subtitle>希望有些事情可以自己解决，不是我自己，是事情自己。</template>
    </Banner>
    <div class="about-mine">
      <img class="avatar" src="@/assets/images/img.jpg" alt="" />
      <div class="information">
        <div class="item">
          <el-icon><User /></el-icon>Helloqiyuan
        </div>
        <div class="item">
          <el-icon><EditPen /></el-icon>学生
        </div>
        <div class="item">
          <el-icon><Message /></el-icon>3302663850@qq.com
        </div>
        <div class="item">
          <el-icon><Document /></el-icon>一个正在努力学习的程序员(这句话由AI生成)
        </div>
      </div>
    </div>
    <div class="about-website">
      <h1>关于本站</h1>
      <span
        >前端：<strong>Vue3</strong> + <strong>Vite</strong> +
        <strong>Element Plus</strong
        >，后端：<strong>Java</strong>，数据库：<strong>MySQL</strong>；阿里云服务器。</span
      >
      <span
        >本站的编写纯属个人兴趣爱好，前后端均独立完成；主要用来记录自己工作、生活、学习上的笔记。</span
      >
      <span>本站前端代码，未考虑IE等低版本浏览器的兼容性。暂时未适配移动端。</span>
      <span>本站发布的文章或其他信息如有侵权，请邮箱联系我及时删除，感谢！</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-content {
  width: 100%;
  min-height: 100vh;
  height: max-content;
  padding: 20px;
  background-color: $backColor;
}
.about-mine {
  display: flex;

  width: 100%;
  margin-top: 20px;
  height: 140px;
  padding: 20px;
  background-color: $boxColor;
  box-shadow: $boxShadow;
  border-radius: $radius;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 6px;
  }
  .information {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    height: 100%;
    color: $fontColor;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      font-family: $fontFamily;
      gap: 8px;
    }
  }
}
.about-website {
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  height: 100%;
  background-color: $boxColor;
  box-shadow: $boxShadow;
  border-radius: $radius;
  color: $fontColor;
  h1 {
    border-left: 5px solid $blogColor;
    padding-left: 10px;
    font-family: $fontFamily;
    font-weight: normal;
  }
  span {
    display: block;
    margin: 20px 0;
    strong {
      color: $blogColor;
    }
  }
}
</style>
