<template>
  <div class="sidebar-container">
    <el-scrollbar>
      <el-menu background-color="#0c1120"
        text-color="#fff">
        <a class="logo">
          <h1>电车租赁后台管理系统</h1>
        </a>
        <SidebarItem v-for="route in routerManager" :key="route.path" :item="route" :base-path="route.path"/>
        <div style="color: #fff;position: absolute;bottom: 0;" @click="handleLogout">退出登录</div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
export default {
  components: { 
    SidebarItem 
  },
  computed: {
    ...mapGetters(['routerManager'])
  },
  data () {
    return {
      msg: 'Welcome to VIXX Vue.js App',
    }
  },
  created() {

  },
  mounted() {

  },
  methods:{
    handleLogout () {
      this.$confirm('确定要退出吗','退出提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$message.success('成功退出')
        this.$router.push('/login')
      })
      .catch(() => {
        this.$message.info('取消')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #fff;
}
.sidebar-container{
  width: 100%;
  height: 100%;
}
.el-menu {
  height: 100vh;
  padding: 0;
  margin: 0;
}
.el-menu--collapse {
    width: 64px;
  }
</style>