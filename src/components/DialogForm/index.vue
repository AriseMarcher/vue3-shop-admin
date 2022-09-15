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
          @click="handleConfirm"
          :loading="confirmLoading"
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
import type { PropType } from 'vue'

const dialog = ref<IElDialog | null>(null)

const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})

const confirmLoading = ref(false)

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}
const handleConfirm = async () => {
  confirmLoading.value = true
  await props.confirm()
  confirmLoading.value = false
}
</script>

<style lang="scss" scoped></style>
