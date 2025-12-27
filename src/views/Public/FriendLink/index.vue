<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import Block from '@/components/Block.vue';
import { range } from '@/utils/utils';
import { Close, Check, User, Link, Picture, ChatLineSquare } from '@element-plus/icons-vue';
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FriendLink } from '@/apis/FriendLinkService/types';
import { insertFriendLinkApi, getEnableFriendLinkApi } from '@/apis/FriendLinkService';

const showApplyDialog = ref(false);
const applyForm = reactive<FriendLink>({
  name: '',
  url: '',
  img: '',
  description: '',
  authorEmail: '',
});
const friendList = ref<FriendLink[]>();

const getFriendList = async () => {
  const res = await getEnableFriendLinkApi();
  friendList.value = res.data;
};

const formRef = ref();
const isSubmiting = ref(false);
const loading = ref(false);

const rules = {
  name: [{ required: true, message: '请填写网站名称', trigger: 'blur' }],
  authorEmail: [{ required: true, type: 'email', message: '请填写有效邮箱', trigger: 'blur' }],
  url: [{ required: true, message: '请输入网站地址', trigger: 'blur' }],
  description: [{ required: true, message: '请输入网站描述', trigger: 'blur' }],
  img: [{ required: true, message: '请上传网站图标', trigger: 'blur' }],
};

const openDialog = () => {
  showApplyDialog.value = true;
};

const closeDialog = () => {
  showApplyDialog.value = false;
  if (formRef.value && formRef.value.clearValidate) {
    formRef.value.clearValidate();
  }
};

const resetForm = () => {
  applyForm.name = '';
  applyForm.url = '';
  applyForm.img = '';
  applyForm.description = '';
  applyForm.authorEmail = '';
  if (formRef.value && formRef.value.resetFields) {
    formRef.value.resetFields();
  }
};

const submitApply = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      isSubmiting.value = true;
      try {
        const res = await insertFriendLinkApi(applyForm);
        if (res.code === 1) {
          ElMessage.success('申请成功');
          closeDialog();
          resetForm();
        } else {
          ElMessage.error(res.message);
        }
      } catch (e) {
        ElMessage.error('申请异常' + e);
      } finally {
        isSubmiting.value = false;
      }
    }
  });
};
onMounted(async () => {
  loading.value = true;
  await getFriendList();
  loading.value = false;
});
</script>

<template>
  <div
    class="friend-link-content"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    element-loading-text="正在全力加载中..."
  >
    <Banner>
      <template #title>友情链接</template>
      <template #subtitle>如果你去抢银行，不论成功还是失败，未来十年内你都不用再上班。</template>
    </Banner>
    <Block class="friend-link-explain">
      <template #title>友链说明 </template>
      <template #content>
        <div class="sub-title">
          <span
            >经常宕机 <el-icon><Close /></el-icon
          ></span>
          <span
            >不合法规<el-icon><Close /></el-icon
          ></span>
          <span
            >擦边球站 <el-icon><Close /></el-icon
          ></span>
          <span
            >红标报毒<el-icon><Close /></el-icon
          ></span>
          <span
            >原创优先<el-icon><Check /></el-icon
          ></span>
          <span
            >技术优先<el-icon><Check /></el-icon
          ></span>
          <el-button type="primary" plain class="apply-friend-link" @click="openDialog"
            >申请友链</el-button
          >
        </div>
        <div class="require">
          <span>
            <el-icon><User /></el-icon>名称：Helloqiyuan</span
          >
          <span
            ><el-icon><Link /></el-icon>网址：https://yuanshen.icu</span
          >
          <span
            ><el-icon><Picture /></el-icon
            >图标：https://qiyuan-cloud-data.oss-cn-guangzhou.aliyuncs.com/pinkavatar.jpg</span
          >
          <span>
            <el-icon><ChatLineSquare /></el-icon>描述：这个人很简单，没什么好说的</span
          >
        </div>
        <span class="tips">
          温馨提示：本站友链随机排列，不定时清除失效友链，如恢复正常可留言或重新申请友链。
        </span>
      </template>
    </Block>
    <div class="friend-link-list">
      <a
        class="friend-link-item"
        v-for="item in friendList"
        :key="item.id"
        :href="item.url"
        target="_blank"
      >
        <div class="main">
          <img :src="item.img" alt="" />
          {{ item.name }}
        </div>
        <div class="description">{{ item.description }}</div>
      </a>
    </div>
    <el-dialog v-model="showApplyDialog" title="申请友链" width="600px" @close="closeDialog">
      <el-form :model="applyForm" label-width="90px" :rules="rules" ref="formRef">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="applyForm.name" maxlength="60" placeholder="请输入网站名称" />
        </el-form-item>
        <el-form-item label="联系邮箱" prop="authorEmail">
          <el-input
            v-model="applyForm.authorEmail"
            placeholder="审核结果将通过邮箱发送给您（邮箱不对外使用)"
          />
        </el-form-item>
        <el-form-item label="网站网址" prop="url">
          <el-input
            v-model="applyForm.url"
            placeholder="请输入网站地址(http://或https://)"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站图标" prop="img">
          <el-input
            v-model="applyForm.img"
            placeholder="请输入网站图标地址(http://或https://)"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站描述" prop="description">
          <el-input
            v-model="applyForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入网站描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitApply" :loading="isSubmiting">提 交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.friend-link-content {
  width: 100%;
  min-height: 100vh;
  height: max-content;
  padding: 20px;
  background-color: $backColor;
}
.friend-link-explain {
  font-family: $fontFamily;
  .sub-title {
    display: flex;
    gap: 10px;
    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .apply-friend-link {
      margin-left: auto;
    }
  }
  .require {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    span {
      display: flex;
      align-items: center;
      .el-icon {
        margin-right: 5px;
      }
    }
  }

  .tips {
    display: block;
    font-size: 15px;
    margin-top: 20px;
    color: $lightFontColor;
  }
}
.friend-link-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
  .friend-link-item {
    background-color: $boxColor;
    width: calc(25% - 7.5px);
    height: 140px;
    border-radius: $radius;
    box-shadow: $boxShadow;
    padding: 20px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    color: black;
    .main {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        display: block;
        width: 45px;
        border-radius: $radius;
      }
    }
    .description {
      display: block;
      font-size: 16px;
      margin-top: 8px;
      font-family: $fontFamily;
    }
    &:hover {
      box-shadow: $boxShadowHover;
    }
  }
}
</style>
