import { AxiosResponse } from "axios"

export interface ApiResponseError {
  error?: any,
  errors?: { [key: string]: any }
}

export type RawResponse<T> = AxiosResponse<T & ApiResponseError>

export type ApiResponse<T> = T & ApiResponseError