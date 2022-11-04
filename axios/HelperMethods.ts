
import { AxiosRequestTransformer, AxiosResponseTransformer } from "axios"
import { ApiResponseError, RawResponse } from "./Types"

/**
 * 
 * @param data request data
 * @param headers request headers
 * @returns 
 */
export const jsonRequest: AxiosRequestTransformer = (data, headers) => {
  if (typeof data !== 'string') {
    /**
     * Parses the data and sets a header if data is not a string
     */
    data = JSON.stringify(data)
    headers.setContentType('application/json')
  }
  return data
}

/**
 * 
 * @param data response data
 * @param headers response headers
 * @returns properly parsed data
 */
export const jsonResponse: AxiosResponseTransformer = (data, headers) => {
  try {
    data = JSON.parse(data)
    return data
  } catch (error) {
    return data
  }
}

/**
 * 
 * @param response the raw AxiosResponse which contains a `data` property
 * @returns Just the data, properly typed as T | {error, errors}
 */
export function responseHandler<T = unknown>({ data }: RawResponse<T>): T | ApiResponseError {
  return data
}
