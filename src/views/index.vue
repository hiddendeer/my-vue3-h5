<template>
  <q-stepper v-model="step" ref="stepper" color="primary" header-nav animated>
    <!-- <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template> -->

    <q-step :name="1" title="选择认证类型" icon="settings" :done="step > 1">
      <!-- <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" /> -->
      <!-- <q-btn
            @click="$refs.stepper.next()"
            class="relative right-3"
            color="secondary"
            size="sm"
            label="下一步"
          /> -->
      <!-- <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template> -->

      <auth-select @authTypeTrgger="authTypeTrgger"></auth-select>
    </q-step>

    <q-step
      :name="2"
      title="上传证件信息"
      caption="Optional"
      icon="create_new_folder"
      :done="step > 2"
    >
    <div class="flex justify-end" style="padding-top: 8px;padding-bottom: 8px;">
      <q-btn
        @click="$refs.stepper.next()"
        class="relative right-3"
        color="secondary"
        size="sm"
        label="下一步"
      />
      </div>
      <auth-image></auth-image>
    </q-step>

    <q-step :name="3" title="选择类目" icon="add_comment">
      <categroy-select></categroy-select>
    </q-step>
    <q-step :name="4" title="选择类目1" icon="add_comment">
      <categroy-select></categroy-select>
    </q-step>
  </q-stepper>
</template>

<script>
import categroySelect from "@/views/steps/categroySelect.vue";
import authImage from "@/views/steps/authImage.vue";
import authSelect from "@/views/steps/authSelect.vue";

import { ref } from "vue";

export default {
  components: {
    "categroy-select": categroySelect,
    "auth-image": authImage,
    "auth-select": authSelect,
  },
  setup() {
    const stepper = ref(null);
    const authTypeTrgger = (type) => {
      stepper.value.next();
      console.log(type);
    };
    return {
      authTypeTrgger,
      stepper,
      step: ref(1),
    };
  },
};
</script>

<style scoped>
.q-stepper :deep() .q-stepper__header {
  border-bottom: none;
}
.q-stepper__step :deep() .q-stepper__step-content .q-stepper__step-inner {
  padding: 0;
  background-color: #fafafa;
}

.q-stepper {
  box-shadow: none;
}
</style>