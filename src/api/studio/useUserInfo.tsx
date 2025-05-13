import api from '@/lib/api/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useCallback } from 'react';

interface GetUserInfoQuery {
  id: string;
}

interface getPodCastListParams {
  userId: string;
  page: number;
  limit: number;
}

interface UserInfoResponse {
  avatar?: string;
  nickname?: string;
  id: string;
}

const getUserInfo = async ({
  id,
}: GetUserInfoQuery): Promise<UserInfoResponse> => {
  try {
    const res = await api.get<UserInfoResponse>('/api/user', {
      params: { id },
    });
    return res;
  } catch (err: unknown) {
    throw new Error('获取用户信息失败');
  }
};
export const useUserInfo = (params: GetUserInfoQuery) => {
  const fetchUserInfo = useCallback(async () => getUserInfo(params), [params]);
  return useQuery<UserInfoResponse, Error>({
    queryKey: ['getUserInfo', params.id],
    queryFn: fetchUserInfo,
  });
};

const getPodCastList = async ({
  userId,
  page,
  limit,
}: getPodCastListParams): Promise<any> => {
  try {
    const res = await api.get<any>('/api/channel/list', {
      params: { userId, page, limit },
    });
    return res;
  } catch (err: unknown) {
    throw new Error('获取用户信息失败');
  }
};
export const usePodCastList = (
  params: getPodCastListParams,
  options?: UseQueryOptions<any, Error>,
) => {
  const fetchPodCastList = useCallback(
    async () => getPodCastList(params),
    [params],
  );
  return useQuery<any, Error>({
    queryKey: ['getPodCastList', params.userId, params.page, params.limit],
    queryFn: fetchPodCastList,
    ...options,
  });
};
