<template>
<div v-if="authType=='0'">
  <div class="row" style="background-color: #fafafa">
    <div
      class="col-md-4 col-xs-12 flex justify-end"
      style="margin-right: 10px; flex: 1"
    >
      <el-upload
        :headers="headers"
        :data="data1"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess1"
        :style="{ width: isPlt ? '40vh' : '25vh' }"
      >
        <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">身份证正面照</div>
      </el-upload>
    </div>
    <div class="col-md-4 col-xs-12" style="margin-right: 10px; flex: 1">
      <el-upload
        :headers="headers"
        :data="data2"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess2"
        :style="{ width: isPlt ? '40vh' : '25vh' }"
      >
        <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">身份证国徽照</div>
      </el-upload>
    </div>
    
  </div>

    <div class="row" style="background-color: #fafafa;margin-top: 10px;">
    <div
      class="col-md-4 col-xs-12 flex justify-end"
      style="margin-right: 10px; flex: 1"
    >
      <el-upload
        :headers="headers"
        :data="data3"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess3"
        :style="{ width: isPlt ? '40vh' : '25vh' }"
      >
        <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">个体户营业执照</div>
      </el-upload>
    </div>
    <div class="col-md-4 col-xs-12" style="margin-right: 10px; flex: 1">
  
    </div>
    
  </div>
  </div>
  <div v-if="authType=='1'">
      <div class="row" style="background-color: #fafafa">
    <div
      class="col-md-4 col-xs-12 flex justify-end"
      style="margin-right: 10px; flex: 1"
    >
      <el-upload
        :headers="headers"
        :data="data4"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess4"
        :style="{ width: isPlt ? '40vh' : '25vh', height: '45vh'}"
      >
        <img v-if="imageUrl4" :src="imageUrl4" class="avatar" style="height: 40vh;" />
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">企业营业执照</div>
      </el-upload>
    </div>
    <div class="col-md-4 col-xs-12" style="margin-right: 10px; flex: 1">
      <el-upload
        :headers="headers"
        :data="data5"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess5"
        :style="{ width: isPlt ? '40vh' : '25vh', height: '45vh' }"
      >
        <img v-if="imageUrl5" :src="imageUrl5" class="avatar" style="height: 40vh;"/>
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">企业公章(盖在白纸上拍照)</div>
      </el-upload>
    </div>
    
  </div>

  </div>

  
</template>

<script lang="ts" setup>
import { ref} from "vue";
import { useStore } from "vuex"
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { useQuasar } from "quasar";
import type {
  UploadFile,
  ElUploadProgressEvent,
  ElFile,
} from "element-plus/es/components/upload/src/upload.type";


const headers = ref({ token: localStorage.token });
const data1 = ref({ taskId: localStorage.taskId, type: 1 });
const data2 = ref({ taskId: localStorage.taskId, type: 2 });
const data3 = ref({ taskId: localStorage.taskId, type: 3 });
const data4 = ref({ taskId: localStorage.taskId, type: 4 });
const data5 = ref({ taskId: localStorage.taskId, type: 5 });
const $q = useQuasar();
const isPlt = $q.platform.is.desktop;
const emit = defineEmits(['imageIdTrrger'])
const props = defineProps(['authType','imageUrl'])

const store = useStore()

let authType = ref('')

if (props.authType) {
  authType = props.authType
}

const imageUrl1 = ref("");
const imageUrl2 = ref("");
const imageUrl3 = ref("");
const imageUrl4 = ref("");
const imageUrl5 = ref("");
imageUrl1.value = "../../image/img/cardimg_sf02.png"
imageUrl2.value = "../../image/img/cardimg_sf01.png"
imageUrl3.value = "../../image/img/cardimg_fc.png"
imageUrl4.value = "../../image/img/cardimg_fc.png"
imageUrl5.value = "../../image/img/cardimg_fc.png"

if (store.state.imageUrl1) {
  imageUrl1.value = store.state.imageUrl1
}
if (store.state.imageUrl2) {
  imageUrl2.value = store.state.imageUrl2
}
if (store.state.imageUrl3) {
  imageUrl3.value = store.state.imageUrl3
}
if (store.state.imageUrl4) {
  imageUrl4.value = store.state.imageUrl4
}
if (store.state.imageUrl5) {
  imageUrl5.value = store.state.imageUrl5
}
console.log(store);

const handleAvatarSuccess1 = (res: ElUploadProgressEvent, file: UploadFile) => {
   emit('imageIdTrrger', {'imageId1': res['fileId']})
   store.state.imageUrl1 = URL.createObjectURL(file.raw)
  imageUrl1.value = URL.createObjectURL(file.raw);
};
const handleAvatarSuccess2 = (res: ElUploadProgressEvent, file: UploadFile) => {
  emit('imageIdTrrger', {'imageId2': res['fileId']})
   store.state.imageUrl2 = URL.createObjectURL(file.raw)
  imageUrl2.value = URL.createObjectURL(file.raw);
};
const handleAvatarSuccess3 = (res: ElUploadProgressEvent, file: UploadFile) => {
  emit('imageIdTrrger', {'imageId3': res['fileId']})
   store.state.imageUrl3 = URL.createObjectURL(file.raw)
  imageUrl3.value = URL.createObjectURL(file.raw);
};
const handleAvatarSuccess4 = (res: ElUploadProgressEvent, file: UploadFile) => {
  emit('imageIdTrrger', {'imageId4': res['fileId']})
   store.state.imageUrl4 = URL.createObjectURL(file.raw)
  imageUrl4.value = URL.createObjectURL(file.raw);
};
const handleAvatarSuccess5 = (res: ElUploadProgressEvent, file: UploadFile) => {
  emit('imageIdTrrger', {'imageId5': res['fileId']})
   store.state.imageUrl5 = URL.createObjectURL(file.raw)
  imageUrl5.value = URL.createObjectURL(file.raw);
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
