<template>
  <el-row class="step-xzcx">
    <el-card class="info">
      <el-descriptions title="您已预定的信息如下：" :column="2" :colon="false">
        <el-descriptions-item label="取车时间：">{{params.takeDate +' '+params.takeTime}}</el-descriptions-item>
        <el-descriptions-item label="还车时间：">{{params.giveDate +' '+params.giveTime}}</el-descriptions-item>
        <el-descriptions-item label="取车门店：">{{params.takeShop}}</el-descriptions-item>
        <el-descriptions-item label="还车门店：">{{params.giveShop}}</el-descriptions-item>
      </el-descriptions>
      <span class="txt-F12">友情提示：请合理安排你的用车时间</span>
    </el-card>
    <el-card >
      <el-col :span="12">
          <el-input v-model="pageInfo.lowPrice" placeholder="最小价格区间"></el-input>
      </el-col>
      <el-col :span="12">
        <el-input v-model="pageInfo.highPrice" placeholder="最大价格区间"></el-input>
      </el-col>
      <el-col :span="12" style="margin-top: 20px;margin-bottom: 20px;">
        <el-button type="primary" @click="queryPage">查询</el-button>
        <el-button type="primary" @click="clearPage">重置</el-button>
      </el-col>
    </el-card>
    <el-row class="list">
      <div class="item" v-for="(item,index) in list" :key="index">
        <el-image :src="item.bikeUrl" fit="cover"/>
        <div class="column">
          <span class="txt-FF8">{{item.bikeName}}</span>
          <span class="txt-606">{{enumeStatus[item.bikeStatus]}}</span>
          <span class="txt-606">
            基本保险：{{item.bikeInsure}} 元/天
          </span>
          <span class="txt-606">
            限公里数：{{item.kilometers||'无限制'}}
          </span>
        </div>
        <span class="txt-606-24">
          ￥
          <span class="txt-FF8-48">
            {{item.bikeCost}}
          </span>
          /天
        </span>
        <el-button type="primary" @click="advance(item)">立即预定</el-button>
      </div>
    </el-row>
    <el-row class="pagination">
      <el-pagination
        @current-change="currentChange"
        @size-change="sizeChange"
        :current-page="pageInfo.pageNo"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-row>
  </el-row>
</template>
<script>
import mixin from '@/mixins/common.js'
import commonApi from '@/api/common.js';
export default {
  mixins: [mixin],
  props: {
    step: {
      type: Number,
      default: 1
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data () {
    return {
      form: {
        range: ['-1'], // 价格筛选
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        lowPrice:'',
        highPrice:''
      },
      list: []
    }
  },
  mounted() {
    this.queryPage();
  },
  methods: {
    clearPage() {
      this.pageInfo.lowPrice= '',
      this.pageInfo.highPrice='',
      this.queryPage()
    },
    queryPage() {
      commonApi.getBikes(this.pageInfo).then((res) => {
        if (res.code === 200) {
          this.list = res.data.data;
          this.pageInfo.total = res.data.totalCount;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    currentChange(val) {
      this.pageInfo.pageNo = val;
      this.queryPage();
    },
    sizeChange(val) {
      this.pageInfo.pageSize = val;
      this.queryPage();
    },
    advance(item) {
      Object.assign(this.params,item);
      this.$emit('update:step', 2);
    }
  }
}
</script>
<style lang="scss" scoped>
.step-xzcx{
  .el-card.is-always-shadow{
    margin-top: 10px;
  }
  .filter{
    /deep/ .el-card__body{
      float: right;
    }
    .el-button--primary{
      float: right;
      border-radius: 2px;
      border-color: #FF8F4B;
      background: #FF8F4B;
      &:hover{
        border-color: #FFD04B;
        background: #FFD04B;
      }
    }
  }
  .list{
    border: 1px solid #E7E7E7;
    margin: 24px 0 0;
    .item{
      border-bottom: 1px solid #E7E7E7;
      padding: 20px;
      display: flex;
      justify-items: center;
      .el-image{
        width: 200px;
        height: 150px;
      }
      .column{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 30px;
        .txt-FF8{
          font-size: 24px;
          color: #FF8F4B;
        }
        .txt-606{
          color: #606266;
        }
      }
      .txt-FF8-48{
        font-size: 48px;
        color: #FF8F4B;
      }
      .txt-606-24{
        text-align: center;
        font-weight: bold;
        font-size: 24px;
        color: #606266;
        align-self: center;
        flex: 1;
      }
      .el-button--primary{
        align-self: center;
        border-radius: 2px;
        border-color: #FF8F4B;
        background: #FF8F4B;
        &:hover{
          border-color: #FFD04B;
          background: #FFD04B;
        }
      }
    }
  }
  .pagination{
    padding: 10px 0;
    text-align: right;
  }
  .txt-F12{
    font-size: 12px;
    color: #F12C1E;
  }
}
</style>