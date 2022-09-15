<template>
  <app-dialog-form :title="formTitle">
    <span>内容</span>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  adminId: {
    type: Number as PropType<Number | null>,
    required: false
  }
})
const formTitle = computed(() => {
  return props.adminId ? '编辑管理员' : '添加管理员'
})
</script>

<style lang="scss" scoped></style>
