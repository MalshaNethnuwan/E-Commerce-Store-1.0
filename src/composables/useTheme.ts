import { computed, ref } from 'vue'

const THEME_KEY = 'naura-theme'
const isDark = ref(false)
let initialized = false

const applyTheme = (value: boolean): void => {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem(THEME_KEY, value ? 'dark' : 'light')
}

export const useTheme = () => {
  const initializeTheme = (): void => {
    if (initialized) {
      return
    }

    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark') {
      applyTheme(true)
    } else if (stored === 'light') {
      applyTheme(false)
    } else {
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }

    initialized = true
  }

  const toggleTheme = (): void => {
    applyTheme(!isDark.value)
  }

  return {
    isDark: computed(() => isDark.value),
    initializeTheme,
    toggleTheme,
  }
}
