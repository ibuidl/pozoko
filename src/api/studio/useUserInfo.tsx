import api from '@/lib/api/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useCallback } from 'react';

interface GetUserInfoQuery {
  publicKey: string;
}

interface getPodCastListParams {
  userId: string;
  page: number;
  limit: number;
}

interface getEpisodesListParams {
  channelId: string;
  page: number;
  limit: number;
}

interface UserInfoResponse {
  avatar?: string;
  nickname?: string;
  id: string;
}

interface Podcast {
  id: string;
  avatar: string;
  name: string;
  description: string;
  symbol: string;
  created_at: string;
}

export interface Episode {
  id: string;
  name: string;
  symbol: string;
  metadata_cid: string;
  created_at: string;
  description: string | null;
  reward: string;
  fileSize: string;
  mimeType: string;
  duration: number | null;
  is_published: boolean;
  pubDate: string | null;
  channel_id: string;
  creator_id: string;
  play_count: string;
  tip_amount: string;
  tip_count: number;
}

const getUserInfo = async ({
  publicKey,
}: GetUserInfoQuery): Promise<UserInfoResponse> => {
  try {
    const res = await api.get<UserInfoResponse>('/api/user', {
      params: { publicKey },
    });
    return res;
  } catch (err: unknown) {
    throw new Error('获取用户信息失败');
  }
};
export const useUserInfo = (params: GetUserInfoQuery) => {
  const fetchUserInfo = useCallback(async () => getUserInfo(params), [params]);
  return useQuery<UserInfoResponse, Error>({
    queryKey: ['getUserInfo', params.publicKey],
    queryFn: fetchUserInfo,
  });
};

const getPodCastList = async ({
  userId,
  page,
  limit,
}: getPodCastListParams): Promise<Podcast[]> => {
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
  return useQuery<Podcast[], Error>({
    queryKey: ['getPodCastList', params.userId, params.page, params.limit],
    enabled: !!params.userId,
    queryFn: () => getPodCastList(params),
    ...options,
  });
};

const getChannelInfo = async (id: string) => {
  const res = await api.get<Podcast>('/api/channel', {
    params: { id },
  });

  return res;
};

export const useChannel = (id: string) => {
  return useQuery({
    queryKey: ['channel', id],
    enabled: !!id,
    queryFn: () => getChannelInfo(id),
  });
};

const getEpisodeList = async ({
  channelId,
  page,
  limit,
}: getEpisodesListParams) => {
  const res = await api.get<Episode[]>('/api/episode/list', {
    params: { channelId, page, limit },
  });
  return res;
};

export const useEpisodeList = (params: getEpisodesListParams) => {
  return useQuery({
    queryKey: ['episodesList', params.channelId, params.page, params.limit],
    enabled: !!params.channelId,
    queryFn: () => getEpisodeList(params),
  });
};
