import http from '@/utils/request';

export const getPhotoRandom = () => {
  return http({
    url: '/photo/random',
  });
};
