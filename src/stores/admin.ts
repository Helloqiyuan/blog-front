import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LoginVO } from '@/apis/AdminService/types/index';
const useAdminStore = defineStore(
  'admin',
  () => {
    const adminInfo = ref<LoginVO | null>(null);
    const getAdminInfo = (): LoginVO | null => {
      return adminInfo.value;
    };
    const setAdminInfo = (info: LoginVO) => {
      adminInfo.value = info;
    };
    const clearAdminInfo = () => {
      adminInfo.value = null;
    };
    return {
      adminInfo,
      setAdminInfo,
      getAdminInfo,
      clearAdminInfo,
    };
  },
  {
    persist: true,
  },
);
export default useAdminStore;
