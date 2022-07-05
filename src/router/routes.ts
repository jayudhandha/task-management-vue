import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/newtask',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'newtask', component: () => import('pages/TaskEditor.vue') },
      { path: 'editTask/:id', component: () => import('pages/TaskEditor.vue'), name: 'editTask' },
      { path: 'tasks', component: () => import('pages/Tasks.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
