import { defineStore } from 'pinia'
import axios from 'axios'
import type { AuthUser, LoginPayload } from '@/types/auth'

const AUTH_KEY = 'naura-auth'

interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated(state): boolean {
      return state.user !== null
    },
    fullName(state): string {
      return state.user ? `${state.user.firstName} ${state.user.lastName}` : 'Guest'
    },
  },
  actions: {
    hydrate(): void {
      const raw = localStorage.getItem(AUTH_KEY)
      if (!raw) {
        return
      }

      try {
        this.user = JSON.parse(raw) as AuthUser
      } catch {
        this.user = null
      }
    },
    async login(payload: LoginPayload): Promise<boolean> {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post<AuthUser>('https://dummyjson.com/auth/login', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        this.user = response.data
        localStorage.setItem(AUTH_KEY, JSON.stringify(response.data))
        return true
      } catch (_error) {
        this.error = 'Login failed. Please verify your credentials and try again.'
        return false
      } finally {
        this.loading = false
      }
    },
    logout(): void {
      this.user = null
      this.error = null
      localStorage.removeItem(AUTH_KEY)
    },
  },
})
