<template>
  <el-icon @click="setCollapse">
    <Fold v-show="isCollapse" />
    <Expand v-show="!isCollapse" />
  </el-icon>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/store/index'

const store = useStore()
const isCollapse = ref(store.state.isCollapse)

const setCollapse = () => {
  const expectVal = !store.state.isCollapse
  store.commit('setIsCollapse', expectVal)
  isCollapse.value = expectVal
}
</script>
