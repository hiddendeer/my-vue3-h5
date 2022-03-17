<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1" v-if="isDraw">
    <q-header  v-if="isShow" class="bg-white text-grey-8 q-py-xs header-border" height-hint="58">
      <q-toolbar>
        <q-btn
        v-if="isShow"
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
            <q-icon  name="fact_check" style="color: #1C6DD0"  size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            商标注册系统
          </q-toolbar-title>
        </q-btn>

        <q-space />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="@/assets/images/default.png">
            </q-avatar>
            <!-- <q-tooltip>{{userName}}</q-tooltip> -->
              <q-menu
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-list style="min-width: 100px">
                <q-item>
              <q-item-section >{{userName}}</q-item-section>
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
      class="bg-grey-2"
      :width="190"
    >
      <q-scroll-area class="fit">
        <q-list padding style="padding: 10px;">
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable :active="true">
            <q-item-section avatar style="min-width: 35px;">
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
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

<script>
import { ref, onMounted, toRaw,reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'MyLayout',
  setup () {
    console.log('提交了一次');
    console.log('提交了两次');


    const $router = useRouter()
    const $route = useRoute()
    const leftDrawerOpen = ref(false);
    const userName = localStorage.userName
    const auth = ref(localStorage.auth)
    const isShow = ref(false)
    const isDraw = ref(true)
    const search = ref('')

    if (auth.value && auth.value == 'admin') {
      isShow.value = true
    }
    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const loginOut = () => {
      localStorage.clear()
      if ($route.path == '/admin') {
        $router.push('/login_m')

      } else {
        $router.push('/login')
      }

      
      // localStorage.clear()
      // $router.push('')


    }

    $router.beforeEach((to,from) => {
      if (to.path == '/admin') {
        isShow.value = true
      }
      if (to.path == '/login' || to.path == '/login_m') {
        isDraw.value = false
      } else {
        isDraw.value = true
      }
    }) 
    return {
      userName,
      loginOut,
      auth,
      isDraw,
      isShow,
      leftDrawerOpen,
      toggleLeftDrawer,
      search,
      links1: [
        { icon: 'home', text: '订单列表' },
        // { icon: 'whatshot', text: '订单数据' },
      ],
    }
  },
}
</script>

<style lang="sass">
.header-border
  border-bottom: 1px solid rgba(229, 231, 235, 1)
.contain-area
  width: 100%
  height: calc(100vh - 59px)

.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>