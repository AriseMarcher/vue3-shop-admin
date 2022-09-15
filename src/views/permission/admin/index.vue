<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>数据筛选</span>
      </div>
    </template>
    <el-form
      :inline="true"
      :model="adminForm"
      class="demo-form-inline"
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
  </el-card>
  <el-card>
    <template #header>
      <el-button
        type="primary"
        @click="addAdmin"
      >
        添加管理员
      </el-button>
    </template>
    <el-table :data="tableData" style="width: 100%">
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

    <el-pagination
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { STATUS_OPTIONS } from '@/utils/constants'
import { getAdmins } from '@/api/admin'
import type { IListParams, Admin } from '@/api/types/admin'

const adminForm = reactive({
  page: 1, // 当前页码
  limit: 10, // 每页大小
  name: '',
  roles: '',
  status: '' as IListParams['status']
})
const tableData = ref<Admin[]>([])
const statusOptions = STATUS_OPTIONS

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

onMounted(() => {
  loadList()
})

const loadList = async () => {
  const data = await getAdmins(adminForm)
  console.log(data)
  tableData.value = data.list
}

const handlerSearch = () => {
  loadList()
}

const addAdmin = () => {
  console.log('添加管理员')
}

const handleSizeChange = () => {
  console.log('this is handleSizeChange')
}

const handleCurrentChange = () => {
  console.log('this is handleCurrentChange')
}

const handleStatusChange = async (item: Admin) => {

}

const handleUpdate = (id: number) => {}
const handleDelete = async (id: number) => {}
</script>
