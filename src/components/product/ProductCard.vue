<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { ProductItem } from '@/types/api'
import { formatCurrency } from '@/utils/currency'
import { getPrimaryImage, resolveImage } from '@/utils/image'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const props = defineProps<{
  product: ProductItem
}>()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const imageUrl = computed(() => resolveImage(getPrimaryImage(props.product.images, props.product.thumbnail)))
const isSaved = computed(() => wishlistStore.includes(props.product.id))
const discountedPrice = computed(() => {
  return props.product.price * (1 - props.product.discountPercentage / 100)
})
</script>

<template>
  <article class="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
    <div class="relative overflow-hidden">
      <RouterLink :to="`/product/${product.id}`">
        <img
          :src="imageUrl"
          :alt="product.title"
          class="object-cover w-full transition duration-500 h-80 group-hover:scale-105"
        />
      </RouterLink>
      <button
        type="button"
        class="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow-soft backdrop-blur transition hover:-translate-y-0.5 dark:bg-slate-900/90 dark:text-slate-100"
        @click="wishlistStore.toggle(product)"
      >
        {{ isSaved ? '♥ Saved' : '♡ Save' }}
      </button>
      <div class="absolute px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase rounded-full left-4 top-4 bg-slate-900 dark:bg-white dark:text-slate-950">
        {{ Math.round(product.discountPercentage) }}% off
      </div>
    </div>

    <div class="p-5">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{{ product.category.replace('-', ' ') }}</p>
      <RouterLink :to="`/product/${product.id}`" class="block mt-3 text-xl font-semibold text-slate-900 dark:text-white">
        {{ product.title }}
      </RouterLink>
      <p class="mt-3 text-sm leading-6 line-clamp-2 text-slate-600 dark:text-slate-300">
        {{ product.description }}
      </p>
      <div class="flex items-end justify-between gap-4 mt-4">
        <div>
          <p class="text-lg font-bold text-slate-900 dark:text-white">{{ formatCurrency(discountedPrice) }}</p>
          <p class="text-sm line-through text-slate-400">{{ formatCurrency(product.price) }}</p>
        </div>
        <span class="px-3 py-1 text-sm font-medium rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100">★ {{ product.rating.toFixed(1) }}</span>
      </div>
      <div class="flex gap-3 mt-5">
        <button
          type="button"
          class="flex-1 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          @click="cartStore.addToCart(product)"
        >
          Add to Bag
        </button>
        <RouterLink
          :to="`/product/${product.id}`"
          class="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
        >
          View
        </RouterLink>
      </div>
    </div>
  </article>
</template>
