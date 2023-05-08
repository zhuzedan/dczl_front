<template>
  <div class="about">
    <el-col :span="24" style="margin-top: 20px;">
      <el-avatar
      style="width:200px;height:200px;"
      :src="url"
      ></el-avatar>
    </el-col>
    <el-col :span="24" style="margin-top: 20px;">
      <span>电动车租赁平台，为大学生提供优质服务</span>
      <span>加盟热线:6100405040</span>
    </el-col>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: 'https://img.zcool.cn/community/0123aa57ac5a9f0000018c1b20920e.jpg@1280w_1l_2o_100sh.jpg'
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {

  },
}
</script>
<style scoped lang='scss'>
.about {
  text-align: center;
  align-items: center;
}
</style>
