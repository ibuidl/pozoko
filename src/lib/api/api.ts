/** 请求(必填)配置信息 */
export interface RequiredRequestOptions {
  /**
   * 具体 api 路径，
   * 一般为请求 api 后缀，如 `/api/get_etf_list`
   */
  url: string;
}

/** 请求(可选的)配置信息 */
export interface OptionalRequestOptions {
  baseUrl?: string;
  /** api query */
  params?: any;
  /** api body */
  data?: any;
  /** route locale */
  locale?: string;
}

export type CustomRequestOptions = RequiredRequestOptions &
  OptionalRequestOptions;

export type RequestInitOptions = Exclude<RequestInit, CustomRequestOptions>;

export type RequestOptions = RequestInitOptions & CustomRequestOptions;

// const BASE_URL = 'http://103.170.154.11:3000';
// const BASE_URL = '';
// const BASE_URL = 'http://45.139.227.189:3000';

interface ApiError extends Error {
  status?: number;
  statusText?: string;
}

export const request = <ResponseBody>({
  baseUrl,
  url,
  method,
  params,
  data,
  headers,
  ...options
}: RequestOptions): Promise<ResponseBody> => {
  let apiUrl = (baseUrl || '') + url;
  apiUrl += params ? `?${new URLSearchParams(params).toString()}` : '';
  const configs: RequestInit = {
    method: method || 'GET',
    body: data && JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...headers },
    ...options,
  };

  return fetch(apiUrl, configs).then(async (response) => {
    if (!response.ok) {
      const error = new Error('请求失败') as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    try {
      return await response.json();
    } catch (e) {
      const error = new Error('响应格式错误') as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }
  });
};

export type ApiRequestOptions = Omit<RequestOptions, 'url' | 'method'>;

const api = {
  get: <T>(url: string, options?: ApiRequestOptions) =>
    request<T>({ ...options, url, method: 'GET' }),
  post: <T>(url: string, options?: ApiRequestOptions) =>
    request<T>({ ...options, url, method: 'POST' }),
  put: <T>(url: string, options?: ApiRequestOptions) =>
    request<T>({ ...options, url, method: 'PUT' }),
  delete: <T>(url: string, options?: ApiRequestOptions) =>
    request<T>({ ...options, url, method: 'DELETE' }),
};

export default api;
