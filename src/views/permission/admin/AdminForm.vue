<template>
  <el-dialog
    ref="dialog"
    :title="formTitle"
    width="30%"
    @closed="emit('update:admin-id', null)"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">
          Cancel
        </el-button>
        <el-button type="primary">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { IElDialog } from '@/types/element-plus'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'

const props = defineProps({
  adminId: {
    type: Number as PropType<Number | null>
  }
})
const formTitle = computed(() => {
  return props.adminId ? '编辑管理员' : '添加管理员'
})

interface EmitsType {
  (e: 'update:admin-id', value: number | null): void
}
const emit = defineEmits<EmitsType>()

const dialog = ref<IElDialog | null>(null)

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}
</script>

<style lang="scss" scoped></style>
