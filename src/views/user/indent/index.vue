<template>
  <div class="indent-container">
    <el-steps :active="step" simple>
      <el-step title="选择车型" icon="el-icon-s-operation"></el-step>
      <el-step title="填写订单" icon="el-icon-s-claim"></el-step>
      <el-step title="提交成功" icon="el-icon-success"></el-step>
    </el-steps>
    <StepXZCX v-show="step===1" :step.sync="step" :params="form"/>
    <StepTXDD v-show="step===2" :step.sync="step" :params="form"/>
    <StepTJCG v-show="step===3"/>
  </div>
</template>
<script>
import StepXZCX from './step-xzcx.vue';
import StepTXDD from './step-txdd.vue';
import StepTJCG from './step-tjcg.vue';
export default {
  components: {
    StepXZCX,
    StepTXDD,
    StepTJCG
  },
  data () {
    return {
      step: 1,
      form: {
        bikeName: '', // 电车名称
        bikeStatus: '', // 电车状态

        takePlace: '',
        takeShop: '',
        takeDate: '',
        takeTime: '',
        givePlace: '',
        giveShop: '',
        giveDate: '',
        giveTime: '',
      },
    }
  },
  mounted() {
    if(this.$route.query) Object.assign(this.form,this.$route.query);
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.indent-container{
  padding: 0 100px;
}
</style>