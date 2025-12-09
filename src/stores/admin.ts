import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LoginVO } from '@/apis/AdminService/types/index';
const useAdminStore = defineStore(
  'admin',
  () => {
    const adminInfo = ref<LoginVO | null>(null);
    const getAdminInfo = () => {
      return adminInfo.value;
    };
    return {
      adminInfo,
      getAdminInfo,
    };
  },
  {
    persist: true,
  },
);
export default useAdminStore;
