<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="p-10 text-center bg-white border border-dashed rounded-3xl border-slate-300 shadow-soft dark:border-slate-700 dark:bg-slate-900">
    <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ title }}</h3>
    <p class="mt-3 text-slate-600 dark:text-slate-300">{{ description }}</p>
  </div>
</template>
