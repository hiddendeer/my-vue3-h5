<template>
  <!-- <hello-world>加载</hello-world>
  <button @click="openLoading">加载了</button> -->
  <div style="height: 100%">
    111
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

console.log(obj?.user?.hh??'wawa',222);

const b = reactive({a:1})
console.log(instance);
const openLoading = () => {
  HelloWorld.show();
  setTimeout(() => {
    HelloWorld.hide();
  }, 5000);
};
</script>
