import { createRouter, createWebHistory } from 'vue-router'

let routes = [
    {
      path: '/',
      redirect: '/editor'
    },
    {
      path: '/editor',
      name: 'EditorView',
      component: () => import('@/EditorView.vue')
    },
]

routes.push(
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
