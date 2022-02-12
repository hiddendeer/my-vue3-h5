<template>
  <div class="content row">
    <div
      class="col-md-4 col-xs-12 flex justify-end"
      style="margin-right: 10px; flex: 1;"
    >
      <q-card class="my-card" @click="personClick('0')" :style="{ height: isPlt ? '40vh' : '20vh' }">
        <q-card-section>
          <div>
            <div class="text-center text-lg" style="padding-bottom: 15px;color: #222;font-size: 1.2rem;">个人注册</div>
            <div style="color: #9a9a9a;font-size: 0.8rem;" >点击进入个人注册流程</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-xs-12 flex justify-end" style="flex: 1;justify-content: flex-start;">
      <q-card class="my-card"  @click="personClick('1')" :style="{ height: isPlt ? '40vh' : '20vh' }">
        <q-card-section>
          <div>
            <div class="text-center text-lg" style="padding-bottom: 15px;color: #222;font-size: 1.2rem;">企业注册</div>
            <div style="color: #9a9a9a;font-size: 0.8rem;">点击进入企业注册流程</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  setup(props, context) {
    const $q = useQuasar();
    const isPlt = $q.platform.is.desktop;
    const personClick = (type) => {
      context.emit('authTypeTrgger', type)
    }
    return {
      isPlt,
      personClick
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  display: flex
  justify-content: center
  align-items: center
  width: 40vh
  cursor: pointer
.content
  width: 80%
  margin: auto
  padding-top: 50px
  height: calc(100vh - 150px)
</style>
