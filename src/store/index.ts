import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { IUserInfo } from '@/api/types/common'
import { getItem, setItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

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
    user: getItem<IUserInfo>(USER)
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      setItem(USER, JSON.stringify(state.user))
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
