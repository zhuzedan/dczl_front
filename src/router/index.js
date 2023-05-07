import Vue from 'vue'
import VueRouter from 'vue-router'
import routerPage from './page.js'
import routerView from './view.js'
import XRouter from './xrouter'
import store from '@/store'

Vue.use(VueRouter)

let router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [].concat([])
})
// new XRouter(router, store.state.user.router)
router.addRoutes([...routerPage, ...routerView])

export default router