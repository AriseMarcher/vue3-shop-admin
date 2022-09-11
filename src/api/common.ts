/**
 * 公共基础接口封装
 */

import request from '@/utils/request'

// interface ResponseData<T> {
//   status: number
//   msg: string
//   data: T
// }

interface loginInfo {
  logo_square: string
  login_rectangle: string
  login_logo: string
  slide: string[]
}

export const getLoginInfo = () => {
  return request<loginInfo>({
    method: 'GET',
    url: '/login/info'
  })

  // return request.get<{
  //   status: number
  //   msg: string
  //   data: {
  //     logo_square: string
  //     login_rectangle: string
  //     login_logo: string
  //     slide: string[]
  //   }
  // }>('/login/info')
  // return request.get<ResponseData<loginInfo>>('/login/info')
}
