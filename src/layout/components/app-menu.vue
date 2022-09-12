<template>
  <el-menu
    :collapse="$store.state.isCollapse"
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
  >
    <el-menu-item index="/">
      <el-icon>
        <setting />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        商品列表
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        商品分类
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        商品规格
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        商品评论
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/order_list">
        订单列表
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <el-icon>
        <setting />
      </el-icon>
      <span>媒体</span>
    </el-menu-item>
    <el-sub-menu index="5">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        角色
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        管理员
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        权限规则
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
