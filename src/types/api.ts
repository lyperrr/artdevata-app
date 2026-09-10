/** @format */

export interface ApiResponse<T> {
  status?: string;
  message?: string;
  data: T;
}

export type ApiResult<T> = T | ApiResponse<T>;
