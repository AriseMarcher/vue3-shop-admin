<script setup lang='ts'>
import locale from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <div>
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
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
