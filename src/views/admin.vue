<template>
  <div class="q-pa-md">
    <q-table
      v-model:selected="selected"
      selection="multiple"
      title="订单"
      :rows="rows"
      :columns="columns"
      row-key="orderCode"
      :pagination="initialPagination"
      color="primary"
      @row-click="clickRow"
    >
      <template v-slot:top-right>
        <q-btn flat color="green" label="导出Excel" @click="clickExcel" />
         <q-btn flat color="green" label="导出Zip" @click="clickZip" />
        <q-btn flat color="primary" label="新增" @click="addOrder" />
      </template>

      <template v-slot:body-cell-orderStateName="props">
        <q-td :props="props">
          <div v-if="props.row.orderState == '3'">
            <q-badge color="green" :label="props.row.orderStateName" />
          </div>
          <div v-else>
            <q-badge color="primary" :label="props.row.orderStateName" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="alert" persistent>
    <q-card style="min-height: 40%; min-width: 70%">
      <q-card-section>
        <div class="text-h8">新增订单</div>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="orderCode"
            label="订单号"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '请填写订单号']"
          />

          <q-input
            v-model="authCode"
            type="number"
            label="验证码"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || '请填写验证码']"
          />

          <q-select
            v-model="selectModel"
            :options="selectOptions"
            label="选择类目 (默认全选)"
            multiple
            emit-value
            map-options
            clearable
          >
            <template
              v-slot:option="{ itemProps, opt, selected, toggleOption }"
            >
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label v-html="opt.label" />
                </q-item-section>
                <q-item-section side>
                  <q-toggle
                    :model-value="selected"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="取消"
            type="reset"
            size="10px"
            color="red"
            v-close-popup
          />
          <q-btn label="提交" type="submit" size="10px" color="secondary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

  <q-dialog v-model="fullWidth" full-height maximized :position="position">
    <q-card style="position: relative; width: 500px">
      <q-card-section class="flex justify-between">
        <div class="text-h6">选中的类别</div>
        <q-btn flat round color="brown-5" icon="close" @click="closeDialog" />
      </q-card-section>
      <q-separator />

      <q-card-section
        class="q-pt-none selectWidth"
        style="postion: relative; top: 20px"
      >
        <div v-if="detailInfo.orderState == '3'" class="flex justify-end">
          <q-btn flat color="red" @click="clickStatus('4')" label="拒绝" />
          <q-btn flat color="green" @click="clickStatus('2')" label="批准" />
          <el-divider></el-divider>
        </div>
        <div
          class="flex justify-center"
          style="font-size: 16px; margin-bottom: 20px"
        >
          <div>注册商标名:</div>
          <div style="padding-left: 8px; color: #ff5722">
            {{ detailInfo.trademarkName }}
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-around;
          "
        >
          <div v-for="item in detailInfo.files" :key="item">
            <div style="width: 100px; height: 100px">
              <el-image
                style="width: 100px; height: 100px"
                :src="item.filePath"
                :initial-index="4"
                :preview-src-list="srcList"
                fit="cover"
              >
              </el-image>
              <div
                style="
                  text-align: center;
                  position: relative;
                  top: 10px;
                  font-weight: 500;
                "
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
        <div style="position: relative; top: 100px">
          <q-chip
            v-for="item in tagFilter"
            :key="item"
            color="deep-orange"
            outline
            text-color="white"
            icon="done"
          >
            {{ item }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
const initialPagination = {
  descending: false,
  page: 1,
  rowsPerPage: 8,
};
const columns = [
  {
    name: "orderCode",
    label: "订单号",
    align: "left",
    field: (row) => row.orderCode,
  },
  { name: "authCode", align: "left", label: "验证码", field: "authCode" },
  {
    name: "orderStateName",
    label: "订单状态",
    align: "left",
    field: "fat",
    sortable: true,
  },
  { name: "createDate", label: "开始日期", align: "left", field: "createDate" },
  { name: "updateDate", label: "完成日期", align: "left", field: "updateDate" },
];

import {
  list,
  save,
  exportExcel,
  getServersByParams,
  infoView,
  examine,
  exportZip
} from "@/api/rest";
import { ref, toRaw, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const pageSize = ref(20000);
    const alert = ref(false);
    const rows = ref([]);
    const orderCode = ref("");
    const detailInfo = ref({});
    const authCode = ref("");
    const loading = ref(false);
    const fullWidth = ref(false);
    const position = ref("right");
    const selected = ref([]);
    const tagFilter = ref([]);
    const selectModel = ref([]);
    const selectOptions = ref([]);

    const srcList = ref([]);

    onMounted(() => {
      listData();
      getNodeList();
    });

    const closeDialog = () => {
      fullWidth.value = false;
    };

    const addOrder = () => {
      alert.value = true;
    };

    const clickRow = (evt, row) => {
      fullWidth.value = true;
      infoView({ taskId: row.taskId }).then((res) => {
        if (res.code == "200" && res.data && res.data.length > 0) {
          detailInfo.value = res.data[0];

          if (detailInfo.value.files && detailInfo.value.files.length > 0) {
            let typeObj = {
              1: "身份正面",
              2: "身份反面",
              3: "个体执照",
              4: "公司执照",
              5: "公章",
              6: "logo图",
            };
            let filterStr = "";
            detailInfo.value.files.forEach((item) => {
              item.label = "";
              if (typeObj[item.type]) {
                item.label = typeObj[item.type];
              }
              console.log(item.label, 22);
              item.filePath =
                "http://49.235.66.253:7000/images/" + item.filePath;

              // 处理标签数据
            });

            detailInfo.value.servers.forEach((item) => {
              filterStr += item.serverNames + ";";
            });

            tagFilter.value = filterStr.split(";");
            tagFilter.value = tagFilter.value.filter((s) => s && s.trim());

            srcList.value = detailInfo.value.files.map((item) => item.filePath);
          }
        }
      });
    };

    const clickStatus = (status) => {
      let data = {
        taskId: detailInfo.value.taskId,
        userId: localStorage.getItem("userId"),
        orderState: status,
      };

      fullWidth.value = false;
      listData();

      examine(data).then((res) => {
        if (res.code == "200") {
          listData();
        }
      });
    };

    const viewOrder = (param) => {
      // tagFilter.value = param;
      // fullWidth.value = true;
    };

    const clickZip = () => {
           let info = toRaw(selected.value);
      let taskIds = [];
      info.forEach((item) => {
        taskIds.push(toRaw(item));
      });
      if (taskIds.length > 0) {
        const taskIdMap = taskIds.map((item) => item.taskId);
        const taskId = taskIdMap.join(",");
        exportZip({ taskId }).then((res) => {
          if (!res) {
            $q.notify({
              position: "top",
              type: "negative",
              message: res.msg,
              timeout: 1500,
            });
          }
          const content = res;
          const blob = new Blob([content]);
          const elink = document.createElement("a");
          elink.download = "压缩包.zip";
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
        });
      } else {
        $q.notify({
          position: "top",
          type: "negative",
          message: "请选择订单",
          timeout: 1500,
        });
      }


    }

    const clickExcel = () => {
      let info = toRaw(selected.value);
      let taskIds = [];
      info.forEach((item) => {
        taskIds.push(toRaw(item));
      });
      if (taskIds.length > 0) {
        const taskIdMap = taskIds.map((item) => item.taskId);
        const taskId = taskIdMap.join(",");
        exportExcel({ taskId }).then((res) => {
          if (!res) {
            $q.notify({
              position: "top",
              type: "negative",
              message: res.msg,
              timeout: 1500,
            });
          }
          const content = res;
          const blob = new Blob([content]);
          const elink = document.createElement("a");
          elink.download = "表格.xls";
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
        });
      } else {
        $q.notify({
          position: "top",
          type: "negative",
          message: "请选择订单",
          timeout: 1500,
        });
      }
    };

    const onSubmit = () => {
      if (orderCode.value == "" || authCode.value == "") {
        $q.notify({
          position: "top",
          type: "negative",
          message: "请填写正确的订单号或者验证码",
          timeout: 1500,
        });
        return;
      }

      const jsonData = {
        createor: localStorage.userId,
        orderCode: orderCode.value,
        authCode: authCode.value,
      };

      if (selectModel.value && selectModel.value.length > 0) {
        const list = selectModel.value.map((item) => item.severId);
        jsonData.firstServer = list.join(",");
      }

      save(jsonData).then((res) => {
        if (res.code == "200") {
          alert.value = false;
          orderCode.value = "";
          authCode.value = "";
          $q.notify({
            position: "top",
            type: "positive",
            message: "订单成功生成",
            timeout: 1500,
          });
        } else {
          $q.notify({
            position: "top",
            type: "negative",
            message: res.msg,
            timeout: 1500,
          });
        }
        listData();
      });
    };

    const listData = () => {
      loading.value = true;
      list({ pageSize: pageSize.value, currPage: 1 }).then((res) => {
        loading.value = false;
        if (res.code == "200") {
          if (res.page.list && res.page.list.length > 0) {
            res.page.list.forEach((item) => {
              if (item.serverIds) {
                item.serverIds = item.serverIds.split(",");
              }
            });
          }
          rows.value = res.page.list;
        } else if (res.code == "202") {
          $q.notify({
            position: "top",
            type: "negative",
            message: res.msg,
            timeout: 1500,
          });
          setTimeout(() => {
            $router.push("/login_m");
          }, 1500);
          return;
        } else {
          $q.notify({
            position: "top",
            type: "negative",
            message: "服务器API错误",
            timeout: 1500,
          });
        }
      });
    };

    const getNodeList = () => {
      getServersByParams({ level: "1" }).then((res) => {
        if (res.code == "200") {
          selectOptions.value = res.servers;
        }
      });
    };

    return {
      clickRow,
      clickStatus,
      srcList,
      detailInfo,
      selectOptions,
      position,
      closeDialog,
      viewOrder,
      tagFilter,
      fullWidth,
      loading,
      clickExcel,
      clickZip,
      selected,
      orderCode,
      authCode,
      alert,
      addOrder,
      getNodeList,
      onSubmit,
      onReset() {
        orderCode.value = "";
        authCode.value = "";
      },
      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
      pageSize,
      initialPagination,
      columns,
      rows,
      selectModel,

      options: [
        {
          label: "Google",
          value: 1,
        },
        {
          label: "Facebook",
          value: 2,
        },
        {
          label: "Twitter",
          value: 3,
        },
        {
          label: "Apple",
          value: 4,
        },
        {
          label: "Oracle",
          value: 5,
        },
        {
          label: "Google",
          value: 1,
        },
        {
          label: "Facebook",
          value: 2,
        },
        {
          label: "Twitter",
          value: 3,
        },
        {
          label: "Apple",
          value: 4,
        },
        {
          label: "Oracle",
          value: 5,
        },
      ],
    };
  },
};
</script>

<style  scoped>
.card-position {
  width: 85vw;
  margin: auto;
  height: calc(100vh - 70px);
  position: relative;
  top: 10px;
}

.fullscreen {
  padding: 0;
}

.selectWidth {
  /* max-width: 400px; */
}

.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>