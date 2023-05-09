import request from '@/utils/request';

export default {
  login: (data) => { // 登录
    return request({
      url: '/login',
      method: 'post',
      data
    });
    // return new Promise((resolve) => {
    //   const res = {
    //     code: 200,
    //     data: {
    //       userName: '鸡坤',
    //       userType: data.userPassword?2:1
    //     }
    //   };
    //   resolve(res);
    // });
  },
  register: (data) => { // 注册
    return request({
      url: '/register',
      method: 'post',
      data
    });
    // return new Promise((resolve) => {
    //   const res = {
    //     code: 200,
    //     data: true
    //   };
    //   resolve(res);
    // });
  },
  getAppraiseList:(data) => {
    return request({
      url: '/getAppraiseList?userId='+data,
      method: 'get',
    });
  },
  getStorePage:(data) => {
    return request({
      url: '/getStorePage',
      method: 'post',
      data
    });
  },
  deleteStore:(data) => {
    return request(
      {
        url: '/deleteStore?id='+data,
        method: 'delete',
      }
    )
  },
  getBikes: (data) => { // 电车列表
    return request({
      url: '/getBikes',
      method: 'post',
      data
    });
    return new Promise((resolve) => {
      const res = {
        code: 200,
        message: '',
        data: {
          total: 11,
          list: [
            {
              bikeUrl: 'https://img.zcool.cn/community/0123aa57ac5a9f0000018c1b20920e.jpg@1280w_1l_2o_100sh.jpg',
              bikeName: '英格威',
              bikeStatus: '1',
              bikeInsure: '40',
              bikeCost: '120',
  
              tenancy: '2.0天',
              kilometers: '无限制',
            },
            {
              bikeUrl: 'https://img.zcool.cn/community/0123aa57ac5a9f0000018c1b20920e.jpg@1280w_1l_2o_100sh.jpg',
              bikeName: '英格威',
              bikeStatus: '1',
              bikeInsure: '40',
              bikeCost: '120',
  
              tenancy: '2.0天',
              kilometers: '无限制',
            }
          ]
        }
      };
      resolve(res);
    });
  },
  getStorePage: (data) => { // 门店列表
    return request({
      url: '/getStorePage',
      method: 'post',
      data
    });
  },
  getAllStore: () => {
    return request({
      url: '/getAllStore',
      method: 'post',
    });
  },
  getOrdersByUserId: (data) => { // 订单列表
    return request({
      url: '/getOrdersByUserId',
      method: 'post',
      data
    });
  },
  insertOrder: (data) => { // 订单提交
    return request({
      url: '/insertOrder',
      method: 'post',
      data
    });
  },
  insertAppraise: (data) => { // 订单评价
    return request({
      url: '/insertAppraise',
      method: 'post',
      data
    });
  },


  // 后台接口
  getUsers: (data) => { // 用户列表
    return request({
      url: '/getUsers',
      method: 'post',
      data
    });
  },
  updateUser: (data) => { // 用户编辑
    return request({
      url: '/updateUser',
      method: 'post',
      data
    });
  },
  deleteUser: (data) => { // 用户删除
    return request({
      url: '/deleteUser',
      method: 'post',
      data
    });
  },

  getBikes: (data) => { // 电车列表
    return request({
      url: '/getBikes',
      method: 'post',
      data
    });
  },
  updateBike: (data) => { // 电车编辑
    return request({
      url: '/updateBike',
      method: 'post',
      data
    });
  },
  deleteBike: (data) => { // 电车删除
    return request({
      url: '/deleteBike',
      method: 'post',
      data
    });
  },

  getOrders: (data) => { // 订单列表
    return request({
      url: '/getOrders',
      method: 'post',
      data
    });
  },
  
  getAppraises: (data) => { // 评价列表
    return request({
      url: '/getAppraises',
      method: 'post',
      data
    });
  },


  commonGet: (params) => { // 案例
    return request({
      url: '/monitoring-precept/sceneList',
      method: 'get',
      params
    });
  },
  commonPost: (data) => { // 案例
    return request({
      url: '/monitoring-precept/sceneList',
      method: 'post',
      data
    });
  },
}