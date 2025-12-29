<script setup lang="ts">
import type { User } from '@/apis/UserService/types/index';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
import { sendRegisterEmailApi, loginApi, registerApi } from '@/apis/UserService/index';
import useUserStore from '@/stores/user';
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const registerForm = ref<User & { confirmPassword: string; exp: string }>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  exp: '',
});
const loginForm = ref({
  email: '',
  password: '',
});
const currentSwitch = ref('register');
const btnLoading = ref(false);
const emit = defineEmits(['update:modelValue']);
const userStore = useUserStore();
const handleRegister = () => {
  registerFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        btnLoading.value = true;
        const res = await registerApi(registerForm.value);
        if (res.code === 1) {
          ElMessage.success('注册成功，请登录');
          loginForm.value.email = registerForm.value.email;
          loginForm.value.password = registerForm.value.password;
          // 使用api清空表单
          registerFormRef.value.resetFields();
          currentSwitch.value = 'login';
        } else {
          ElMessage.error({
            message: res.message || '注册失败，请稍后重试',
            duration: 5000,
          });
          return;
        }
      } catch (error) {
        ElMessage.error('注册失败，请稍后重试');
        return;
      } finally {
        btnLoading.value = false;
      }
    }
  });
};
const handleLogin = () => {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        btnLoading.value = true;
        const res = await loginApi(loginForm.value);
        if (res.code === 1) {
          ElMessage.success('登录成功');
          userStore.setUserInfo(res.data);
          emit('update:modelValue', false);
          // 使用api清空表单
          loginFormRef.value.resetFields();
          window.location.reload();
        } else {
          ElMessage.error({
            message: res.message || '登录失败，请稍后重试',
            duration: 5000,
          });
          return;
        }
      } catch (error) {
        ElMessage.error('登录失败，请稍后重试');
        return;
      } finally {
        btnLoading.value = false;
      }
    }
  });
};
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: 'blur',
    },
  ],
  exp: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
    },
  ],
};
const registerFormRef = ref();
const loginFormRef = ref();
const contentOfSendExpBtn = ref('发送验证码');
const BtnDisable = ref(true);
watch(
  () => registerForm.value.email,
  () => {
    registerFormRef.value?.validateField('email').then(
      () => {
        BtnDisable.value = false;
      },
      () => {
        BtnDisable.value = true;
      },
    );
  },
);
const handleSendEmail = () => {
  let time = 59;
  ElMessage.success('验证码已发送');
  sendRegisterEmailApi(registerForm.value.email);
  contentOfSendExpBtn.value = `60秒后重发`;
  BtnDisable.value = true;
  setInterval(() => {
    if (time === 0) {
      contentOfSendExpBtn.value = '发送验证码';
      BtnDisable.value = false;
      return;
    } else {
      BtnDisable.value = true;
      contentOfSendExpBtn.value = `${time}秒后重发`;
      time--;
    }
  }, 1000);
};
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    width="500"
    @close="emit('update:modelValue', false)"
    title="欢迎光临"
  >
    <el-tabs stretch v-model="currentSwitch" type="border-card">
      <el-tab-pane label="注册" name="register">
        <el-form
          :model="registerForm"
          style="max-width: 600px"
          label-position="top"
          :rules="rules"
          ref="registerFormRef"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <div style="display: flex; width: 100%">
              <el-input v-model="registerForm.email" placeholder="请输入电子邮箱" />
              <el-button @click="handleSendEmail" :disabled="BtnDisable">{{
                contentOfSendExpBtn
              }}</el-button>
            </div>
          </el-form-item>
          <el-form-item label="验证码" prop="exp">
            <el-input v-model="registerForm.exp" placeholder="请输入验证码" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleRegister"
              style="margin-left: auto"
              :loading="btnLoading"
              >注册</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="loginForm"
          style="max-width: 600px"
          label-position="top"
          :rules="rules"
          ref="loginFormRef"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="请输入密码"
              @keydown.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleLogin"
              style="margin-left: auto"
              :loading="btnLoading"
              >登录</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
