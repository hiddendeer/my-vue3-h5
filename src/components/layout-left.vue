<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo el-menu-styles"
    active-text-color="#722ed1"
    :unique-opened="true"
  >
    <el-sub-menu
      v-for="(item, index) in menuList"
      :index="index + ''"
      :key="index"
    >
      <template #title>
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <div
        v-for="(v, k) in item.children"
        :key="k"
        v-ripple="{ color: 'purple-8' }"
        class="relative-position container flex flex-center"
        style="height: 50px"
        @click="_selectItem(index, k)"
        :class="[
          index + '-' + k == selectIndex
            ? 'menu-item-select'
            : 'menu-item-border',
        ]"
      >
        <el-menu-item :index="index + '-' + k">{{ v.label }}</el-menu-item>
      </div>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from "vue";

const menuList = reactive([
  {
    label: "系统功能",
    icon: "Location",
    children: [
      { label: "菜单1", path: "/a" },
      { label: "菜单2", path: "/b" },
    ],
  },
  {
    label: "基础数据",
    icon: "Bell",
    children: [
      { label: "菜单1", path: "/a" },
      { label: "菜单2", path: "/b" },
    ],
  },
]);

let selectIndex = ref("");
const _selectItem = (index, k) => {
  selectIndex.value = index + "-" + k;
  console.log(selectIndex.value);
};
</script>

<style lang="scss">
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
  border-left: 3px solid #fff !important;
  &:hover {
    background-color: transparent !important;
    color: #722ed1;
  }
}
.menu-item-border {
  border-left: 3px solid #fff !important;
}
.menu-item-select {
  border-left: 3px solid #722ed1 !important;
}
</style>