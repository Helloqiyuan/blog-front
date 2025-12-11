import http from '@/utils/request';
/**
 * 文件上传接口
 * @param file 要上传的文件对象
 * @returns 上传接口的响应结果
 */
export const uploadFileApi = (file: File) => {
  return http({
    url: '/upload',
    method: 'POST',
    data: {
      file,
    },
  });
};
