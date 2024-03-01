import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/editor'
    },
    {
      path: '/editor',
      name: 'EditorView',
      component: () => import('@/EditorView.vue')
    },
    {
      path: '/show',
      name: 'ShowView',
      component: () => import('@/ShowView.vue')
    }
  ]
})

export default router
