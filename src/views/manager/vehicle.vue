<template>
  <div class="user-container">
    <h1>车型管理</h1>
    <el-button type="primary" @click="insert()" style="margin-bottom: 20px;">新建电车</el-button>
    <el-table :data="list">
      <el-table-column prop="bikeUrl" label="电动车" width="300">
        <template #default="{row}">
          <el-image :src="row.bikeUrl" fit="cover"/>
        </template>
      </el-table-column>
      <el-table-column prop="bikeName" label="名称" width="260"/>
      <el-table-column prop="bikeStatus" label="状态">
        <template #default="{row}">
          {{vehicleEnume[row.bikeStatus]}}
        </template>
      </el-table-column>
      <el-table-column prop="bikeCost" label="价格" width="260">
        <template #default="{row}">
          {{row.bikeCost}} 元
        </template>
      </el-table-column>
      <el-table-column label="限公里数">
        <template #default>无限制</template>
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
      title="新建电车"
      width="500px"
      :visible.sync="insertVisible">
      <el-form ref="insertForm" :model="insertForm" label-width="100px">
        <el-form-item label="名称：">
          <el-input v-model="insertForm.bikeName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="insertForm.bikeCost" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="insertForm.bikeStatus" placeholder="请选择">
            <el-option v-for="(item,index) in vehicleOpts" :key="index" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onInsertSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑电车"
      width="500px"
      :visible.sync="visible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="名称：">
          <el-input v-model="form.bikeName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="form.bikeCost" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.bikeStatus" placeholder="请选择">
            <el-option v-for="(item,index) in vehicleOpts" :key="index" :label="item.label" :value="item.value"/>
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
      insertVisible: false,
      insertForm: {},
      pageInfo: {
        pageNo: 1,
        pageSize: 10,
      },
      visible: false,
      form: {
        bikeName: '',
        bikeCost: '',
        bikeStatus: 1,
      },
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
    insert() {
      this.insertVisible = true;
    },
    onInsertSubmit() {
      commonApi.insertBike(this.insertForm).then((res) => {
        if (res.code === 200) {
          this.insertVisible = false;
          this.$message.success('新增成功');
          this.queryPage();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    queryPage() {
      commonApi.getBikes(this.pageInfo).then((res) => {
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
    del(row) {
      commonApi.deleteBike(row).then((res) => {
        if (res.code === 200) {
          this.$message.success('删除成功');
          this.queryPage();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    onSubmit() {
      commonApi.updateBike(this.form).then((res) => {
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