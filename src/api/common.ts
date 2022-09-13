/**
 * 公共基础接口封装
 */

import request from '@/utils/request'
import {
  LoginInfo
} from './types/common'

export const getLoginInfo = () => {
  return request<LoginInfo>({
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
