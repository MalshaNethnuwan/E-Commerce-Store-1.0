import type { ProductItem } from './api'

export interface CartItem {
  id: number
  quantity: number
  product: ProductItem
}
