import type { UserLoginVO } from '@/apis/UserService/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserLoginVO | null>(null);
    const setUserInfo = (info: UserLoginVO) => {
      console.log(info);

      userInfo.value = info;
    };
    const clearUserInfo = () => {
      userInfo.value = null;
    };
    const getUserInfo = (): UserLoginVO | null => {
      return userInfo.value;
    };
    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      getUserInfo,
    };
  },
  {
    persist: true,
  },
);
export default useUserStore;
