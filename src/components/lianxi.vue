<template>
  <!-- <hello-world>加载</hello-world>
  <button @click="openLoading">加载了</button> -->
  <div style="height: 100%">
      <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
  </el-row>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import HelloWorld from "./index.js";
const instance = getCurrentInstance()

const obj = {
  user: '陈大猫啊'
}

// 获取列表

const b = reactive({a:1})
const openLoading = () => {
  HelloWorld.show();
  setTimeout(() => {
    HelloWorld.hide();
  }, 5000);
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
