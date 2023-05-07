<template>
  <div class="user-container">
    <h1>订单管理</h1>
    <el-table :data="list">
      <el-table-column prop="id" label="订单编号" width="300">
        <template #default="{row}">
          000000000{{row.id}}
        </template>
      </el-table-column>
      <el-table-column prop="bikeName" label="电动车名称" width="260"/>
      <el-table-column prop="startLocation" label="取车地点"/>
      <el-table-column prop="startTimeStr" label="取车时间"/>
      <el-table-column prop="endLocation" label="还车地点"/>
      <el-table-column prop="endTimeStr" label="还车时间"/>
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
      }
    }
  },
  mounted() {
    this.queryPage();
  },
  methods: {
    queryPage() {
      commonApi.getOrders(this.pageInfo).then((res) => {
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