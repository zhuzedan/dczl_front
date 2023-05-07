<template>
  <el-row class="step-txdd">
    <el-row class="row-flex">
      <el-image :src="params.bikeUrl" fit="cover"/>
      <div class="info">
        <div style="margin-bottom:16px;">
          <span class="txt-606 fs-28">{{params.bikeName}}</span>
          <span class="txt-606 fs-20">{{enumeStatus[params.bikeStatus]}}</span>
          <!-- <span class="txt-606 fs-20">租期：{{params.tenancy}}</span> -->
          <el-link type="primary" @click="back">返回修改</el-link>
        </div>
        <el-descriptions title="订单信息：" :column="2" :colon="false">
          <el-descriptions-item label="取车时间：">{{params.takeDate +' '+params.takeTime}}</el-descriptions-item>
          <el-descriptions-item label="还车时间：">{{params.giveDate +' '+params.giveTime}}</el-descriptions-item>
          <el-descriptions-item label="取车地点：">{{params.takePlace}}</el-descriptions-item>
          <el-descriptions-item label="还车地点：">{{params.givePlace}}</el-descriptions-item>
          <el-descriptions-item label="取车门店：">{{params.takeShop}}</el-descriptions-item>
          <el-descriptions-item label="还车门店：">{{params.giveShop}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="订单说明：" :column="1" :colon="false">
          <el-descriptions-item>
            不限公里数，超时费50元/小时，预授权5000元(可退)，违章押金2000元(可退)。
          </el-descriptions-item>
          <el-descriptions-item>
            <span class="txt-F12">友情提示：请合理安排你的用车时间</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-row>
    <el-row class="row-block">
      <div class="title">支付方式</div>
      <div class="content">
        <el-radio v-model="form.payment" label="1">在线支付</el-radio>
        <span class="txt-909">请在1小时内完成在线支付</span>
      </div>
    </el-row>
    <el-row class="row-block">
      <div class="title">其他服务</div>
      <div class="content">
        <div class="flex-normal">
          <el-checkbox v-model="form.service1">不计免赔服务</el-checkbox>
          <span class="txt-FF8">￥ 50</span>
          <span class="txt-909">请在1小时内完成在线支付</span>
        </div>
        <div class="flex-normal">
          <el-checkbox v-model="form.service2">第三责任补充险</el-checkbox>
          <span class="txt-FF8">￥ 125</span>
          <span class="txt-909">请在1小时内完成在线支付</span>
        </div>
      </div>
    </el-row>
    <el-row class="row-block">
      <div class="title">常用联系人</div>
      <div class="content">
        <el-radio-group v-model="form.contacts">
          <el-radio label="1">范立强</el-radio>
          <el-radio label="2">张三</el-radio>
          <el-radio label="3">李四</el-radio>
        </el-radio-group>
      </div>
    </el-row>
    <el-row class="row-block">
      <div class="title">备注信息</div>
      <div class="content">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="form.remarks"
          maxlength="100"
          show-word-limit
          :rows="4"
        />
        <br/>
        <div class="flex-center">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </div>
    </el-row>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex';
import mixin from '@/mixins/common.js'
import commonApi from '@/api/common.js';
export default {
  mixins: [mixin],
  computed: {
    ...mapGetters(['user']),
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    params: {
      type: Object,
      default: () => {}
    },
  },
  data () {
    return {
      form: {
        payment: '1', // 支付方式
        service1: true, // 服务1
        service2: true, // 服务2
        contacts: '1', // 联系人
        remarks: '', // 备注
      }
    }
  },
  mounted() {

  },
  methods: {
    back() {
      this.$emit('update:step', 1);
    },
    submit() {
      const params = {
        userId: this.user.id,
        bikeId: this.params.id,
        mileage: 100,
        orderCost: this.params.bikeCost,
        startLocation: this.params.takePlace + '-' + this.params.takeShop,
        endLocation: this.params.givePlace + '-' + this.params.giveShop,
        startTime: this.params.takeDate + ' ' + this.params.takeTime,
        endTime: this.params.giveDate + ' ' + this.params.giveTime,
      }
      commonApi.insertOrder(params).then((res) => {
        if (res.code === 200) {
          this.$message.success('订单提交成功');
          this.$emit('update:step', 3);
        } else {
          this.$message.warning(res.message);
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.step-txdd{
  .row-flex{
    border: 1px solid #E7E7E7;
    padding: 20px;
    display: flex;
    .el-image{
      width: 240px;
      height: 180px;
    }
    .info{
      flex: 1;
      padding: 0 20px;
      .txt-606{
        color: #606266;
        margin-right: 50px;
      }
      .txt-F12{
        font-size: 14px;
        color: #F12C1E;
      }
      .fs-28{
        font-size: 28px;
      }
      .fs-22{
        font-size: 22px;
      }
      .fs-20{
        font-size: 20px;
      }
      .el-link{
        float: right;
      }
      /deep/ .el-descriptions__header{
        color: #606266;
        margin-bottom: 10px;
      }
      /deep/ .el-descriptions-item__label:empty{
        margin: 0;
      }
      /deep/ .el-descriptions-item__cell{
        padding-bottom: 8px;
      }
    }
  }
  .row-block{
    border: 1px solid #E7E7E7;
    border-top: 0;
    .title{
      background-color: #F5F7FA;
      padding: 16px 30px;
      font-weight: bold;
      color: #606266;
    }
    .content{
      padding: 24px 30px;
      .flex-normal{
        display: flex;
        gap: 50px;
        padding: 20px 0px;
      }
      .flex-center{
        display: flex;
        justify-content: center;
        padding: 50px 0 10px;
      }
      .txt-909{
        font-size: 14px;
        color: #909399;
      }
      .txt-FF8{
        font-size: 18px;
        color: #FF8F4B;
      }
      .el-textarea{
        width: 600px;
      }
      .el-button{
        border-radius: 2px;
        padding: 15px 40px;
      }
      /deep/ .el-radio__label{
        font-weight: bold;
      }
      /deep/ .el-checkbox__label{
        font-weight: bold;
      }
    }
  }
}
</style>