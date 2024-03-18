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
  {
    path: '/url-0',
    name: 'Page-3',
    component: () => import('@WidgetPage/Page-3.vue')
  },
  {
    path: '/url-1',
    name: 'Page-1',
    component: () => import('@WidgetPage/Page-1.vue')
  },
  {
    path: '/url-2',
    name: 'Page-2',
    component: () => import('@WidgetPage/Page-2.vue')
  },
  {
    path: '/url-3',
    name: 'Page-3',
    component: () => import('@WidgetPage/Page-3.vue')
  },
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
