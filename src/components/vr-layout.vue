<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1" v-if="isDraw">
    <q-header
      v-if="isShow"
      class="bg-white text-grey-8 q-py-xs header-border"
      height-hint="58"
    >
      <q-toolbar>
        <q-icon name="fact_check" style="color: #1c6dd0" size="28px" />
        <q-toolbar-title shrink class="text-weight-bold">
          伟岸纵横
        </q-toolbar-title>
        <q-btn
          v-if="isShow"
          flat
          dense
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="@/assets/images/default.png" />
            </q-avatar>
            <q-menu transition-show="flip-right" transition-hide="flip-left">
              <q-list style="min-width: 100px">
                <q-item>
                  <q-item-section>{{ userName }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section @click="loginOut">注销</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isShow"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="190"
    >
      <layout-left-nav> </layout-left-nav>
    </q-drawer>

    <q-page-container>
      <q-scroll-area class="contain-area">
        <router-view />
      </q-scroll-area>
    </q-page-container>
  </q-layout>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import LayoutLeftNav from "@/components/layout-left.vue";

const $router = useRouter();
const $route = useRoute();
const leftDrawerOpen = ref(false);
const auth = ref(localStorage.auth);
const isShow = ref(false);
const isDraw = ref(true);

if (auth.value && auth.value == "admin") {
  isShow.value = true;
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const loginOut = () => {
  localStorage.clear();
  if ($route.path == "/admin") {
    $router.push("/login_m");
  } else {
    $router.push("/login");
  }
};

$router.beforeEach((to, from) => {
  if (to.path == "/admin") {
    isShow.value = true;
  }
  if (to.path == "/login" || to.path == "/login_m") {
    isDraw.value = false;
  } else {
    isDraw.value = true;
  }
});
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
// .YL {
//   &__toolbar-input-container {
//     min-width: 100px;
//     width: 55%;
//   }
//   &__toolbar-input-btn {
//     border-radius: 0;
//     border-style: solid;
//     border-width: 1px 1px 1px 0;
//     border-color: rgba(0, 0, 0, 0.24);
//     max-width: 60px;
//     width: 100%;
//   }
//   &__drawer-footer-link {
//     color: inherit;
//     text-decoration: none;
//     font-weight: 500;
//     font-size: 0.75rem;
//   }
//   &:hover {
//     color: #000;
//   }
// }
</style>