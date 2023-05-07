<template>
  <div class="personal-container">
    <el-row class="main">
      <div class="indent">
        <h2>门店信息</h2>
        <div class="list">
          <el-row class="item" v-for="(item,index) in list" :key="index" :gutter="50" justify="space-between">

            <el-col :span="12">
              <p class="txt-FF8">{{item.bikeName}}</p>
              <p class="txt-606">门店名称：{{item.contactName}}</p>
            </el-col>
            <el-col :span="12">
              <p class="txt-606">联系人：{{item.contactName}}</p>
              <p class="txt-606">
                联系人电话：{{item.contactPhone}}
              </p>
              <p class="txt-606">
                门店介绍：{{item.description}}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-row>
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
      list: [
      ],
      visible: false,
      formAppraise: {
        appraiseStar: 0,
        appraiseDescripition: ''
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 10,
      }
    }
  },
  created() {
    commonApi.getStorePage(this.pageInfo).then((res) => {
      console.log(res);
        if (res.code === 200) {
          this.list = res.data.data;
          this.pageInfo.total = res.data.total;
        } else {
          this.$message.warning(res.message);
        }
      });
  },
  methods: {
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