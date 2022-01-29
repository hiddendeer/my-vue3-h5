<template>
  <div class="row">
    <div class="card1-select col-md-4 col-xs-12">
      <q-card flat bordered>
        <q-card-section class="card1-section">
          <div class="text-h7 font-medium text-blue-900">
            订单号：{{ orderCode }}
          </div>
        </q-card-section>
        <q-separator inset />
        <div style="width: 60%; position: relative; left: 16px">
          <q-input
            v-model="searchNode"
            label="查询"
            counter
            maxlength="30"
            :dense="dense"
          >
            <template v-slot:append>
              <q-icon
                v-if="searchNode !== ''"
                name="close"
                @click="clearClick"
                class="cursor-pointer"
              />
              <q-icon
                name="search"
                class="cursor-pointer"
                @click="searchClick(searchNode)"
              />
            </template>
          </q-input>
        </div>

        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 82vh"
        >
          <div class="q-pa-md q-gutter-sm">
            <q-tree
              v-if="showTree"
              ref="qTree"
              v-model:ticked.sync="ticked"
              :nodes="initTree"
              node-key="label"
              @lazy-load="onLazyLoad"
              @update:ticked="showTickedNodes"
              tick-strategy="leaf"
            />
          </div>
        </q-scroll-area>
      </q-card>
    </div>
    <div class="col-md-8 col-xs-12 card2-select">
      <q-card flat bordered class="card2-node">
        <q-card-section class="flex justify-between card2-section">
          <div class="text-h7 flex items-center card--left-title">
            已选中类别（<span v-if="qTicked.length > 9" class="text-red-500">{{
              qTicked.length
            }}</span>
            <span v-else>{{ qTicked.length }}</span
            >）
          </div>
          <q-btn
            class="relative right-3"
            color="secondary"
            size="sm"
            label="提交"
            @click="submit"
          />
        </q-card-section>
        <q-separator inset />

        <div style="width: 100%; padding: 20px">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :content-style="contentStyle"
            :content-active-style="contentActiveStyle"
            style="height: 82vh"
          >
            <el-collapse
              v-model="activeNames"
              v-for="(item, index) in showNode"
              :key="index"
              @change="handleChange"
            >
              <el-collapse-item name="1">
                <template #title>
                  <span>{{ item.groupName }} </span>
                  <span style="padding-left: 10px">
                    <span style="display: inline; color: orange">已选中</span>
                    (<span :style="item.selectSum > 9 ? 'color: red;' : ''">
                      {{ item.selectSum }}</span
                    >)
                  </span>
                </template>
                <div
                  class="flex"
                  style="margin-top: 10px"
                  v-for="(i, k) in item.parent"
                  :key="k"
                >
                  <div class="flex-1" style="text-align: center">
                    {{ i.fullName }}
                  </div>
                  <div class="flex-6">
                    <q-chip
                      removable
                      v-for="(v, key) in i.nodes"
                      :key="key"
                      outline
                      color="primary"
                      text-color="white"
                      @remove="removeNode(index, k, key)"
                    >
                      {{ v.serverName }}
                    </q-chip>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </q-scroll-area>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  getServersByLevel,
  getServerLastLevel,
  getAllServersByName,
  update,
} from "@/api/rest";
import { ref, nextTick, toRaw, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  setup() {

    const $q = useQuasar();
    const $router = useRouter();
    const qTree = ref();
    const ticked = ref([]);
    const initTree = ref([]);
    const searchNode = ref("");
    const taskId = ref(localStorage.taskId);
    const orderCode = ref(localStorage.orderCode);
    const auth = ref(localStorage.auth);
    let showTree = ref(true);
    let qNode = ref([]);
    let qTicked = ref([]);
    let showNode = ref([]);
    let node1Filter = ref([]);

    onMounted(() => {
      serversByLevel();
    });

    const activeNames = ref(["1"]);
    const handleChange = (val) => {
      console.log(val);
    };

    const removeNode = (node1, node2, node3) => {
      const serverName =
        showNode.value[node1].parent[node2].nodes[node3].serverName;
      const nodeIndex = qNode.value.findIndex(
        (item) => item.serverName == serverName
      );

      const tickIndex = qTicked.value.findIndex((item) => item == serverName);
      qTicked.value.splice(tickIndex, 1);

      showNode.value[node1].parent[node2].nodes.splice(node3, 1);
      showNode.value[node1].selectSum -= 1;

      if (showNode.value[node1].parent[node2].nodes.length == 0) {
        showNode.value[node1].parent.splice(node2, 1);
      }

      if (showNode.value[node1].parent.length == 0) {
        showNode.value.splice(node1, 1);
        node1Filter.value.splice(nodeIndex, 1);
      }

      qNode.value.splice(nodeIndex, 1);
    };

    const showTickedNodes = (e) => {
      qTree.value.$forceUpdate();
      nextTick(() => {
        // 界面展示数据
        if (e.length == 0) {
          showNode.value = []
        }
           // 取消勾选处理
           if (qTicked.value.length > 0 && e.length < qNode.value.length) {
             let node = -1
             for (const key in qTicked.value) {
               if (!e.includes(qTicked.value[key])) {
                 node = key;
                 break;
               }
             }
             if (node > -1) {
  
               const nodeItem= qNode.value.find(item => item.serverName == qTicked.value[node])
                const node1 = showNode.value.findIndex(item => item.groupId == nodeItem.groupId)
                if (node1 > -1) {
                  const node2 = showNode.value[node1].parent.findIndex(item => item.parentId == nodeItem.parentId)
                  const node3 = showNode.value[node1].parent[node2].nodes.findIndex(item => item.severId == nodeItem.severId)
                  if (node3 > -1) {
                    showNode.value[node1].parent[node2].nodes.splice(node3, 1)
                  }
               }

             }

           }

     
        
        qTicked.value = e;

        // 提交的数据
        let nodeArr = qTree.value.getTickedNodes().map((item) => toRaw(item));

        if (nodeArr.indexOf(null) > -1) {
          const lastNode = nodeArr.pop()
          qNode.value.push(lastNode)
        } else {
          qNode.value = nodeArr.filter((item) => item);
        }

        let nodesFilter = qNode.value.filter((item) => item);
        if (nodeArr.length > 0) {
          for (const item of nodesFilter) {
            if (item.groupId) {
              const IsGroupId = node1Filter.value.findIndex(
                (itemIndex) => item.groupId == itemIndex.groupId
              );
              if (IsGroupId == -1) {
                node1Filter.value.push({
                  groupId: item.groupId,
                  groupName: item.groupName,
                  parent: [],
                });
              }
            }
          }
          if (node1Filter.value.length > 0) {
            for (const item of nodesFilter) {
              const isParent = node1Filter.value.findIndex(
                (itemIndex) => item.groupId == itemIndex.groupId
              );
              let parentIndex = node1Filter.value[isParent].parent.findIndex(
                (itemIndex) => item.parentId == itemIndex.parentId
              );
              if (parentIndex == -1) {
                node1Filter.value[isParent].parent.push({
                  parentId: item.parentId,
                  fullName: item.fullName,
                  nodes: [],
                });
              }
            }
            for (const item of nodesFilter) {
              const isParent = node1Filter.value.findIndex(
                (itemIndex) => item.groupId == itemIndex.groupId
              );
              let parentIndex = node1Filter.value[isParent].parent.findIndex(
                (itemIndex) => item.parentId == itemIndex.parentId
              );
              if (parentIndex > -1) {
                const isNode = node1Filter.value[isParent].parent[
                  parentIndex
                ].nodes.findIndex(
                  (itemIndex) => item.severId == itemIndex.severId
                );
                if (isNode == -1) {
                  node1Filter.value[isParent].parent[parentIndex].nodes.push({
                    severId: item.severId,
                    serverName: item.serverName,
                  });
                }
              }
            }
          }
          let shoNode = node1Filter.value.map((item) => toRaw(item));
          for (const key in shoNode) {
            shoNode[key].selectSum = 0;
            for (const k in shoNode[key].parent) {
              shoNode[key].selectSum += shoNode[key].parent[k].nodes.length;
            }
          }
          showNode.value = shoNode;

        }
        // qNode.value = nodeArr.filter((item) => item);
      });
    };

    const serversByLevel = async () => {
      const getInfo = await getServersByLevel();
      showTree.value = true;
      if (getInfo.code == "200" && getInfo.allServers.length > 0) {
        getInfo.allServers.forEach((item) => {
          item.noTick = true;
          if (item.children && item.children.length > 0) {
            item.children.forEach((i) => {
              i.noTick = true;
              i.lazy = true;
            });
          }
        });
        initTree.value = getInfo.allServers;
      }
    };

    // 搜索方法
    const searchAllServersByName = async () => {
      const searchNodes = await getAllServersByName({
        serverName: searchNode.value,
      });
      showTree.value = true;
      if (searchNodes.code == "200" && searchNodes.allServers.length > 0) {
        searchNodes.allServers.forEach((item) => {
          item.noTick = true;
          if (item.children && item.children.length > 0) {
            item.children.forEach((i) => {
              i.noTick = true;
              // i.lazy = true;
            });
          }
        });
        initTree.value = searchNodes.allServers;
      }
    };

    // 搜索
    const searchClick = () => {
      showTree.value = false;

      if (searchNode.value != "") {
        searchAllServersByName();
      } else {
        serversByLevel();
      }
    };

    //清除
    const clearClick = () => {
      searchNode.value = "";
      serversByLevel();
    };
    // 提交
    const submit = () => {
      if (!qNode.value || qNode.value.length == "0") {
        $q.dialog({
          title: "无法提交",
          message: "请确认选择订单类别",
        });
        return;
      }

      $q.dialog({
        title: "确认",
        message: "点击确认即可提交信息",
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        const submitInfo = toRaw(qNode.value);
        const serverMap = submitInfo.map((item) => item.severId);
        const serverIds = serverMap.join(",");
        update({ taskId: taskId.value, serverIds }).then((res) => {
          if (res.code && res.code == "200") {
            $q.notify({
              position: "top",
              type: "positive",
              message: "提交成功, 管理员将会即时处理",
              timeout: 1500,
            });
            localStorage.clear();
            $router.push("/login");
          } else if (res.code && res.code == "202") {
            $q.notify({
              position: "top",
              type: "negative",
              message: res.msg,
              timeout: 1500,
            });
            localStorage.clear();
            $router.push("/login");
          } else {
            $q.notify({
              position: "center",
              type: "negative",
              message: "提交失败, 请联系管理员",
              timeout: 1500,
            });
          }
        });
      });
    };

    return {
      removeNode,
      showNode,
      node1Filter,
      showTree,
      handleChange,
      activeNames,
      auth,
      initTree,
      searchNode,
      clearClick,
      searchClick,
      serversByLevel,
      searchAllServersByName,
      dense: ref(false),
      qTree,
      qNode,
      qTicked,
      showTickedNodes,
      submit,
      ticked,
      taskId,
      orderCode,
      contentStyle: {
        backgroundColor: "#fff",
        color: "#555",
      },

      contentActiveStyle: {
        backgroundColor: "#fff",
        color: "black",
      },

      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#fff",
        width: "5px",
        opacity: 0.75,
      },

      async onLazyLoad({ node, key, done, fail }) {
        const currentNode = toRaw(node);
        if (!currentNode.severId || currentNode.severId == "") {
          return;
        }

        const selectNodes = await getServerLastLevel({
          serverId: currentNode.severId,
        });

        if (
          selectNodes.code != "200" ||
          !selectNodes.lastServer ||
          selectNodes.lastServer.length == "0"
        ) {
          $q.notify({
            position: "top",
            type: "negative",
            message: selectNodes.msg,
            timeout: 1500,
          });
          localStorage.clear();
          $router.push("/login");
        }
        setTimeout(() => {
          if (key.indexOf("Lazy load empty") > -1) {
            done([]);
            return;
          }
          done(selectNodes.lastServer);
        }, 1000);
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.card1-select
  min-height: calc(100vh - 60px)
  padding: 10px 10px 0px 10px
  .card1-section
    padding: 21px 0px 6px 17px

.card2-select
  padding: 10px 10px 0px 10px
  .card2-node
    min-height: calc(100vh - 87px)
    .card2-section
      padding: 10px 10px 12px 16px

.card--left-title
  margin-left: -24px
  padding: 2px 10px 2px 24px
  background: #e0e0e0
  color: #616161
  position: relative
  border-radius: 3px 5px 5px 0
  &::after
    content: ""
    position: absolute
    top: 100%
    left: 0
    width: 0
    height: 0
    border: 0 solid transparent
    border-top-color: #bebebe
    border-width: 9px 0 0 11px

.q-field--with-bottom
  padding-bottom: 0px
</style>
