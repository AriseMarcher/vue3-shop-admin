<template>
  <el-space
    direction="vertical"
    fill
    class="content-space"
    prefix-cls="content-space"
  >
    <slot />
  </el-space>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.content-space {
  display: flex;
  width: 100%;
  :deep(.content-space__item) {
    width: 100%;
  }
  :deep(.content-space__item:last-child) {
    padding-bottom: unset !important;
  }
}
</style>
