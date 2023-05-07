import LayoutUser from '@/page/user/index.vue'
import LayoutManager from '@/page/manager/index.vue'
export default [
  {
    path: '/user',
    component: LayoutUser,
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import ('@/views/user/home.vue')
      },
      {
        path: 'indent',
        name: 'indent',
        component: () => import ('@/views/user/indent/index.vue')
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import ('@/views/user/personal.vue')
      }
    ]
  },
  {
    path: '/manager',
    component: LayoutManager,
    children: [
      {
        path: '/',
        redirect: 'user'
      },
      {
        path: 'user',
        name: 'user',
        component: () => import ('@/views/manager/user')
      },
      {
        path: 'vehicle',
        name: 'vehicle',
        component: () => import ('@/views/manager/vehicle')
      },
      {
        path: 'indent',
        name: 'indent',
        component: () => import ('@/views/manager/indent')
      },
      {
        path: 'appraise',
        name: 'appraise',
        component: () => import ('@/views/manager/appraise')
      }
    ]
  }
]