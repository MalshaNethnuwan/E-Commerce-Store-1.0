<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import ProductFilters from '@/components/product/ProductFilters.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

onMounted(() => {
  void productsStore.fetchCatalog()
})

const categoryOptions = computed(() => [
  { label: 'All Collections', value: 'all' },
  ...productsStore.categories.map((category) => ({
    label: productsStore.getCategoryLabel(category.slug),
    value: category.slug,
  })),
])
</script>

<template>
  <section class="space-y-8 container-shell section-space">
    <SectionHeading
      eyebrow="Shop all"
      title="Curated fashion collections"
      description="Refine by category, search instantly, and explore a polished product experience with persistent saved items and bag state."
    />

    <ProductFilters
      :categories="categoryOptions"
      :selected-category="productsStore.selectedCategory"
      :search-query="productsStore.searchQuery"
      :sort-by="productsStore.sortBy"
      @update:category="productsStore.setCategory"
      @update:search="productsStore.setSearch"
      @update:sort="productsStore.setSort"
      @reset="productsStore.resetFilters"
    />

    <LoadingSkeleton v-if="productsStore.loading" />
    <template v-else>
      <EmptyState
        v-if="productsStore.filteredProducts.length === 0"
        title="No products matched your selection"
        description="Try a different keyword, clear filters, or browse another collection."
      />
      <ProductGrid v-else :products="productsStore.filteredProducts" />
    </template>
  </section>
</template>
