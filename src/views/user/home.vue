<template>
  <div class="home-container">
    <el-row class="main">
      <el-carousel :interval="2000" height="600px">
        <el-carousel-item v-for="(v,i) in images" :key="i">
          <el-image :src="v" fit="cover"/>
        </el-carousel-item>
      </el-carousel>
      <el-row class="form">
        <el-form ref="form" :model="form" :rules="rules" :inline="true" label-position="top" label-width="80px">
          <el-form-item prop="takeShop" label="取车">
            <el-select v-model="form.takeShop" placeholder="请选择门店">
              <el-option v-for="(item,index) in optsShop" :key="index" :label="item.label" :value="item.label"/>
            </el-select>
          </el-form-item>
          <el-form-item prop="giveShop" label="还车">
            <el-select v-model="form.giveShop" placeholder="请选择门店">
              <el-option v-for="(item,index) in optsShop" :key="index" :label="item.label" :value="item.label"/>
            </el-select>
          </el-form-item>
          <el-form-item prop="takeDate">
            <el-date-picker v-model="form.takeDate" placeholder="选择日期" type="date" value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item prop="giveDate">
            <el-date-picker v-model="form.giveDate" placeholder="选择日期" type="date" value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item prop="takeTime">
            <el-time-select v-model="form.takeTime" placeholder="选择时间" :picker-options="pickerOptions"/>
          </el-form-item>
          <el-form-item prop="giveTime">
            <el-time-select v-model="form.giveTime" placeholder="选择时间" :picker-options="pickerOptions"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即选车</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="marks">
        <el-col v-for="(v,i) in marks" :key="i" :span="6">
          <i :class="v.icon"></i>
          {{v.name}}
        </el-col>
      </el-row>
      <el-row class="heats">
        <h3>热门车型</h3>
        <el-row :gutter="20">
          <el-col v-for="(v,i) in heats" :key="i" :span="6">
            <el-image :src="v" fit="cover"/>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
    <!-- <el-row class="footer">
      <el-col v-for="(v,i) in explains" :key="i" :span="4">
        <p>{{v.title}}</p>
        <div v-for="(a,j) in v.describe" :key="j">{{a}}</div>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      images: [
        'https://img.zcool.cn/community/0123aa57ac5a9f0000018c1b20920e.jpg@1280w_1l_2o_100sh.jpg',
        require('@/assets/images/electric-vehicle/1.jpg'),
        require('@/assets/images/electric-vehicle/2.jpg'),
        require('@/assets/images/electric-vehicle/3.jpg'),
        require('@/assets/images/electric-vehicle/4.jpg'),
      ],
      form: {
        takeShop: '',
        takeDate: '',
        takeTime: '',
        giveShop: '',
        giveDate: '',
        giveTime: '',
      },
      rules: {
        takeShop: [
          { required: true, message: '请选择门店' },
        ],
        giveShop: [
          { required: true, message: '请选择门店' },
        ],
        takeDate: [
          { required: true, message: '请选择日期' },
        ],
        giveDate: [
          { required: true, message: '请选择日期' },
        ],
        takeTime: [
          { required: true, message: '请选择时间' },
        ],
        giveTime: [
          { required: true, message: '请选择时间' },
        ],
      },
      optsPlace: [
        {
          label: '北京',
          value: '北京',
        },
        {
          label: '上海',
          value: '上海',
        },
        {
          label: '广州',
          value: '广州',
        },
        {
          label: '深圳',
          value: '深圳',
        }
      ],
      optsShop: [
        {
          label: '万达门店',
          value: '万达门店',
        },
        {
          label: '学府路门店',
          value: '学府路门店',
        },
        {
          label: '学院路门店',
          value: '学院路门店',
        },
      ],
      pickerOptions: {
        start: '09:00',
        step: '00:15',
        end: '21:00'
      },
      marks: [
        { name: '100+车型', icon: 'el-icon-s-promotion'},
        { name: '1000+网点', icon: 'el-icon-s-shop'},
        { name: '100%车险', icon: 'el-icon-s-claim'},
        { name: '无限里程', icon: 'el-icon-s-marketing'},
      ],
      heats: [
        require('@/assets/images/electric-vehicle/1.jpg'),
        require('@/assets/images/electric-vehicle/2.jpg'),
        require('@/assets/images/electric-vehicle/3.jpg'),
        require('@/assets/images/electric-vehicle/4.jpg'),
      ],
      explains: [
        { 
          title: '品质保证', 
          describe: ['公司介绍','关于我们','加入我们','加盟合伙']
        },
        { 
          title: '方便快捷', 
          describe: ['公司介绍','关于我们','加入我们','加盟合伙']
        },
        { 
          title: '安全环保', 
          describe: ['公司介绍','关于我们','加入我们','加盟合伙']
        },
        { 
          title: '价格优惠', 
          describe: ['公司介绍','关于我们','加入我们','加盟合伙']
        },
        { 
          title: '用心服务', 
          describe: ['公司介绍','关于我们','加入我们','加盟合伙']
        },
        { 
          title: '联系我们', 
          describe: ['友情连接','关于我们','加入我们','加盟合伙']
        },
      ],
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((v)=>{
        if(v) {
          this.form.takeTime+=':00';
          this.form.giveTime+=':00';
          this.$router.push({path:'indent',query:this.form});
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container{
  .main{
    padding: 0 60px;
    .el-carousel{
      margin-top: 0px;
      .el-carousel__container{
        .el-image{
          width: 100%;
          height: 100%;
        }
      }
    }
    .form{
      z-index: 99;
      top: 60px;
      left: 140px;
      position: absolute;
      background: #FFF;
      //background: rgba($color: #545C64, $alpha: .8);
      width: 560px;
      padding: 30px 0;
      display: flex;
      justify-content: center;
      .el-form{
        width: 465px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .el-form-item{
          margin-right: 0px;
        }
        // /deep/.el-form--inline .el-form-item__label{
        //   color: #FFF;
        // }
      }
      .el-button{
        border-radius: 2px;
        border-color: #FF8F4B;
        background: #FF8F4B;
        width: 454px;
        margin-top: 20px;
        padding: 15px 20px;
        &:hover{
          border-color: #FFD04B;
          background: #FFD04B;
        }
      }
    }
    .marks{
      padding: 30px 0;
      background: #F9F9F9;
      .el-col-6{
        display: flex;
        flex-direction: column;
        gap: 5px;
        text-align: center;
        font-size: 18px;
      }
      [class*="el-icon-"]{
        font-size: 42px;
        color: #FF8F4B;
      }
    }
    .heats{
      .el-image{
        width: 100%;
        height: 250px;
      }
    }
  }
  .footer{
    background: #545C64;
    // position: fixed;
    margin-top: 20px;
    bottom: 0;
    width: 100%;
    .el-col-4{
      text-align: center;
      color: #FFF;
      p{
        font-size: 18px;
      }
    }
  }
}
</style>