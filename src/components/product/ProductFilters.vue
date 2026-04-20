<script setup lang="ts">
const props = defineProps<{
  categories: Array<{ label: string; value: string }>
  selectedCategory: string
  searchQuery: string
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating'
}>()

const emit = defineEmits<{
  (e: 'update:category', value: string): void
  (e: 'update:search', value: string): void
  (e: 'update:sort', value: 'featured' | 'price-asc' | 'price-desc' | 'rating'): void
  (e: 'reset'): void
}>()
</script>

<template>
  <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <div class="grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.7fr_auto]">
      <label class="block">
        <span class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Search</span>
        <input
          :value="props.searchQuery"
          type="text"
          placeholder="Search by product, category, or brand"
          class="w-full px-4 py-3 text-sm rounded-2xl border-slate-300 bg-slate-50 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
          @input="emit('update:search', ($event.target as HTMLInputElement).value)"
        />
      </label>

      <label class="block">
        <span class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Category</span>
        <select
          :value="props.selectedCategory"
          class="w-full px-4 py-3 text-sm rounded-2xl border-slate-300 bg-slate-50 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
          @change="emit('update:category', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="category in props.categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </label>

      <label class="block">
        <span class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Sort by</span>
        <select
          :value="props.sortBy"
          class="w-full px-4 py-3 text-sm rounded-2xl border-slate-300 bg-slate-50 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
          @change="emit('update:sort', ($event.target as HTMLSelectElement).value as 'featured' | 'price-asc' | 'price-desc' | 'rating')"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Best Rated</option>
        </select>
      </label>

      <div class="flex items-end">
        <button
          type="button"
          class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
          @click="emit('reset')"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
