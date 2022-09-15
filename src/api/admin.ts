import request from '@/utils/request'
import {
  IListParams,
  IListResponse,
  IAdminPostData
} from './types/admin'
import { IFormData } from '@/api/types/form'

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

// 获取管理员的角色列表
export const getRoles = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/setting/admin/create'
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options
    }
    return []
  })
}

// 获取编辑管理员下的数据
export const getAdmin = (id: number) => {
  return request<IFormData>({
    method: 'GET',
    url: `/setting/admin/${id}/edit`
  }).then(data => {
    console.log(data)
    const result: Record<string, any> = {}
    data.rules.forEach(item => {
      result[item.field] = item.value
    })
    return result as IAdminPostData
  })
}
