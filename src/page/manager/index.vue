<template>
  <div class="manager-container">
    <!-- <Header/> -->
    <el-container>
      <el-aside >
        <Sidebar/>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main style="height: 100vh;">
          <router-view/>
        </el-main>
      </el-container>
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-header {
  padding: 0;
  box-shadow: rgb(144, 147, 153) 0px -1px 3px 0px;
}
    .el-aside{
      background: #FAFAFA;
      width: 240px!important;
    }
    .el-aside::-webkit-scrollbar {
     display: none;
}

}
</style>