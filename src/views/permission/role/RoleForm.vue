<template>
  <app-dialog-form
    :title="props.roleId ? '编辑角色' : '添加角色'"
    :confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          v-model="formData.role_name"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          ref="tree"
          node-key="id"
          show-checkbox
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { Menu } from '@/api/types/role'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import type { PropType } from 'vue'
import { ref, nextTick } from 'vue'
import { getMenus, getRole, saveRole } from '@/api/role'
import { IElTree } from '@/types/element-plus'

const props = defineProps({
  roleId: { // 编辑的管理员 ID
    type: Number as PropType<number | null>,
    default: null
  }
})
interface EmitsType {
  (e: 'update:role-id', value: number | null): void
  (e: 'success'): void
}
const emit = defineEmits<EmitsType>()
const form = ref<FormInstance | null>(null)

const formData = ref({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: [] as number[]
})
const formRules: FormRules = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}
const formLoading = ref(false)
const menus = ref<Menu[]>([]) // 菜单列表
const tree = ref<IElTree | null>(null)

const handleSubmit = async () => {
  const valid = await form.value?.validate()
  if (!valid) {
    return
  }
  // TODO: 添加 / 更新角色
  formData.value.checked_menus = [
    ...tree.value?.getCheckedKeys(true) as any,
    ...tree.value?.getHalfCheckedKeys() as any
  ]
  await saveRole(props.roleId || 0, formData.value).finally(() => {
    formLoading.value = false
  })
  emit('success')
  ElMessage.success('保存成功')
}
const handleDialogClosed = () => {
  emit('update:role-id', null)
  form.value?.clearValidate() // 清除验证结果
  form.value?.resetFields() // 清除表单数据
}
const handleDialogOpen = async () => {
  formLoading.value = true
  props.roleId
    ? await loadRole().finally(() => { formLoading.value = false })
    : await loadMenus().finally(() => { formLoading.value = false })
}
const loadRole = async () => {
  if (!props.roleId) return
  const { menus: menusData, role } = await getRole(props.roleId)
  menus.value = menusData
  console.log(menus.value)
  await nextTick()
  formData.value.role_name = role.role_name
  formData.value.status = role.status
  setCheckedMenus(role.rules.split(',').map(id => Number.parseInt(id)))
}
const loadMenus = async () => {
  const data = await getMenus()
  menus.value = data.menus
}
const setCheckedMenus = (menus: number[]) => {
  menus.forEach(menuId => {
    const node = tree.value?.getNode(menuId)
    if (node && node.isLeaf) { // 判断节点是否是叶子节点
      tree.value?.setChecked(menuId, true, false)
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
