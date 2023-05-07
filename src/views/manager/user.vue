<template>
  <div class="user-container">
    <h1>用户管理</h1>
    <el-table :data="list">
      <el-table-column prop="userName" label="账号" width="300">
        <template #default="{row}">
          <el-image :src="require('@/assets/images/head.png')" fit="cover"/>
          <span class="txt171">{{row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户昵称" width="260"/>
      <el-table-column prop="userTele" label="手机号"/>
      <el-table-column prop="userStatus" label="信誉度">
        <template #default="{row}">
          {{crediteEnume[row.userStatus]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{row}">
          <el-link type="primary" @click="edit(row)">编辑</el-link>
          <el-popconfirm title="确定删除当前内容吗？" @confirm="del(row)">
            <el-link slot="reference" type="primary">删除</el-link>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="pageInfo.pageNo"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog
      title="编辑"
      width="500px"
      :visible.sync="visible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="昵称：">
          <el-input v-model="form.userName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.userTele" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="信誉度：">
          <el-select v-model="form.userStatus" placeholder="请选择">
            <el-option v-for="(item,index) in crediteOpts" :key="index" :label="item.label" :value="item.value"/>
          </el-select>
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
import commonApi from '@/api/common.js';
export default {
  data () {
    return {
      list: [],
      pageInfo: {
        pageNo: 1,
        pageSize: 10,
      },
      visible: false,
      form: {
        userName: '',
        userTele: '',
        userStatus: 0,
      },
      crediteEnume: [
        '信用极佳',
        '信用良好',
        '信用较差',
        '无信用'
      ],
      crediteOpts: [
        {
          label: '信用极佳',
          value: 0
        },
        {
          label: '信用良好',
          value: 1
        },
        {
          label: '信用较差',
          value: 2
        },
        {
          label: '无信用',
          value: 3
        }
      ]
    }
  },
  mounted() {
    this.queryPage();
  },
  methods: {
    queryPage() {
      commonApi.getUsers(this.pageInfo).then((res) => {
        if (res.code === 200) {
          this.list = res.data.list;
          this.pageInfo.total = res.data.total;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    currentChange(val) {
      this.pageInfo.pageNo = val;
      this.queryPage();
    },
    sizeChange(val) {
      this.pageInfo.pageSize = val;
      this.queryPage();
    },
    edit(row) {
      this.visible = true;
      this.form = row;
    },
    del(row) {
      commonApi.deleteUser(row).then((res) => {
        if (res.code === 200) {
          this.$message.success('删除成功');
          this.queryPage();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    onSubmit() {
      commonApi.updateUser(this.form).then((res) => {
        if (res.code === 200) {
          this.visible = false;
          this.$message.success('修改成功');
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
.user-container{
  h1{
    margin: 0 0 20px;
  }
  /deep/ .el-table{
    .el-table__header tr th{
      background-color: #F4F7FC;
      padding: 20px 0;
      font-size: 18px;
      color: #909399
    }
    .el-table__body td.el-table__cell{
      font-size: 18px;
      color: #171b1e;
    }
    .el-image{
      vertical-align: middle;
      border-radius: 100px;
      width: 60px;
      height: 60px;
      box-shadow: 0px 2px 2px 2px #d8e2f9a1;
      margin-right: 10px;
    }
    .el-link{
      font-size: 18px;
    }
    .txt171{
      font-weight: bold;
      color: #171b1e;
    }
    .txt171{
      font-weight: bold;
      color: #171b1e;
    }
  }
  .el-dialog__body{
    .el-input{
      width: 300px;
    }
    .el-select{
      width: 300px;
    }
  }
  .el-dialog__footer{
    &>div{
      text-align: center;
    }
  }
  .el-pagination {
    padding: 10px;
    float: right;
  }
}
</style>