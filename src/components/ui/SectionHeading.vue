<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="max-w-2xl">
    <p class="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-500">{{ eyebrow }}</p>
    <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
      {{ title }}
    </h2>
    <p class="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
      {{ description }}
    </p>
  </div>
</template>
