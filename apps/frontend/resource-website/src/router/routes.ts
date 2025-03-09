import type { RouteRecordRaw } from 'vue-router'
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: () => import('../layout/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/Home.vue')
      }
    ]
  }
]

export default routes