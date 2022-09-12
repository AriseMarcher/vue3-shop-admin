<template>
  <el-container>
    <el-aside>
      <app-menu />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppMenu from './components/app-menu.vue'
import AppHeader from './AppHeader/index.vue'
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}

.el-aside {
  width: auto;
  background-color: #304156;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
