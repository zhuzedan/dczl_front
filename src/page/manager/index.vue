<template>
  <div class="manager-container">
    <!-- <Header/> -->
    <el-container>
      <el-aside>
        <Sidebar/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Header from '../common/header.vue';
import Sidebar from "../common/sidebar/index.vue";
export default {
  components: {
    Header,
    Sidebar
  },
  data () {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.manager-container{
  height: 100%;
  .el-container{
    height: calc(100vh - 65px);
    .el-aside{
      background: #FAFAFA;
      width: 240px!important;
    }
  }
}
</style>