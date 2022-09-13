<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      :model="user"
      :rules="rules"
      class="login-form"
      status-icon
      @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        <img
          class="login-logo"
          src="@/assets/login_logo.png"
          alt=""
        >
      </div>
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <el-icon>
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="user.pwd"
          type="password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            class="imgcode-input"
            v-model="user.imgcode"
            type="password"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <el-icon>
                <Key />
              </el-icon>
            </template>
          </el-input>
          <img
            class="imgcode"
            :src="captchaSrc"
            alt="验证码"
            @click="loadCaptcha"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="isLoading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getCaptcha, login } from '@/api/common'
import { onMounted, reactive, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: ''
})
const isLoading = ref(false)
const captchaSrc = ref('')
const ruleFormRef = ref<FormInstance>()
const rules = ref<FormRules>({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
})

const handleSubmit = async () => {
  const valid = await ruleFormRef.value?.validate()
  if (!valid) {
    return false
  }
  isLoading.value = true
  const loginData = await login(user).catch(() => {
    loadCaptcha()
  }).finally(() => {
    isLoading.value = false
  })
  if (!loginData) return

  router.replace({
    name: 'home'
  })
}

onMounted(() => {
  loadCaptcha()
})

// 刷新验证码
const loadCaptcha = async () => {
  const data = await getCaptcha()
  captchaSrc.value = URL.createObjectURL(data)
}
</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .imgcode-input {
      width: 200px;
    }
    .imgcode {
      width: 120px;
      height: 30px;
    }
  }
}
</style>
