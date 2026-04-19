<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import ProductGallery from '@/components/product/ProductGallery.vue'
import BadgePill from '@/components/ui/BadgePill.vue'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { formatCurrency } from '@/utils/currency'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

onMounted(() => {
  void productsStore.fetchCatalog()
})

const productId = computed(() => Number(route.params.id))
const product = computed(() => productsStore.getProductById(productId.value))
const relatedProducts = computed(() => {
  if (!product.value) {
    return []
  }
  return productsStore.products
    .filter((item) => item.category === product.value?.category && item.id !== product.value.id)
    .slice(0, 3)
})
const discountedPrice = computed(() => {
  if (!product.value) {
    return 0
  }
  return product.value.price * (1 - product.value.discountPercentage / 100)
})
</script>

<template>
  <section class="container-shell section-space">
    <LoadingSkeleton v-if="productsStore.loading" />

    <EmptyState
      v-else-if="!product"
      title="Product not found"
      description="The requested piece is unavailable or may have been moved to another collection."
    />

    <div v-else class="space-y-16">
      <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <ProductGallery :images="product.images" :fallback="product.thumbnail" />

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-500">{{ product.category.replace('-', ' ') }}</p>
          <h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{{ product.title }}</h1>
          <p class="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{{ product.description }}</p>

          <div class="flex flex-wrap gap-3 mt-6">
            <BadgePill :label="`Rating ${product.rating.toFixed(1)}★`" />
            <BadgePill :label="`${product.stock} in stock`" />
            <BadgePill :label="`${Math.round(product.discountPercentage)}% off`" />
          </div>

          <div class="flex items-end gap-4 mt-8">
            <p class="text-3xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(discountedPrice) }}</p>
            <p class="text-lg line-through text-slate-400">{{ formatCurrency(product.price) }}</p>
          </div>

          <div class="grid gap-4 mt-8 sm:grid-cols-2">
            <button
              type="button"
              class="rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
              @click="cartStore.addToCart(product)"
            >
              Add to Bag
            </button>
            <button
              type="button"
              class="rounded-full border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
              @click="wishlistStore.toggle(product)"
            >
              {{ wishlistStore.includes(product.id) ? 'Remove from Saved' : 'Save for Later' }}
            </button>
          </div>

          <div class="mt-10 grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Brand</p>
              <p class="mt-2 font-semibold text-slate-900 dark:text-white">{{ product.brand ?? 'ÉLAN Signature' }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">SKU</p>
              <p class="mt-2 font-semibold text-slate-900 dark:text-white">{{ product.sku }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Shipping</p>
              <p class="mt-2 font-semibold text-slate-900 dark:text-white">{{ product.shippingInformation ?? 'Priority delivery available' }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Returns</p>
              <p class="mt-2 font-semibold text-slate-900 dark:text-white">{{ product.returnPolicy ?? '14-day easy returns' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-500">Complete the look</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight">More from this collection</h2>
          </div>
          <RouterLink to="/shop" class="text-sm font-semibold text-slate-600 dark:text-slate-300">Shop all →</RouterLink>
        </div>
        <ProductGrid :products="relatedProducts" />
      </div>
    </div>
  </section>
</template>
