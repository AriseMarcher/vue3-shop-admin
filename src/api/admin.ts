import request from '@/utils/request'
import { IListParams, IListResponse } from './types/admin'

export const getAdmins = (params: IListParams) => {
  return request<IListResponse>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}
