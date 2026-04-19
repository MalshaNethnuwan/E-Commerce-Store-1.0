import { defineStore } from 'pinia'
import type { CartItem } from '@/types/cart'
import type { ProductItem } from '@/types/api'

const STORAGE_KEY = 'naura-cart'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

const persist = (items: CartItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
  }),
  getters: {
    totalItems(state): number {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    subtotal(state): number {
      return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    },
  },
  actions: {
    hydrate(): void {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return
      }

      try {
        this.items = JSON.parse(raw) as CartItem[]
      } catch {
        this.items = []
      }
    },
    addToCart(product: ProductItem): void {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ id: product.id, quantity: 1, product })
      }
      persist(this.items)
      this.isOpen = true
    },
    decreaseQuantity(productId: number): void {
      const item = this.items.find((entry) => entry.id === productId)
      if (!item) {
        return
      }
      item.quantity -= 1
      if (item.quantity <= 0) {
        this.removeFromCart(productId)
        return
      }
      persist(this.items)
    },
    increaseQuantity(productId: number): void {
      const item = this.items.find((entry) => entry.id === productId)
      if (!item) {
        return
      }
      item.quantity += 1
      persist(this.items)
    },
    removeFromCart(productId: number): void {
      this.items = this.items.filter((item) => item.id !== productId)
      persist(this.items)
    },
    clearCart(): void {
      this.items = []
      persist(this.items)
    },
    openDrawer(): void {
      this.isOpen = true
    },
    closeDrawer(): void {
      this.isOpen = false
    },
  },
})
