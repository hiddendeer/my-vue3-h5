<template>
  <div class="row" style="background-color: #fafafa">
    <div
      class="col-md-4 col-xs-12 flex justify-end"
      style="margin-right: 10px; flex: 1"
    >
      <el-upload
        :headers="headers"
        :data="data"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">身份证正面照</div>
      </el-upload>
    </div>
    <div class="col-md-4 col-xs-12" style="margin-right: 10px; flex: 1">
      <el-upload
        :headers="headers"
        :data="data"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">身份证国徽照</div>
      </el-upload>
    </div>
    
  </div>

    <div class="row" style="background-color: #fafafa">
    <div
      class="col-md-4 col-xs-12 flex justify-end"
      style="margin-right: 10px; flex: 1"
    >
      <el-upload
        :headers="headers"
        :data="data"
        name="fileImage"
        class="avatar-uploader"
        action="http://49.235.66.253:7000/file/uploadFile"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        <div style="color: #FFAB73;">商标LOGO</div>
      </el-upload>
    </div>
    <div class="col-md-4 col-xs-12" style="margin-right: 10px; flex: 1">
  
    </div>
    
  </div>
  
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type {
  UploadFile,
  ElUploadProgressEvent,
  ElFile,
} from "element-plus/es/components/upload/src/upload.type";
const headers = ref({ token: localStorage.token });
const data = ref({ taskId: localStorage.taskId, type: 1 });
const imageUrl = ref("");
const handleAvatarSuccess = (res: ElUploadProgressEvent, file: UploadFile) => {
  console.log(res,222);
  
  imageUrl.value = URL.createObjectURL(file.raw);
};

</script>

<style>
.avatar-uploader .el-upload {
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>
