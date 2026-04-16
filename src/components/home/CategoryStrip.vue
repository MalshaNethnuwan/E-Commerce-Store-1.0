<script setup lang="ts">
defineProps<{
  categories: string[]
}>()
</script>

<template>
  <section class="container-shell -mt-6 relative z-10">
    <div class="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:grid-cols-5">
      <div
        v-for="category in categories"
        :key="category"
        class="rounded-2xl bg-slate-50 px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        {{ category }}
      </div>
    </div>
  </section>
</template>
