<script setup lang="ts">
import type { ProductItem } from '@/types/api'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: ProductItem[]
}>()
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
