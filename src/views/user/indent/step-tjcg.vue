<template>
  <el-row class="step-txdd">
    <i class="el-icon-success"/>
    <p>提交成功</p>
    <span>请前往个人中心查看订单</span>
  </el-row>
</template>
<script>
export default {
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

    }
  },
  mounted() {

  },
  methods: {
    query() {

    }
  }
}
</script>
<style lang="scss" scoped>
.step-txdd{
  padding: 100px;
  text-align: center;
  .el-icon-success{
    font-size: 120px;
    color: #67C23A;
  }
  p{
    font-weight: bold;
    font-size: 20px;
  }
  span{
    font-size: 16px;
    color: #909399
  }
}
</style>