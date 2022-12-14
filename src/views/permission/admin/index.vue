<template>
  <page-container>
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        :inline="true"
        :model="adminForm"
        class="demo-form-inline"
        :disabled="listLoading"
      >
        <el-form-item label="状态">
          <el-select
            v-model="adminForm.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in statusOptions"
              :label="item.label"
              :value="item.value"
              :key="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称">
          <el-input
            v-model="adminForm.name"
            placeholder="请输入身份昵称"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="handlerSearch"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button
          type="primary"
          @click="formVisible = true"
        >
          添加管理员
        </el-button>
      </template>
      <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="real_name" label="姓名" width="100" />
        <el-table-column prop="account" label="账号" width="100" />
        <el-table-column prop="roles" label="身份" width="180">
          <template #default="scope">
            <el-space wrap>
              <el-tag
                class="role-tag"
                v-for="(item) in scope.row.roles.split(',')"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column prop="last_time" label="最后一次登录时间" width="180" />
        <el-table-column prop="last_ip" label="最后一次登录IP" width="180" />
        <el-table-column prop="status" label="状态" width="180">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="text"
              @click="handleUpdate(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <AppPagination
        v-model:page="adminForm.page"
        v-model:limit="adminForm.limit"
        :total="listCount"
        :load-list="loadList"
        :disabled="listLoading"
      />
    </app-card>
  </page-container>
  <AdminForm
    v-model="formVisible"
    v-model:admin-id="adminId"
    @success="handleSuccess"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { STATUS_OPTIONS } from '@/utils/constants'
import {
  getAdmins,
  deleteAdmin,
  updateAdminStatus
} from '@/api/admin'
import type { IListParams, Admin } from '@/api/types/admin'
import { ElMessage } from 'element-plus'
import AdminForm from './AdminForm.vue'

const adminForm = reactive({
  page: 1, // currentPage4当前页码
  limit: 10, // 每页大小
  name: '',
  roles: '',
  status: '' as IListParams['status']
})
const tableData = ref<Admin[]>([])
const statusOptions = STATUS_OPTIONS

const listCount = ref(0)
const listLoading = ref(false)
const formVisible = ref(false)
const adminId = ref<number | null>(null)

onMounted(() => {
  loadList()
})

const loadList = async () => {
  listLoading.value = true
  const data = await getAdmins(adminForm).finally(() => {
    listLoading.value = false
  })
  data.list.forEach(item => {
    item.statusLoading = false
  })

  tableData.value = data.list
  listCount.value = data.count
}

const handlerSearch = () => {
  loadList()
}

const handleStatusChange = async (item: Admin) => {
  item.statusLoading = true
  await updateAdminStatus(item.id, item.status as number).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
}

const handleUpdate = (id: number) => {
  adminId.value = id
  formVisible.value = true
}
const handleDelete = async (id: number) => {
  await deleteAdmin(id)
  ElMessage.success('删除成功')
  tableData.value.length === 1 && (adminForm.page = 1)
  loadList()
}
const handleSuccess = () => {
  formVisible.value = false
  loadList()
}
</script>
