import http from '@/utils/request';
import type { FriendLink } from '@/apis/FriendLinkService/types';

/** 获取所有友链 */
export const getAllFriendLinkApi = () => {
  return http<FriendLink[]>({
    url: '/friendLink/all',
  });
};
/**
 * 获取启用的友链
 */
export const getEnableFriendLinkApi = () => {
  return http<FriendLink[]>({
    url: '/friendLink/enable',
  });
};

/** 根据 id 获取友链 */
export const getFriendLinkByIdApi = (id: number) => {
  return http<FriendLink>({
    url: '/friendLink',
    params: { id },
  });
};

/** 添加友链 */
export const insertFriendLinkApi = (friendLink: FriendLink) => {
  return http({
    url: '/friendLink',
    method: 'post',
    data: friendLink,
  });
};

/** 修改友链 */
export const updateFriendLinkApi = (friendLink: FriendLink) => {
  return http({
    url: '/friendLink',
    method: 'put',
    data: friendLink,
  });
};

/** 删除友链 */
export const deleteFriendLinkApi = (id: number) => {
  return http({
    url: '/friendLink',
    method: 'delete',
    params: { id },
  });
};
