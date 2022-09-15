<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    :page-sizes="[10, 30, 50, 100]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="listCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
interface PropsType {
  page: number
  limit: number
  listCount: number
  loadList: () => void
}

const props = withDefaults(defineProps<PropsType>(), {
  page: 1,
  limit: 10,
  listCount: 0,
  loadList: () => {}
})

// const props = defineProps({
//   page: {
//     type: Number,
//     default: 1
//   },
//   limit: {
//     type: Number,
//     default: 10
//   },
//   listCount: {
//     type: Number,
//     default: 0
//   },
//   loadList: {
//     type: Function,
//     default: () => {}
//   }
// })
// const emit = defineEmits(['update:page', 'update:limit'])

interface EmitsType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', limit: number): void
}

const emit = defineEmits<EmitsType>()

const handleSizeChange = (size: number) => {
  emit('update:page', 1)
  emit('update:limit', size)
  props.loadList()
}

const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}
</script>

<style lang="scss" scoped></style>
