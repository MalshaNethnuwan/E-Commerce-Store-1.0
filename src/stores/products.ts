import { defineStore } from 'pinia'
import axios from 'axios'
import type { CategoryItem, ProductItem, ProductListResponse } from '@/types/api'

const API_BASE_URL = 'https://dummyjson.com'
const FASHION_CATEGORIES = new Set([
  'womens-dresses',
  'womens-shoes',
  'womens-bags',
  'womens-jewellery',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'womens-watches',
  'sunglasses',
  'tops',
])

interface ProductsState {
  products: ProductItem[]
  categories: CategoryItem[]
  loading: boolean
  error: string | null
  selectedCategory: string
  searchQuery: string
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating'
}

const prettifyCategory = (value: string): string => {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    selectedCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
  }),
  getters: {
    featuredProducts(state): ProductItem[] {
      return [...state.products]
        .sort((a, b) => b.rating - a.rating || b.discountPercentage - a.discountPercentage)
        .slice(0, 8)
    },
    filteredProducts(state): ProductItem[] {
      const normalizedQuery = state.searchQuery.trim().toLowerCase()

      const filtered = state.products.filter((product) => {
        const matchesCategory =
          state.selectedCategory === 'all' || product.category === state.selectedCategory

        const matchesSearch =
          normalizedQuery.length === 0 ||
          product.title.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.category.toLowerCase().includes(normalizedQuery) ||
          (product.brand?.toLowerCase().includes(normalizedQuery) ?? false)

        return matchesCategory && matchesSearch
      })

      const sorted = [...filtered]
      switch (state.sortBy) {
        case 'price-asc':
          return sorted.sort((a, b) => a.price - b.price)
        case 'price-desc':
          return sorted.sort((a, b) => b.price - a.price)
        case 'rating':
          return sorted.sort((a, b) => b.rating - a.rating)
        default:
          return sorted.sort((a, b) => b.rating + b.discountPercentage - (a.rating + a.discountPercentage))
      }
    },
  },
  actions: {
    async fetchCatalog(): Promise<void> {
      if (this.products.length > 0) {
        return
      }

      this.loading = true
      this.error = null

      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get<ProductListResponse>(`${API_BASE_URL}/products?limit=194`),
          axios.get<CategoryItem[]>(`${API_BASE_URL}/products/categories`),
        ])

        this.products = productsResponse.data.products.filter((product) =>
          FASHION_CATEGORIES.has(product.category),
        )

        this.categories = categoriesResponse.data.filter((category) =>
          FASHION_CATEGORIES.has(category.slug),
        )
      } catch (_error) {
        this.error = 'Unable to load the fashion catalog right now.'
      } finally {
        this.loading = false
      }
    },
    setCategory(category: string): void {
      this.selectedCategory = category
    },
    setSearch(query: string): void {
      this.searchQuery = query
    },
    setSort(sortBy: ProductsState['sortBy']): void {
      this.sortBy = sortBy
    },
    resetFilters(): void {
      this.selectedCategory = 'all'
      this.searchQuery = ''
      this.sortBy = 'featured'
    },
    getCategoryLabel(slug: string): string {
      return slug === 'all' ? 'All Collections' : prettifyCategory(slug)
    },
    getProductById(id: number): ProductItem | undefined {
      return this.products.find((product) => product.id === id)
    },
  },
})
