<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import { useTheme } from '@/composables/useTheme'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'

const { initializeTheme } = useTheme()
const cartStore = useCartStore()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()

onMounted(() => {
  initializeTheme()
  cartStore.hydrate()
  authStore.hydrate()
  wishlistStore.hydrate()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
    <CartDrawer />
  </div>
</template>
