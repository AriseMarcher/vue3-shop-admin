/**
 * 公共基础接口封装
 */

import request from '@/utils/request'
import {
  ILoginInfo,
  ILoginResponse
} from './types/common'

export const getILoginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob'
  })
}

export const login = (data: {
  account: string
  pwd: string
  imgcode: string
}) => {
  return request<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data
  })
}

export const logout = () => {
  return request({
    method: 'GET',
    url: '/setting/admin/logout'
  })
}
