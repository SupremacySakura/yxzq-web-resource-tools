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
      },
      {
        path: '/uploadFile',
        component: () => import('../views/UploadFile.vue')
      },
      {
        path: '/fileManagement',
        component: () => import('../views/FileManagement.vue')
      },
      {
        path:'/imgPreview',
        component:()=>import('../views/ImgPreview.vue')
      }
    ]
  }
]

export default routes