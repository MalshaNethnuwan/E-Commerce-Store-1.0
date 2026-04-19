<script setup lang="ts">
import { computed, onMounted } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import CategoryStrip from '@/components/home/CategoryStrip.vue'
import ValueProps from '@/components/home/ValueProps.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

onMounted(() => {
  void productsStore.fetchCatalog()
})

const categoryLabels = computed(() => productsStore.categories.slice(0, 5).map((category) => productsStore.getCategoryLabel(category.slug)))
</script>

<template>
  <div>
    <HeroSection />
    <CategoryStrip :categories="categoryLabels" />
    <ValueProps />

    <section class="pb-20 container-shell">
      <div class="flex flex-col gap-6 mb-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Featured arrivals"
          title="The current style edit"
          description="From sleek tailoring to statement accessories, these are the standout pieces clients are adding first."
        />
        <RouterLink
          to="/shop"
          class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
        >
          Browse full collection
        </RouterLink>
      </div>

      <LoadingSkeleton v-if="productsStore.loading" />
      <ProductGrid v-else :products="productsStore.featuredProducts" />
    </section>
  </div>
</template>
