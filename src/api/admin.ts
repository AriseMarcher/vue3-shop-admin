import request from '@/utils/request'
import {
  IListParams,
  IListResponse,
  IAdminPostData
} from './types/admin'

export const getAdmins = (params: IListParams) => {
  return request<IListResponse>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}

export const createAdmin = (data: IAdminPostData) => {
  return request({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}

export const updateAdmin = (
  id: number,
  data: IAdminPostData
) => {
  return request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}

export const deleteAdmin = (
  id: number
) => {
  return request({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}

export const updateAdminStatus = (
  id: number,
  status: number
) => {
  return request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })
}
