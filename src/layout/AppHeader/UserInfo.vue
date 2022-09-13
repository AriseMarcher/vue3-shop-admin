<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          个人中心
        </el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/api/common'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const handleLogout = () => {
  ElMessageBox.confirm('确认退出吗？', '退出提升', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await logout()
    router.push({
      name: 'login'
    })

    store.commit('setUser', null)

    ElMessage.success('退出成功！')
  }).catch(() => {
    ElMessage.info('您已取消退出')
  })
}
</script>

<style lang="scss" scoped></style>
