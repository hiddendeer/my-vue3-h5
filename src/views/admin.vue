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
    >
      <template v-slot:top-right>
        <q-btn flat color="green" label="导出Excel" @click="clickExcel" />
        <q-btn flat color="primary" label="新增" @click="addOrder" />
      </template>

      <template v-slot:body-cell-orderStateName="props">
        <q-td :props="props">
          <div v-if="props.row.orderState == '2'">
            <q-badge color="green" :label="props.row.orderStateName" />
            <q-btn
              flat
              rounded
              size="xs"
              color="primary"
              label="查看"
              @click="viewOrder(props.row.serverIds)"
              style="margin-left: 3px"
            />
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
    <q-card>
      <q-card-section class="flex justify-between">
        <div class="text-h6">选中的类别</div>
         <q-btn flat round color="brown-5" icon="close" @click="closeDialog" />
      </q-card-section>
      <q-separator />

      <q-card-section
        class="q-pt-none selectWidth"
        style="min-width: 230px;postion: relative; top: 20px"
      >
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
const initialPagination = {
  descending: false,
  page: 1,
  rowsPerPage: 20,
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

import { list, save, exportExcel } from "@/api/rest";
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
    const authCode = ref("");
    const loading = ref(false);
    const fullWidth = ref(false);
    const position = ref("right");
    const selected = ref([]);
    const tagFilter = ref([]);

    onMounted(() => {
      listData();
    });

    const closeDialog = () => {
      fullWidth.value = false
    }

    const addOrder = () => {
      alert.value = true;
    };

    const viewOrder = (param) => {
      tagFilter.value = param
      fullWidth.value = true;
    };

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

    return {
      position,
      closeDialog,
      viewOrder,
      tagFilter,
      fullWidth,
      loading,
      clickExcel,
      selected,
      orderCode,
      authCode,
      alert,
      addOrder,
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
  max-width: 400px;
}
</style>