<template>
  <h1>登录页面</h1>
</template>

<script setup lang="ts">
import { getLoginInfo } from '@/api/common'
import type { LoginInfo } from '@/api/types/common'
import { onMounted, ref } from '@vue/runtime-core'
const list = ref<LoginInfo['slide']>([])

onMounted(() => {
  getLoginInfo()
    .then(data => {
      console.log(data)
      list.value = data.slide
      console.log(list.value)
    })
})
</script>

<style>

</style>
