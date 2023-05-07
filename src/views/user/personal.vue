<template>
  <div class="personal-container">
    <el-row class="main">
      <div class="info">
        <el-image :src="formInfo.url" fit="cover"/>
        <p>{{formInfo.account}}</p>
        <p>{{formInfo.phone}}</p>
      </div>
      <div class="indent">
        <h2>订单信息</h2>
        <div class="list">
          <el-row class="item" v-for="(item,index) in list" :key="index" :gutter="50" justify="space-between">
            <el-col :span="6">
              <el-image :src="item.bikeUrl" fit="cover"/>
            </el-col>
            <el-col :span="6">
              <p class="txt-FF8">{{item.bikeName}}</p>
              <p class="txt-606">价格：{{item.orderCost}} 元</p>
            </el-col>
            <el-col :span="6">
              <p class="txt-606">租期：{{item.tenancy||'30天'}}</p>
              <p class="txt-606">
                取车地点：{{item.startLocation}}
              </p>
              <p class="txt-606">
                还车地点：{{item.endLocation}}
              </p>
            </el-col>
            <el-col :span="6" v-if="item.appraiseStar&&item.appraiseDescription">
              <el-rate v-if="item.appraiseStar"
                v-model="item.appraiseStar" 
                show-score text-color="#ff9900" 
                :score-template="item.appraiseStar+' 分'"
              />
              <p class="txt-606" v-if="item.appraiseDescription">
                {{item.appraiseDescription}}
              </p>
            </el-col>
            <el-col :span="6" v-else>
              <el-button type="primary" @click="onAppraise(item)">立即评价</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-row>
    <el-dialog
      title="订单评价"
      width="500px"
      :visible.sync="visible">
      <el-form ref="formAppraise" :model="formAppraise" label-width="100px">
        <el-form-item label="满意度：">
          <el-rate v-model="formAppraise.appraiseStar" show-score text-color="#ff9900" :score-template="formAppraise.appraiseStar+' 分'"/>
        </el-form-item>
        <el-form-item label="评价：">
          <el-input
            :rows="3"
            type="textarea"
            placeholder="请输入"
            v-model="formAppraise.appraiseDescripition"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
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
  data () {
    return {
      formInfo: {
        url: require('@/assets/images/head.png'),
        account: 'admin',
        password: '* * * * * * * *',
        phone: '168****8888',
      },
      list: [
        // {
        //   bikeUrl: 'https://img.zcool.cn/community/0123aa57ac5a9f0000018c1b20920e.jpg@1280w_1l_2o_100sh.jpg',
        //   bikeName: '英格威',
        //   bikeStatus: '1',
        //   bikeInsure: '40',
        //   bikeCost: '120',

        //   tenancy: '2.0天',
        //   kilometers: '无限制',
        // },
        // {
        //   bikeUrl: 'https://img.zcool.cn/community/0123aa57ac5a9f0000018c1b20920e.jpg@1280w_1l_2o_100sh.jpg',
        //   bikeName: '英格威',
        //   bikeStatus: '1',
        //   bikeInsure: '40',
        //   bikeCost: '120',

        //   tenancy: '2.0天',
        //   kilometers: '无限制',
        // },
      ],
      visible: false,
      formAppraise: {
        appraiseStar: 0,
        appraiseDescripition: ''
      },
      pageInfo: {
        userId: '',
        pageNo: 1,
        pageSize: 10,
      }
    }
  },
  mounted() {
    this.queryPage();
  },
  methods: {
    queryPage() {
      this.pageInfo.userId = this.user.id;
      commonApi.getOrdersByUserId(this.pageInfo).then((res) => {
        if (res.code === 200) {
          this.list = res.data.list;
          this.pageInfo.total = res.data.total;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    onAppraise(item) {
      this.visible = true;
      this.formAppraise = item;
      this.formAppraise.orderId = item.id;
    },
    onSubmit() {
      commonApi.insertAppraise(this.formAppraise).then((res) => {
        if (res.code === 200) {
          this.visible = false;
          this.$message.success('评价成功');
          this.queryPage();
        } else {
          this.$message.warning(res.message);
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-container{
  background: #F7F8FA;
  height: calc(100vh - 125px);
  padding: 30px;
  .main{
    display: flex;
    background: #FFF;
    padding: 0px 20px;
    .info{
      border-right: 1px solid #F1F1F1;
      width: 300px;
      padding: 60px 0;
      text-align: center;
      .el-image{
        width: 150px;
        height: 150px;
        box-shadow: 0 2px 4px 6px #d8e2f9a1;
        border-radius: 4px;
        border: 8px solid var(--color-bg-white);
      }
      p{
        font-weight: bold;
        font-size: 20px;
        color: #171b1e;
        margin-top: 24px;
      }
    }
    .indent{
      flex: 1;
      padding: 50px;
      h2{
        font-size: 28px;
        margin: 0 0 20px;
      }
      .list{
        .item{
          width: 100%;
          margin-top: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #F1F1F1;
          [class*=el-col-]{
            height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
          .el-image{
            width: 100%;
            height: 180px;
            object-fit: cover;
          }
          .txt-FF8{
            font-size: 26px;
            color: #FF8F4B;
          }
          .txt-606{
            font-size: 18px;
            color: #606266;
          }
          .el-button{
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
    }
  }
}
</style>