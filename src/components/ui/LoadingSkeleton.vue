<template>
  <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="index in 8"
      :key="index"
      class="overflow-hidden bg-white border rounded-3xl border-slate-200 shadow-soft dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="h-72 animate-pulse bg-slate-200 dark:bg-slate-800"></div>
      <div class="p-5 space-y-3">
        <div class="h-4 rounded animate-pulse bg-slate-200 dark:bg-slate-800"></div>
        <div class="w-2/3 h-4 rounded animate-pulse bg-slate-200 dark:bg-slate-800"></div>
        <div class="h-10 rounded animate-pulse bg-slate-200 dark:bg-slate-800"></div>
      </div>
    </div>
  </div>
</template>
