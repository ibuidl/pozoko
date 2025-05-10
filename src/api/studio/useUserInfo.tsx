import api from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

interface GetUserInfoQuery {
  // 添加必要的查询参数类型
  id: string;
}

interface UserInfoResponse {
  avatar?: string;
  nickname?: string;
  id: string;
  // 其他用户信息字段
}

const getUserInfo = (params: GetUserInfoQuery) => {
  console.log('请求参数:', params);
  return api
    .get<UserInfoResponse>('/api/user', { params })
    .then((res) => {
      console.log('请求成功:', res);
      return res;
    })
    .catch((err) => {
      console.log('请求错误:', err);
      if (err.status === 404) {
        throw new Error('用户不存在');
      }
      throw new Error('获取用户信息失败');
    });
};

export const useUserInfo = (params: GetUserInfoQuery) => {
  console.log('useUserInfo 参数:', params);
  const fetchUserInfo = useCallback(() => {
    console.log('fetchUserInfo 被调用');
    return getUserInfo({ ...params });
  }, [params]);

  return useQuery<UserInfoResponse, Error>({
    queryKey: ['getUserInfo', params.id],
    queryFn: fetchUserInfo,
  });
};
