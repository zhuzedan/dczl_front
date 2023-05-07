export default [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import ('@/views/login/index'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import ('@/page/404')
    }
]