<template>
  <div class="login-container">
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="快速登录" name="login">
          <el-form ref="formLogin" :model="formLogin" label-position="right" label-width="100px">
            <el-form-item label="账号：">
              <el-input v-model="formLogin.userName" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="formLogin.userPassword" placeholder="请输入" show-password/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onlogin">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="快速注册" name="logon">
          <el-form ref="formLogon" :model="formLogon" label-position="right" label-width="100px">
            <el-form-item label="账号：">
              <el-input v-model="formLogon.userName" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="formLogon.userPassword" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input v-model="formLogon.userPasswordCf" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input v-model="formLogon.userTele" placeholder="请输入"/>
            </el-form-item>
            <el-form-item label="身份：">
              <el-radio-group v-model="formLogon.userType">
                <el-radio label="1">用户</el-radio>
                <el-radio label="2">管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onlogon">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script>
import commonApi from '@/api/common.js';
export default {
  name: 'login',
  data () {
    return {
      activeName: 'login',
      formLogin: {
        userName: '',
        userPassword: '',
      },
      formLogon: {
        userName: '',
        userPassword: '',
        userPasswordCf: '',
        userTele: '',
        userType: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空' },
        ],
      }
    }
  },
  methods: {
    onlogin() {
      commonApi.login(this.formLogin).then((res) => {
        if (res.code === 200) {
          this.$message.success('登录成功');
          this.$store.dispatch('Login', res.data);
          if(res.data.userType === 1) this.$router.push('/user/home');
          else this.$router.push('/manager/user');
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    onlogon() {
      commonApi.register(this.formLogon).then((res) => {
        if (res.code === 200) {
          this.$message.success('注册成功，请登录！');
          this.activeName = 'login';
        } else {
          this.$message.warning(res.message);
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container{
  background-image: url(../../assets/images/login-bg.jpg);
  background-size: cover;
  height: 100%;
  display: flex;
  .el-main{
    background: #FFF;
    width: 500px;
    margin: auto;
    flex: none;
    /deep/ .el-tabs__content{
      padding: 20px 0;
    }
    .el-input {
      width: 300px;
    }
    .el-button--primary{
      padding: 12px 50px;
    }
  }
}
</style>