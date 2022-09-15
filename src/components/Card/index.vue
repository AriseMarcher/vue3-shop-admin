<template>
  <el-card>
    <template #header>
      <el-space wrap>
        <slot name="header" />
      </el-space>
    </template>
    <el-space
      direction="vertical"
      alignment="flex-end"
      class="content-space"
      prefix-cls="content-space"
    >
      <slot />
    </el-space>
  </el-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.content-space {
  display: flex;
  width: 100%;
  :deep(.content-space__item) {
    width: 100%;
  }
}
</style>
