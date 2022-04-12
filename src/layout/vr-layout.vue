<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <!-- 布局头部 -->
    <LayoutHeader
      @emitShowMenu="emitShowMenu"
      @emitHandleMenu="emitHandleMenu"
    ></LayoutHeader>

    <!-- 左边栏菜单 -->
    <q-drawer
      v-if="leftShow"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="190"
    >
      <layout-left ref="refLeftMenu"></layout-left>
    </q-drawer>

    <!-- 内容 -->
    <q-page-container>
      <q-scroll-area class="contain-area">
        <router-view />
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, toRaw, reactive, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import LayoutHeader from "./components/layout-header.vue";
import LayoutLeft from "./components/layout-left.vue";

const $router = useRouter();
const $route = useRoute();
const leftDrawerOpen = ref(false);
const auth = ref(localStorage.auth);
const leftShow = ref(false);

let menuList = reactive([
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
const refLeftMenu = ref(null);

if (auth.value && auth.value == "admin") {
  leftShow.value = true;
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const emitShowMenu = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const emitHandleMenu = (param) => {
  if (param == 1) {
    const menu = [
      {
        label: "基础数据",
        icon: "Bell",
        children: [
          { label: "菜单1", path: "/a" },
          { label: "菜单2", path: "/b" },
        ],
      },
    ];
    refLeftMenu.value._trggerMenu(menu);
  }
};

// $router.beforeEach((to, from) => {
//   if (to.path == "/admin") {
//     leftShow.value = true;
//   }
//   if (to.path == "/login" || to.path == "/login_m") {
//     isDraw.value = false;
//   } else {
//     isDraw.value = true;
//   }
// });
</script>

<style lang="scss">
.header-border {
  border-bottom: 1px solid rgba(229, 231, 235, 1);
  transition-duration: 2s;
}
.contain-area {
  width: 100%;
  height: calc(100vh - 59px);
  padding: 10px;
}
</style>