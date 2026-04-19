import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShopView from '@/views/ShopView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import LoginView from '@/views/LoginView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/shop', name: 'shop', component: ShopView },
    { path: '/product/:id', name: 'product-details', component: ProductDetailsView, props: true },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/favorites', name: 'favorites', component: FavoritesView },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
