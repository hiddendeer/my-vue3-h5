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
          欢迎使用订单系统
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或
          {{ " " }}
          <a
            href="/#/login_m"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            管理员身份登录
          </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="/#/login" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">订单号</label>
            <input
              v-model="orderCode"
              id="email-address"
              name="email"
              type="username"
              autocomplete="off"
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
                rounded-t-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="订单号"
            />
          </div>
          <div>
            <label for="password" class="sr-only">验证码</label>
            <input
              v-model="authCode"
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
              placeholder="验证码"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <!-- <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div> -->
        </div>

        <div class="flex justify-center">
          <q-btn
            @click="login"
            type="button"
            color="primary"
            style="background-color: rgb(79, 70, 229) !important; width: 100%"
            icon-right="send"
            label="登录"
          >
            <!-- :loading="loading" -->

     
          </q-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, nextTick, toRaw, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { getOrder } from "@/api/rest";
import { useStore } from "vuex"
export default {
  components: {},
  setup() {
    const $q = useQuasar();
    const orderCode = ref("");
    const authCode = ref("");
    const $router = useRouter();

    const store = useStore()
    store.dispatch('clearOut')
    console.log(store,2323);

    const login = async () => {
      if (orderCode.value == "" || authCode.value == "") {
        $q.dialog({
          title: "验证失败",
          message: "请输入正确的订单号和验证码",
        });
        return;
      }

      localStorage.clear()

      const getOrderInfo = await getOrder({
        orderCode: orderCode.value,
        authCode: authCode.value,
      });

      if (getOrderInfo && getOrderInfo.code == "200") {
        localStorage.setItem("taskId", getOrderInfo.taskId);
        localStorage.setItem("token", getOrderInfo.token);
        localStorage.setItem("orderCode", getOrderInfo.orderCode);
        localStorage.setItem("scope", getOrderInfo.firstServer);
        localStorage.setItem("auth", 'tourist');
        localStorage.setItem("userName", '客户');
        $router.push("/index");
      } else {
        let message = "服务器错误, 请联系管理员";
        if (getOrderInfo && getOrderInfo.msg) message = getOrderInfo.msg;
        $q.dialog({
          title: "登录失败",
          message: message,
        });
      }
    };
    return {
      login,
      orderCode,
      authCode,
    };
  },
};
</script>