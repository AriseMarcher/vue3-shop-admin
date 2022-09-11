import axios from 'axios'

// baseURL: https://shop.fed.lagounews.com
const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api/admin'
})

// 请求拦截器

request.interceptors.request.use(function (config) {
  // 统一设置用户身份 token
  return config
}, function (error) {
  return Promise.reject(error)
})

// 请求响应器

request.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，比如 token 过期无效、服务端异常等
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request