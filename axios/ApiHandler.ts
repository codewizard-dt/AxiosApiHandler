import { Axios, AxiosRequestConfig } from 'axios';

import { jsonRequest, jsonResponse, responseHandler } from "./HelperMethods";
import type { ApiResponse } from './Types';

export type AxiosPost = typeof Axios.prototype.post
export type AxiosGet = typeof Axios.prototype.get
export type AxiosDelete = typeof Axios.prototype.delete
export type AxiosPatch = typeof Axios.prototype.patch
export type ResponseInterceptor = Parameters<typeof Axios.prototype.interceptors.response.use>
export type RequestInterceptor = Parameters<typeof Axios.prototype.interceptors.request.use>

export class AxiosApi {
  private defaultConfig: AxiosRequestConfig = {
    responseType: 'json',
    transformRequest: jsonRequest,
    transformResponse: jsonResponse
  }
  private axios: Axios;
  constructor(config?: AxiosRequestConfig) {
    this.axios = new Axios({ ...this.defaultConfig, ...config })
  }

  async post<T>(...args: Parameters<AxiosPost>) {
    return this.axios.post<ApiResponse<T>>(...args).then(responseHandler<T>)
  }
  async get<T>(...args: Parameters<AxiosGet>) {
    return this.axios.get<ApiResponse<T>>(...args).then(responseHandler<T>)
  }
  async delete<T>(...args: Parameters<AxiosDelete>) {
    return this.axios.post<ApiResponse<T>>(...args).then(responseHandler<T>)
  }
  async patch<T>(...args: Parameters<AxiosPatch>) {
    return this.axios.post<ApiResponse<T>>(...args).then(responseHandler<T>)
  }

  addRequestInterceptor(...options: RequestInterceptor) {
    this.axios.interceptors.request.use(...options)
  }
  addResponseInterceptor(...options: ResponseInterceptor) {
    this.axios.interceptors.response.use(...options)
  }
}

