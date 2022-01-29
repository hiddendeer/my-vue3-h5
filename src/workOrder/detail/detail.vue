

<template>
  <div>
    <div class="content">
      <!-- 头部信息 -->
      <div class="header">
        <div class="row-normal row1">
          <view class="title font-medium flex">测试安卓消息</view>
          <van-tag
            class="tag"
            color="#FFAA64"
            text-color="#FFAA64"
            size="medium"
            >待接单</van-tag
          >
        </div>

        <div class="row-normal row2">
          <van-tag
            v-for="item in array"
            :key="item"
            class="tag"
            color="#179F7A"
            size="medium"
            text-color="#179F7A"
            >报修</van-tag
          >
        </div>

        <div class="row-normal row3">
          <text class="contxt">{{ project }} | {{ name }}</text>
        </div>
        <div class="row-normal row4">
          <text class="contxt">{{ time }} | {{ time2 }}</text>
        </div>

        <div class="row5">
          <div class="house-person" @click="show = true">
            <img src="../../../image/svg/person.svg" />
            <text style="padding-left: 6px">查看同住人</text>
          </div>
          <div class="phone">
            <img src="../../../image/svg/phone.svg" />
            <text style="padding-left: 6px">联系报修人</text>
          </div>
        </div>
      </div>

      <!-- 详情 -->
      <div class="detail-record">
        <div class="detail-normal detail-font" style="padding-top: 12px">
          <view>任务编号：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>受理人：</view> <view>管理员</view>
        </div>
        <div class="detail-normal detail-font">
          <view>处理人：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>答复时限：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>处理时限：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>功能分区：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>问题分类：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>问题描述：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>责任单位：</view> <view>杭州城市公司202110150027</view>
        </div>
        <div class="detail-normal detail-font">
          <view>维修单位：</view> <view>杭州城市公司202110150027</view>
        </div>
      </div>

      <!-- 操作记录 -->
      <div class="do-record row-normal">
        <div class="title font-medium" style="padding-top: 9px">操作记录</div>
        <div class="do-content">
          <van-steps
            ref="steps"
            style="flex: 13"
            direction="vertical"
            :active="0"
          >
            <van-step v-for="i in 3" :key="i">
              <h3>10-15 12:56</h3>
              <h3>派单</h3>
              <h3>管理员</h3>
              <p style="word-break: break-all">
                派单说明sfsdfsdfsdfsdfsafsdfsfsdfsdfsadfsdfsdfafsfsafaf派单说明sfsdfsdfsdfsdfsafsdfsfsdfsdfsadfsdfsdfafsfsafaf
              </p>
            </van-step>
          </van-steps>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <div class="margin-auto-ud">
        <img
          style="display: inline-block; padding: 4px; padding-bottom: 7px"
          src="../../../image/svg/order.svg"
        /><text>接单</text>
      </div>
      <div class="decoration"></div>
      <div class="margin-auto-ud">
        <img
          style="display: inline-block; padding: 4px; padding-bottom: 7px"
          src="../../../image/svg/handle.svg"
        /><text>处理人</text>
      </div>
      <div class="decoration"></div>
      <div class="margin-auto-ud">
        <img
          style="display: inline-block; padding: 4px; padding-bottom: 7px"
          src="../../../image/svg/more.svg"
        /><text>更多</text>
      </div>
    </div>
    <van-overlay :show="show"  @click="show = false" >
  <div class="wrapper" >
    <div class="block" >
      <div class="select-concat" @click.stop><text>请选择联系人</text></div>
      <div class="select-content" @click.stop>
        <div class="select-out" v-for="item in select_concat" :key="item" >
          <div class="select-inset">
          <text>{{item.name}}</text><text style="padding-left: 10px;">{{item.phone}}</text>
          </div>
        </div>
      </div>
      <div class="select-concat" style="color: #179F7A;"><text>取消</text></div>
    </div>
  </div>
</van-overlay>
  </div>
</template>

