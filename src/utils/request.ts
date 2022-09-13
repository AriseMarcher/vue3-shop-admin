import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/index'

// baseURL: https://shop.fed.lagounews.com
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 控制登录过期的锁
let isRefreshing = false

// 请求拦截器

request.interceptors.request.use(function (config) {
  // 统一设置用户身份 token
  const user = store.state.user
  if (user && user.token) {
    config.headers!.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 请求响应器

request.interceptors.response.use(function (response) {
  const status = response.data.status

  // 正确的情况
  if (!status || status === 200) {
    return response
  }
  if (status === 410000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      store.commit('setUser', null)
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).finally(() => {
      isRefreshing = false
    })
    return Promise.reject(response)
  }

  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  // 手动返回一个 Promise 异常
  return Promise.reject(response.data)
}, function (error) {
  return Promise.reject(error)
})

export default <T>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
