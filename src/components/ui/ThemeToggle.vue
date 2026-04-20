<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    @click="toggleTheme"
  >
    <span>{{ isDark ? 'Light' : 'Dark' }}</span>
    <span class="text-base">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>
