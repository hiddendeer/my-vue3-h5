<template>
  <div class="block py-lg f-family">
    <ul class="block" style="font-size: 14px">
      <li style="padding: 8px 16px">
        <a
          @click="_click"
          class="sidebar-nav__item-link ng-star-inserted sidebar-nav__item-text"
          >应用监控</a
        >
        <Transition>
          <ul class="sidebar-nav__sub" style="padding: 0px 16px" v-if="show">
            <li>你好哇</li>
            <li>你好哇</li>
            <li>你好哇</li>
            <li>你好哇</li>
          </ul>
        </Transition>
      </li>
            <li style="padding: 0px 16px">
        <a
          @click="_click2"
          class="sidebar-nav__item-link ng-star-inserted sidebar-nav__item-text"
          >系统功能</a
        >
        <Transition>
          <ul class="sidebar-nav__sub" style="padding: 8px 16px" v-if="show2">
            <li>你好哇</li>
            <li>你好哇</li>
            <li>你好哇</li>
            <li>你好哇</li>
          </ul>
        </Transition>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
let show = ref(false);
let show2 = ref(false);
const _click = () => {
  show.value = !show.value;
};
const _click2 = () => {
  show2.value = !show2.value;
};
</script>

<style lang="scss">
.py-lg {
  padding-top: 24px !important;
  padding-bottom: 24px !important;
}

.f-family {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 14px;
  font-weight: 500;
}
.sidebar-nav__item-link:hover {
  color: #722ed1;
}
.sidebar-nav__item-link {
  position: relative;
  display: block;
  padding: 8px 32px 8px 16px;
  overflow: hidden;
  color: #000000d9;
  white-space: nowrap;
  text-decoration: none !important;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
}
a {
  color: #722ed1;
  text-decoration: none;
  background-color: initial;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}

.sidebar-nav__item-text {
  opacity: 1;
  transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.sidebar-nav__sub {
  display: block;
  animation: fadeIn 0.2s;
  overflow: hidden;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>