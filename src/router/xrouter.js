export default class {
  constructor(router, list) {
    this.xrouter = router
    this.format(list, true)
  }
  format (menuArr = [], first) {
    if (!menuArr.length) return
    const routerArr = []
    for (let i = 0; i < menuArr.length; i++) {
      const menuItem = menuArr[i]
      const routerItem = {
        path: menuItem.path,
        component (resolve) {
          if (first) {
            require(['../page/user/index'], resolve)
          } else {
            require([`@/views/${menuItem.component}`], resolve)
          }
        },
        name: menuItem.name,
        meta: menuItem.meta,
        children: menuItem.children.length ? this.format(menuItem.children, false) : []
      }
      routerArr.push(routerItem)
    }
    if (first) {
      this.xrouter.addRoutes(routerArr)
    } else {
      return routerArr
    }
  }
}
