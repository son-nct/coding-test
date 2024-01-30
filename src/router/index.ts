import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/products/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/products',
      name: 'Product Page',
      component: HomePage
    }
  ]
})

export default router