<script>
import { getDetail } from "@/api/rest";
export default {
  mounted() {
    getDetail().then((res) => {
      console.log(res);
    });
  },
  methods: {
    click1() {
      console.log(22);
    }
  },
  data() {
    return {
      show: false,
      project: "杭州绿城项目-全期-1栋-1单元",
      name: "张云",
      time: "2021-10-15",
      time2: "处理时限剩余2天18小时",
      array: [1, 2],
      select_concat: [
        {name: '张三',phone: '18795852120'},
        {name: '李四',phone: '18795852127'},
      ],
      rxlc_content: [
        {
          title: "注册",
          text: "家长手机号注册账号",
        },
        {
          title: "新生信息采集",
          text: "报名信息采集，包括新生基础信息、监护人信息和个人相关图片资料上传；提交资料进入审核阶段",
        },
        {
          title: "网上审核",
          text: "网上报名资料提交至区教育局或下属单位进行审核确认",
        },
        {
          title: "现场审核",
          text: "网上报名资料审核通过，根据现场审核要求携带资料到指定地点审核确认",
        },
        {
          title: "录取",
          text: "新生现场审核通过，报读 学校发布录取通知。",
        },
      ],
    };
  },
};
</script>

<style scoped>

body {
  font-family: PingFang SC;
}

.do-content {
  display: flex;
  flex-direction: row;
}

.do-left {
  flex: 4;
  display: flex;
  flex-direction: column;
  text-align: right;
}
.left-node {
  display: flex;
  flex-direction: column;
  padding-top: 7px;
  color: #888;
}

.content {
  padding: 10px;
  overflow: scroll;
  height: calc(100vh - 40px);
}
.content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.header {
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
}
.row-normal {
  padding: 4px 10px 0px 10px;
}
.detail-normal {
  padding: 2px 10px 0px 10px;
}

.row1 .tag {
  background-color: rgb(255, 170, 100, 0.2) !important;
}
.row2 .tag {
  background-color: rgb(23, 159, 122, 0.2) !important;
}

.tag {
  position: relative;
  bottom: 2px;
}

.tag:not(:first-child) {
  margin-left: 8px;
}

.row1 {
  display: flex;
  justify-content: space-between;
  padding-top: 13px;
}

.row1 .title {
  font-size: 16px;
  color: #333333;
}
.row4 {
  padding-bottom: 8px;
}

.contxt {
  font-size: 14px;
  color: #666666;
}

.row5 {
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid #e2e2e2;
  height: 51px;
}

.row5 > * {
  margin: auto 0;
  font-size: 14px;
  color: #179f7a;
}

.house-person {
  display: flex;
}

.phone {
  display: flex;
}

.detail-record {
  margin-top: 8px;
  background-color: #fff;
}

.detail-record :last-child {
  padding-bottom: 6px;
}

.detail-font {
  font-size: 14px;
  color: #888888;
  display: flex;
  box-sizing: border-box;
}

.detail-font :first-child {
  flex: 2;
}

.detail-font :nth-child(2) {
  color: #333333;
  flex: 7;
}

.detail-font text {
  color: #333333;
}

.do-record {
  margin-top: 13px;
  background-color: #fff;
}

.van-steps :deep() .van-steps__items .van-step__circle-container i::before {
  content: "" !important;
  background-color: #179f7a;
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.bottom-content {
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  height: 40px;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #ebedf0;
  padding: 0 10px;
}

.decoration {
  border-right: 1px solid;
  height: 50%;
  border-color: #ebedf0;
  margin: auto 0;
}

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 160px;
    background-color: #fff;
    border-radius: 6px;
  }

  .block :first-child{
    flex:1;
  }

  .block :last-child {
    flex:1;
  }

  .select-concat {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: #333333;
  }

  .select-content > * {
    height: 40px;
  }

  .select-out {
    display:table;width: 100%;border-top: 1px solid #ebedf0;border-bottom: 1px solid #ebedf0;
  }

  .select-content :last-child{
    border-top: none;
  }

  .select-inset {
    display:table-cell;vertical-align: middle;font-size: 13px;font-weight:400;color:#333333;padding-left: 35px;
  }

</style>


