<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import type { LoginDTO } from '@/apis/AdminService/types';
import { loginApi } from '@/apis/AdminService';
import useAdminStore from '@/stores/admin';
const form = ref<LoginDTO>({
  account: '',
  password: '',
});
const adminStore = useAdminStore();
const loading = ref(false);
const formRef = ref();
const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const handleLogin = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      try {
        // 模拟登录请求
        // debugger;
        const res = await loginApi(form.value);
        if (res.data?.token) {
          ElMessage.success('登录成功');
          adminStore.setAdminInfo(res.data);
          router.push('/dashboard');
        } else {
          ElMessage.error(res.message);
        }
      } catch (e) {
        ElMessage.error('登录异常' + e);
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.warning('请填写完整的登录信息');
    }
  });
};
</script>

<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-card">
        <h1 class="login-title">登录</h1>
        <p class="login-subtitle">请输入您的用户名和密码登录</p>

        <el-form :model="form" ref="formRef" :rules="rules" class="login-form">
          <!-- 用户名输入框 -->
          <el-form-item prop="account">
            <el-input
              v-model="form.account"
              type="text"
              placeholder="请输入账号"
              :prefix-icon="User"
              clearable
              @keydown.enter="handleLogin"
            />
          </el-form-item>

          <!-- 密码输入框 -->
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
              clearable
              @keydown.enter="handleLogin"
            />
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              type="primary"
              class="login-button"
              :loading="loading"
              @click="handleLogin"
              block
            >
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a8d8ea 0%, #e1a7d9 50%, #a8e6d8 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -50px;
    right: -50px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    bottom: -100px;
    left: -100px;
  }
}

.login-wrapper {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.login-card {
  background: linear-gradient(180deg, #f0f9ff 0%, #fef6f9 100%);
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.login-title {
  font-size: 36px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 0 0 10px;
  letter-spacing: -0.5px;
}

.login-subtitle {
  font-size: 14px;
  color: #999;
  text-align: center;
  margin: 0 0 40px;
  font-weight: 400;
}

.login-form {
  margin-bottom: 20px;

  :deep(.el-form-item) {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.el-input__wrapper) {
    background: white;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:focus-within {
      box-shadow: 0 0 0 3px rgba(255, 155, 176, 0.1);
    }
  }

  :deep(.el-input__prefix) {
    color: #999;
  }

  :deep(.el-input__suffix) {
    color: #999;
    cursor: pointer;

    &:hover {
      color: $blogColor;
    }
  }
}

.login-button {
  background: linear-gradient(135deg, $blogColor 0%, #ff8fa3 100%);
  border: none;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 155, 176, 0.3);
  transition: all 0.3s ease;
  width: 100%;

  &:hover:not(.is-loading) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 155, 176, 0.4);
  }

  &:active:not(.is-loading) {
    transform: translateY(0);
  }

  :deep(.el-icon) {
    margin-right: 4px;
  }
}

.login-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  :deep(.el-link) {
    font-size: 14px;
  }

  :deep(.el-button) {
    background: linear-gradient(135deg, #a8e6d8 0%, #7dd3d3 100%);
    border: none;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 16px;
    box-shadow: 0 4px 12px rgba(122, 211, 211, 0.3);

    &:hover {
      background: linear-gradient(135deg, #94dccf 0%, #6bc9ca 100%);
      transform: translateX(2px);
      box-shadow: 0 6px 16px rgba(122, 211, 211, 0.4);
    }

    &:active {
      transform: translateX(0);
    }
  }
}

/* 响应式设计 */
@media (max-width: 600px) {
  .login-wrapper {
    padding: 10px;
  }

  .login-card {
    padding: 40px 25px;
  }

  .login-title {
    font-size: 28px;
  }

  .login-footer {
    flex-direction: column;
    align-items: stretch;

    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>
