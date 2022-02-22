<template>
  <div style="display: flex; justify-content: center">
    <span style="display: flex; align-items: center">商标名称:</span
    ><el-input
      @input="logoChange"
      size="large"
      style="width: 30vh"
      class="w-25 m-3"
      v-model="logoName"
      placeholder="请输入商标名称"
    />
  </div>
  <div
    class="col-md-4 col-xs-12 flex justify-end"
    style="
      margin-right: 10px;
      flex: 1;
      justify-content: center;
      margin-top: 20px;
    "
  >
    <el-upload
      :headers="headers"
      :data="data1"
      name="fileImage"
      class="avatar-uploader"
      action="http://49.235.66.253:7000/file/uploadFile"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
      :on-success="handleAvatarSuccess"
      :style="{ width: isPlt ? '40vh' : '25vh', height: '45vh' }"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
        style="height: 40vh"
      />
      <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
      <div style="color: #ffab73">上传商标LOGO(选填)</div>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import type {
  UploadFile,
  ElUploadProgressEvent,
  ElFile,
} from "element-plus/es/components/upload/src/upload.type";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
const store = useStore();
const $q = useQuasar();
const isPlt = $q.platform.is.desktop;
const logoName = ref("");
if (store.state.logoName) {
  logoName.value = store.state.logoName;
}
const imageUrl = ref("");
const headers = ref({ token: localStorage.token });
const data1 = ref({ taskId: localStorage.taskId, type: 6 });
if (store.state.imageUrl6) {
  imageUrl.value = store.state.imageUrl6;
}
const emit = defineEmits(["logoTrrger"]);
const handleAvatarSuccess = (res: ElUploadProgressEvent, file: UploadFile) => {
  imageUrl.value = URL.createObjectURL(file.raw);
  store.state.imageUrl6 = URL.createObjectURL(file.raw);
  emit("logoTrrger", { imageId6: res["fileId"] });
};
const logoChange = (val) => {
  store.state.logoName = val;
  emit("logoTrrger", { logoName: val });
};
</script>

<style>
.avatar-uploader .el-upload {
  width: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 20vh;
  display: block;
}
</style>