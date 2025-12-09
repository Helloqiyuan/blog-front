import http from '@/utils/request';
export const uploadFileApi = (file: File) => {
  return http({
    url: '/upload',
    method: 'POST',
    data: {
      file,
    },
  });
};
