/**
 * 详细接口类型定义在: @/typescript/api-interface/*
 */

/**
 * 测试接口
 * @param params
 * @param options
 */
export function queryTestInfo(
  path: string,
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  const newpath = encodeURI(path)
  return $api.request(newpath, params, options)
}

/**
 * 测试接口-返回错误
 * @param params
 * @param options
 */
export function queryTestInfoError(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request('/demo/demo-test-error', params, options)
}

export function UserRegisterPost(
  path: string,
  params?: UserRegisterInfo.Params,
  options?: RequestOptions
): any {
  return $api.request(path, params, options)
}

export function UserLoginPost(path: string, params?: UserLoginInfo.Params, options?: RequestOptions): any {
  return $api.request(path, params, options)
}

export function SearchGet(path: string, params?: queryTestInfoUsingGET.Params, options?: RequestOptions): any {
  const newpath = encodeURI(path)
  return $api.request(newpath, params, options)
}

export function BookQueryGet(
  path: string,
  params?: BookDetailInfo.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  const newpath = encodeURI(path)
  return $api.request(newpath, params, options)
}
