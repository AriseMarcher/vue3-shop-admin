import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { IUserInfo } from '@/api/types/common'

// 声明 state 类型 供 vuex.d.ts 引入
export interface State {
  count: number
  isCollapse: boolean
  user: null | IUserInfo
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state: {
    count: 0,
    isCollapse: false,
    user: JSON.parse(window.localStorage.getItem('user') || 'null') as IUserInfo | null
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      window.localStorage.setItem('user', JSON.stringify(state.user))
      state.user = payload
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
