<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo el-menu-styles"
    @open="handleOpen"
    @close="handleClose"
    active-text-color="#722ed1"
  >
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>系统功能</span>
      </template>
      <div
        v-ripple="{ color: 'purple-8' }"
        class="relative-position container flex flex-center"
        style="height: 50px"
      >
        <el-menu-item index="2-1">菜单1</el-menu-item>
      </div>
      <div
        v-ripple="{ color: 'purple-8' }"
        class="relative-position container flex flex-center q-mt-sm"
        style="height: 50px"
      >
        <el-menu-item index="2-2">菜单2</el-menu-item>
      </div>
      <div
        v-ripple="{ color: 'purple-6' }"
        class="relative-position container flex flex-center"
      >
        <el-menu-item index="2-3">菜单3</el-menu-item>
      </div>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><bell /></el-icon>
        <span>菜单权限</span>
      </template>
      <div
        v-ripple="{ color: 'purple-6' }"
        class="relative-position container flex flex-center q-mt-sm"
        style="height: 50px"
      >
        <el-menu-item index="3-1">菜单1</el-menu-item>
      </div>
      <div
        v-ripple="{ color: 'purple-6' }"
        class="relative-position container flex flex-center q-mt-sm"
        style="height: 50px"
      >
        <el-menu-item index="3-2">菜单2</el-menu-item>
      </div>
      <div
        v-ripple="{ color: 'purple-6' }"
        class="relative-position container flex flex-center q-mt-sm"
        style="height: 50px"
      >
        <el-menu-item index="3-3">菜单3</el-menu-item>
      </div>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><data-line /></el-icon>
        <span>数据权限</span>
      </template>
      <el-menu-item index="4-1">item one</el-menu-item>
      <el-menu-item index="4-2">item one</el-menu-item>
      <el-menu-item index="4-3">item three</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><avatar /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item one</el-menu-item>
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><suitcase /></el-icon>
        <span>系统配置</span>
      </template>
      <el-menu-item index="5-1">item one</el-menu-item>
      <el-menu-item index="5-2">item one</el-menu-item>
      <el-menu-item index="5-3">item three</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Location,
  Bell,
  Avatar,
  DataLine,
  Suitcase,
} from "@element-plus/icons-vue";
</script>

<style lang="scss">
.el-sub-menu {
  border-left:3px solid #722ed1;
}
.el-menu-styles {
  position: relative;
  top: 20px;
  overflow-x: hidden;
  border: none;
}
.el-sub-menu__title:hover {
  background-color: #fff;
  color: #722ed1;
}
.el-menu-item {
  border-radius: 20px;
  &:hover {
    background-color: transparent !important;
    color: #722ed1;

  }
}
</style>