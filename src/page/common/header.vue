<template>
  <el-header>
    <div class="title">电动车租赁</div>
    <div class="link">
      <el-link :href="user.userType===1?'../#/user/home':'../#/manager/user'">首页</el-link>
      <el-link href="../#/user/store">营业门店</el-link>
      <el-link href="../#/user/experience">用户体验</el-link>
      <el-link href="../#/user/about">关于我们</el-link>
    </div>
    <div class="info">
      <el-link class="active"  @click="user?'':$router.push('../#/login')">
        {{user.userName?'欢迎您，' + user.userName:'登录/注册'}}
      </el-link>
      <el-link v-if="user.userType===1" href="../#/user/personal">个人中心</el-link>
      <el-link @click.native="handleLogout">退出登录</el-link>
    </div>
    <div class="contact">
      <i class="el-icon-phone"/>
      <el-link>400-616-6666</el-link>
    </div>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['user']),
  },
  data () {
    return {
    }
  },
  methods: {
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
    },
  }
}
</script>
<style lang="scss" scoped>
.el-header{
  background: #545C64;
  height: 65px!important;
  display: flex;
  align-items: center;
  //gap: 50px;
  justify-content: space-between;
  padding: 0 40px;
  .title{
    font-size: 24px;
    color: #FFF;
  }
  .info{
    font-size: 18px;
    .txt-FFD{
      margin-right: 10px;
      color: #FFD04B;
    }
    .txt-FFF{
      color: #FFF;
    }
  }
  .contact{
    font-size: 18px;
    color: #FFF;
    .el-icon-phone{
      vertical-align: middle;
      font-size: 20px
    }
  }
  .el-link.el-link--default{
    margin: 0 12px;
    font-size: 18px;
    color: #FFF;
    &:hover{
      color: #FFD04B;
      &:after{
        border-bottom: 1px solid #FFD04B;
      }
    }
    &.active{
      color: #FFD04B;
    }
  }
}
</style>