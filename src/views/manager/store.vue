<template>
  <div class="user-container">
    <h1>门店管理</h1>
    <el-button type="primary" @click="insert()" style="margin-bottom: 20px;">新建门店</el-button>
    <el-table :data="list">
      <el-table-column prop="storeName" label="门店名称" width="200">
      </el-table-column>
      <el-table-column prop="contactName" label="联系人" />
      <el-table-column prop="contactPhone" label="联系人电话" />
      <el-table-column prop="description" label="描述">  
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="260">
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
      title="新建门店"
      width="500px"
      :visible.sync="insertVisible">
      <el-form ref="insertForm" :model="insertForm" label-width="100px">
        <el-form-item label="名称：">
          <el-input v-model="insertForm.storeName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="insertForm.description" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="insertForm.contactName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="联系人电话：">
          <el-input v-model="insertForm.contactPhone" placeholder="请选择">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onInsertSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑门店"
      width="500px"
      :visible.sync="visible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="名称：">
          <el-input v-model="form.storeName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="form.description" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="form.contactName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="联系人电话：">
          <el-input v-model="form.contactPhone" placeholder="请选择">
          </el-input>
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
      insertVisible: false,
      form: {
        
      },
      insertForm: {},
      vehicleEnume: [
        '',
        '正常',
        '易损',
        '维修',
        '报废'
      ],
      vehicleOpts: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '易损',
          value: 2
        },
        {
          label: '维修',
          value: 3
        },
        {
          label: '报废',
          value: 4
        }
      ]
      
    }
  },
  mounted() {
    this.queryPage();
  },
  methods: {
    queryPage() {
      commonApi.getStorePage(this.pageInfo).then((res) => {
        if (res.code === 200) {
          this.list = res.data.data;
          this.pageInfo.total = res.data.totalCount;
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
    insert() {
      this.insertVisible = true;
    },
    del(row) {
      commonApi.deleteStore(row.id).then((res) => {
        if (res.code === 200) {
          this.$message.success('删除成功');
          this.queryPage();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    onInsertSubmit() {
      commonApi.insertStore(this.insertForm).then((res) => {
        if (res.code === 200) {
          this.insertVisible = false;
          this.$message.success('新增成功');
          this.queryPage();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    onSubmit() {
      commonApi.updateStore(this.insertForm).then((res) => {
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
      width: 180px;
      height: 100px;
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