<template>
  <q-stepper v-model="step" ref="stepper" color="primary"  animated>
    <q-step :name="1" title="选择认证类型" icon="settings" :done="step > 1">
      <auth-select @authTypeTrgger="authTypeTrgger"></auth-select>
    </q-step>
    <q-step
      :name="2"
      title="上传证件信息"
      icon="settings"
      :done="step > 2"
    >
    <div class="flex justify-center" style="padding-top:20px;font-size: 1.1rem;color: #FC4F4F;"><p style="text-align: center;">补充说明: 上传照片前请确保模板纸面工整顺平，不能有褶皱、反光等</p></div>
      <div
        class="flex justify-end"
        style="padding-top: 8px; padding-bottom: 8px"
      >
         <q-btn
           @click="$refs.stepper.previous()"
          class="relative right-3"
          color="primary"
          size="sm"
          label="上一步"
          flat
          style="margin-right: 10px;"
        />
        <q-btn
          v-show="isStep"
          @click="$refs.stepper.next()"
          class="relative right-3"
          color="secondary"
          size="sm"
          label="下一步"
        />
      </div>
        <auth-image
          :authType="authType"
          :imageUrl="imageUrl"
          @imageIdTrrger="imageIdTrrger"
        ></auth-image>
    </q-step>

    <q-step :name="3" title="填写商标" icon="settings" :done="step > 3">
      <div class="flex justify-center" style="padding-top:20px;font-size: 1.1rem;color: #FC4F4F;text-align: center;">补充说明: 上传照片前请确保模板纸面工整顺平，不能有褶皱、反光等</div>
           <div
        class="flex justify-end"
        style="padding-top: 8px; padding-bottom: 8px"
      >
         <q-btn
           @click="$refs.stepper.previous()"
          class="relative right-3"
          color="primary"
          size="sm"
          label="上一步"
          flat
          style="margin-right: 10px;"
        />
        <q-btn
          v-show="isStepLogo"
          @click="$refs.stepper.next()"
          class="relative right-3"
          color="secondary"
          size="sm"
          label="下一步"
        />
      </div>
      <auth-logo @logoTrrger="logoTrrger"></auth-logo>
    </q-step>
    <q-step :name="4" title="选择类目" icon="settings" :done="step > 4">
               <div
        class="flex justify-end"
        style="padding-top: 8px; padding-bottom: 8px"
      >
         <q-btn
           @click="$refs.stepper.previous()"
          class="relative right-3"
          color="primary"
          size="sm"
          label="上一步"
          flat
          style="margin-right: 10px;"
        />
      </div>
      <categroy-select :submitContent="submitInfo"></categroy-select>
    </q-step>
  </q-stepper>
</template>

<script>
import categroySelect from "@/views/steps/categroySelect.vue";
import authImage from "@/views/steps/authImage.vue";
import authSelect from "@/views/steps/authSelect.vue";
import authLogo from "@/views/steps/authLogo.vue";

import { ref,onMounted,nextTick } from "vue";
import { useStore } from "vuex"

export default {
  components: {
    "categroy-select": categroySelect,
    "auth-image": authImage,
    "auth-select": authSelect,
    "auth-logo": authLogo
  },

  setup() {
console.log('继续修改1');
    let submitInfo = ref({}); // 提交信息
    const stepper = ref(null);
    const isKeep = ref(true);
    const authType = ref("");
    const isStep = ref(false);
    const isStepLogo = ref(false);
    let imageUrl = ref([])
    const store = useStore()
    let imageIdsP = [];
    let imageIdsC = [];
    // 选择认证方式回调
    const authTypeTrgger = (type) => {
      stepper.value.next();
      submitInfo.value.type = type;
      authType.value = type;
      store.state.authType = type
    };
    const imageIdTrrger = (info) => {
      if (authType.value == "0") {
        if (info.imageId1) {
          imageIdsP[0] = info.imageId1;
        }
        if (info.imageId2) {
          imageIdsP[1] = info.imageId2;
        }
        if (info.imageId3) {
          imageIdsP[2] = info.imageId3;
        }
        if (imageIdsP.length > 2) {
          isStep.value = true
        }
        submitInfo.value.fileIds = imageIdsP.join(",");
      }

      if (authType.value == "1") {
        if (info.imageId4) {
          imageIdsC[0] = info.imageId4;
        }
        if (info.imageId5) {
          imageIdsC[1] = info.imageId5;
        }
        if (imageIdsC.length > 1) {
          isStep.value = true
        }
        submitInfo.value.fileIds = imageIdsC.join(",");
      }

    };

    const logoTrrger = (obj) =>  {
      if (obj.hasOwnProperty('logoName') && obj.logoName !== '' ) {
        submitInfo.value.trademarkName = obj.logoName
      } else if (obj.hasOwnProperty('logoName') && obj.logoName === ''){
        submitInfo.value.trademarkName = ''
      }


      if (obj.imageId6) {
         if (authType.value == "0") {
           imageIdsP[3] = obj.imageId6
         }
         if (authType.value == "1") {
           imageIdsC[2] = obj.imageId6
         }

      }
      if (submitInfo.value.trademarkName!=='') {
        isStepLogo.value = true
      } else {
         isStepLogo.value = false
      }
    }
    return {
      authType,
      logoTrrger,
      store,
      isStep,
      submitInfo,
      authTypeTrgger,
      imageIdTrrger,
      isStepLogo,
      stepper,
      isKeep,
      step: ref(1),
      imageUrl,
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