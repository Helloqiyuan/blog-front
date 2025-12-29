import http from '@/utils/request';
import type { Photo, PhotoType } from './types';
/**
 * 获取随机图片
 * @returns 随机图片对象
 */
export const getPhotoRandom = () => {
  return http<Photo>({
    url: '/common/photo/random',
  });
};
/**
 * 获取所有图片
 */
export const getPhotoList = () => {
  return http<Photo[]>({
    url: '/common/photo/all',
  });
};
/**
 * 根据id获取图片
 * @param id 图片id
 * @returns 图片对象
 */
export const getPhotoById = (id: number) => {
  return http<Photo>({
    url: '/manager/photo',
    params: { id },
  });
};
/**
 * 添加图片
 * @param data 图片对象
 * @returns 添加结果
 */
export const addPhoto = (data: Photo) => {
  return http({
    url: '/manager/photo',
    method: 'POST',
    data,
  });
};
/**
 * 修改图片
 * @param data 图片对象
 * @returns 修改结果
 */
export const updatePhoto = (data: Photo) => {
  return http({
    url: '/manager/photo',
    method: 'PUT',
    data,
  });
};
/**
 * 删除图片
 * @param id 图片id
 * @returns 删除结果
 */
export const deletePhoto = (id: number) => {
  return http({
    url: '/manager/photo',
    method: 'DELETE',
    params: { id },
  });
};
/**
 * 获取所有图片类型
 */
export const getPhotoTypeList = () => {
  return http<PhotoType[]>({
    url: '/common/photo/allType',
  });
};
/**
 * 获取指定类型的图片
 */
export const getPhotoListByType = (typeId: number) => {
  return http<Photo[]>({
    url: '/common/photo/type',
    params: { typeId },
  });
};
