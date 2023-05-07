const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  router: state => state.user.router,
  routerManager: state => state.user.routerManager
}
export default getters
