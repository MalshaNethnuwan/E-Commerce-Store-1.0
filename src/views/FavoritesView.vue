<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useProductsStore } from '@/stores/products'
import { useWishlistStore } from '@/stores/wishlist'

const productsStore = useProductsStore()
const wishlistStore = useWishlistStore()

onMounted(() => {
  void productsStore.fetchCatalog()
})

const savedProducts = computed(() => wishlistStore.items)
</script>

<template>
  <section class="space-y-8 container-shell section-space">
    <SectionHeading
      eyebrow="Saved edit"
      title="Your personal shortlist"
      description="Build a refined collection of pieces you want to revisit, compare, and shop later."
    />

    <EmptyState
      v-if="savedProducts.length === 0"
      title="Nothing saved yet"
      description="Tap the save button on any product card to build your shortlist."
    />
    <ProductGrid v-else :products="savedProducts" />
  </section>
</template>
