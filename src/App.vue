<script setup lang='ts'>
import { useStore } from '@/store'
import { getLoginInfo } from '@/api/common'
import { onMounted } from '@vue/runtime-core'

const store = useStore()
console.log(store)

onMounted(() => {
  getLoginInfo()
    .then(data => {
      console.log(data)
    })
})

</script>

<template>
  <div>
    <h1>hello</h1>
    <a
      href="https://vitejs.dev"
      target="_blank"
    >
      <img
        src="/vite.svg"
        class="logo"
        alt="Vite logo"
      >
    </a>
    <a
      href="https://vuejs.org/"
      target="_blank"
    >
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      >
    </a>
  </div>
</template>

<style lang="scss" scoped>

h1 {
  color: $color;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
