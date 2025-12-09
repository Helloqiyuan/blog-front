import http from '@/utils/request';

export const getRandomTips = (count: number) => {
  return http({
    url: '/tips/random',
    params: {
      count,
    },
  });
};
