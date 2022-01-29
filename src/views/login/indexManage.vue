<template>
  <div
    class="
      min-h-full
      flex
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          登录到您的账户
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或
          {{ " " }}
          <a
            href="/#/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            客户身份登录
          </a>
        </p>
      </div>
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">用户名</label>
          <input
            v-model="account"
            id="email-address"
            type="username"
            autocomplete="off"
            required="required"
            class="
              appearance-none
              rounded-none
              relative
              block
              w-full
              px-3
              py-2
              border border-gray-300
              placeholder-gray-500
              text-gray-900
              rounded-t-md
              focus:outline-none
              focus:ring-indigo-500
              focus:border-indigo-500
              focus:z-10
              sm:text-sm
            "
            placeholder="用户名"
          />
        </div>
        <div>
          <label for="password" class="sr-only">密码</label>
          <input
            v-model="pwd"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="
              appearance-none
              rounded-none
              relative
              block
              w-full
              px-3
              py-2
              border border-gray-300
              placeholder-gray-500
              text-gray-900
              rounded-b-md
              focus:outline-none
              focus:ring-indigo-500
              focus:border-indigo-500
              focus:z-10
              sm:text-sm
            "
            placeholder="密码"
          />
        </div>
      </div>

      <div class="flex items-center justify-between"></div>

      <div class="flex justify-center">
        <q-btn
          @click="loginClick"
          color="primary"
          style="background-color: rgb(79, 70, 229) !important; width: 100%"
          icon-right="send"
          label="登录"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { login } from "@/api/rest";
export default {
  setup() {
    const $router = useRouter();
    const account = ref("");
    const pwd = ref("");
    const $q = useQuasar();
    const loginClick = async () => {
      if (account.value == "" || pwd.value == "") {
        $q.dialog({
          title: "登录失败",
          message: "请输入正确的账号密码",
        });
        return;
      }
      const result = await login({ account: account.value, pwd: pwd.value });
      if (result.code && result.code == "200") {
        localStorage.clear()
        localStorage.setItem('token',result.token)
        localStorage.setItem('userId',result.userId)
        localStorage.setItem('userName',result.userName)
        localStorage.setItem('auth','admin')
        $router.push('/admin')
      } else {
        $q.notify({
          position: "top",
          type: "negative",
          message: "账号密码错误, 请重新输入",
          timeout: 1500,
        });
      }
    };
    return {
      account,
      pwd,
      loginClick,
    };
  },
  components: {},
};
</script>