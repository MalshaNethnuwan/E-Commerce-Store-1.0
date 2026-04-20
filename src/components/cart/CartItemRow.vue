<script setup lang="ts">
import type { CartItem } from '@/types/cart'
import { formatCurrency } from '@/utils/currency'

defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'increase', id: number): void
  (e: 'decrease', id: number): void
  (e: 'remove', id: number): void
}>()
</script>

<template>
  <div class="flex gap-4 p-4 border rounded-2xl border-slate-200 dark:border-slate-800">
    <img :src="item.product.thumbnail" :alt="item.product.title" class="object-cover w-20 h-24 rounded-2xl" />
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h4 class="font-semibold text-slate-900 dark:text-white">{{ item.product.title }}</h4>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ item.product.category.replace('-', ' ') }}</p>
        </div>
        <button type="button" class="text-sm transition text-slate-400 hover:text-rose-500" @click="emit('remove', item.id)">
          Remove
        </button>
      </div>
      <div class="flex items-center justify-between mt-4">
        <div class="inline-flex items-center border rounded-full border-slate-300 dark:border-slate-700">
          <button type="button" class="px-3 py-1 text-lg" @click="emit('decrease', item.id)">−</button>
          <span class="px-3 py-1 text-sm font-semibold">{{ item.quantity }}</span>
          <button type="button" class="px-3 py-1 text-lg" @click="emit('increase', item.id)">+</button>
        </div>
        <p class="font-semibold text-slate-900 dark:text-white">{{ formatCurrency(item.product.price * item.quantity) }}</p>
      </div>
    </div>
  </div>
</template>
