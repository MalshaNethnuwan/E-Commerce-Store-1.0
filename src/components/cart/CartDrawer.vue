<script setup lang="ts">
import { computed } from 'vue'
import CartItemRow from './CartItemRow.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/utils/currency'

const cartStore = useCartStore()
const shipping = computed(() => (cartStore.totalItems > 0 ? 18 : 0))
const total = computed(() => cartStore.subtotal + shipping.value)
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    leave-active-class="transition duration-200 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="cartStore.isOpen" class="fixed inset-0 z-[60] bg-slate-950/50" @click.self="cartStore.closeDrawer">
      <div class="flex flex-col w-full h-full max-w-xl p-6 ml-auto bg-white shadow-2xl dark:bg-slate-950">
        <div class="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Shopping Bag</p>
            <h3 class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{{ cartStore.totalItems }} selected</h3>
          </div>
          <button type="button" class="px-4 py-2 text-sm font-medium border rounded-full border-slate-300 dark:border-slate-700" @click="cartStore.closeDrawer">
            Close
          </button>
        </div>

        <div class="flex-1 pr-1 mt-6 space-y-4 overflow-y-auto">
          <EmptyState
            v-if="cartStore.items.length === 0"
            title="Your bag is empty"
            description="Add standout pieces to start building your next look."
          />
          <CartItemRow
            v-for="item in cartStore.items"
            v-else
            :key="item.id"
            :item="item"
            @increase="cartStore.increaseQuantity"
            @decrease="cartStore.decreaseQuantity"
            @remove="cartStore.removeFromCart"
          />
        </div>

        <div class="pt-6 mt-6 space-y-4 border-t border-slate-200 dark:border-slate-800">
          <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Subtotal</span>
            <span>{{ formatCurrency(cartStore.subtotal) }}</span>
          </div>
          <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Express Delivery</span>
            <span>{{ formatCurrency(shipping) }}</span>
          </div>
          <div class="flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white">
            <span>Total</span>
            <span>{{ formatCurrency(total) }}</span>
          </div>
          <button type="button" class="w-full px-4 py-3 text-sm font-semibold text-white rounded-full bg-slate-900 dark:bg-white dark:text-slate-950">
            Secure Checkout
          </button>
          <button type="button" class="w-full px-4 py-3 text-sm font-semibold border rounded-full border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200" @click="cartStore.clearCart">
            Clear Bag
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
