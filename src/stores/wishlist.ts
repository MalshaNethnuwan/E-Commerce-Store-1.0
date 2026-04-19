import { defineStore } from 'pinia'
import type { ProductItem } from '@/types/api'

const STORAGE_KEY = 'naura-wishlist'

interface WishlistState {
  items: ProductItem[]
}

const persist = (items: ProductItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistState => ({
    items: [],
  }),
  getters: {
    totalItems(state): number {
      return state.items.length
    },
  },
  actions: {
    hydrate(): void {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return
      }
      try {
        this.items = JSON.parse(raw) as ProductItem[]
      } catch {
        this.items = []
      }
    },
    toggle(product: ProductItem): void {
      const exists = this.items.some((item) => item.id === product.id)
      this.items = exists
        ? this.items.filter((item) => item.id !== product.id)
        : [product, ...this.items]
      persist(this.items)
    },
    includes(productId: number): boolean {
      return this.items.some((item) => item.id === productId)
    },
  },
})
