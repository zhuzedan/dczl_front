import { Session } from '@/utils/storage';
import { apiLogin } from '@/api/user'

const user = {
  state: {
    user: Session.get('userInfo'),
    token: '',
    routerManager: [
      {
        "path": "/manager/user",
        "component": "manager/user",
        "name": "user",
        "meta": {
          "title": "用户管理",
          "icon": "el-icon-message-solid"
        },
        "children": []
      },
      {
        "path": "/manager/vehicle",
        "component": "manager/vehicle",
        "name": "vehicle",
        "meta": {
          "title": "车型管理",
          "icon": "el-icon-s-flag"
        },
        "children": []
      },
      {
        "path": "/manager/indent",
        "component": "manager/indent",
        "name": "indent",
        "meta": {
          "title": "订单管理",
          "icon": "el-icon-menu"
        },
        "children": []
      },
      {
        "path": "/manager/appraise",
        "component": "manager/appraise",
        "name": "appraise",
        "meta": {
          "title": "评价管理",
          "icon": "el-icon-share"
        },
        "children": []
      },
    ]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    // 登录
    Login({ commit }, data) {
      Session.set('userInfo',data);
      commit('SET_USER', data);
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        //console.log('store-Login1111111',data)
        // return new Promise((resolve, reject) => {
        //   apiLogin(userInfo).then(res => {
        //     commit('SET_TOKEN', res.token)
        //     commit('SET_USER', res.user)
        //     resolve(res)
        //   }).catch(err => {
        //     reject(err)
        //   })
        // })
        commit('SET_TOKEN', '');
        commit('SET_USER', null);
        resolve();
      })
    }
  }
}

export default user