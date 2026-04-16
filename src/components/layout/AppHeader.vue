<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Saved', to: '/favorites' },
  { label: 'Account', to: '/login' },
]

const isActive = computed(() => (path: string) => route.path === path)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
    <div class="flex items-center justify-between h-20 gap-4 container-shell">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="rounded-2xl bg-slate-950 px-3 py-2 text-sm font-bold tracking-[0.35em] text-white dark:bg-white dark:text-slate-950">NR</div>
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">NAURA</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Modern luxury essentials</p>
        </div>
      </RouterLink>

      <nav class="items-center hidden gap-2 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="px-4 py-2 text-sm font-medium transition rounded-full"
          :class="isActive(item.to)
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <RouterLink
          to="/favorites"
          class="relative rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          Saved
          <span class="ml-1 rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white dark:bg-white dark:text-slate-900">{{ wishlistStore.totalItems }}</span>
        </RouterLink>
        <RouterLink
          to="/login"
          class="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 lg:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          {{ authStore.isAuthenticated ? authStore.fullName.split(' ')[0] : 'Sign In' }}
        </RouterLink>
        <button
          type="button"
          class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          @click="cartStore.openDrawer"
        >
          Bag · {{ cartStore.totalItems }}
        </button>
      </div>
    </div>

    <div class="border-t border-slate-200/70 bg-slate-50/80 md:hidden dark:border-slate-800 dark:bg-slate-900/60">
      <div class="flex gap-2 py-3 overflow-x-auto container-shell">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
          :class="isActive(item.to)
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
            : 'bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300'"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
