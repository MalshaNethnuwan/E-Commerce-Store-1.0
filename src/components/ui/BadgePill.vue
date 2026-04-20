<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
    {{ label }}
  </span>
</template>
