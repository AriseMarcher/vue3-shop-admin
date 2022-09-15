<template>
  <el-dialog
    ref="dialog"
    width="50%"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="emit('confirm')"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { IElDialog } from '@/types/element-plus'
import { ref } from 'vue'

const dialog = ref<IElDialog | null>(null)

interface EmitsType {
  (e: 'confirm'): void
}
const emit = defineEmits<EmitsType>()

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}
</script>

<style lang="scss" scoped></style>
