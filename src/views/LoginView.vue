<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  username: '',
  password: '',
})

const handleSubmit = async (): Promise<void> => {
  const success = await authStore.login({
    username: form.username,
    password: form.password,
    expiresInMins: 30,
  })

  if (success) {
    await router.push('/')
  }
}
</script>

<template>
  <section class="container-shell section-space">
    <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-500">Client account</p>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back to ÉLAN MODE</h1>
        <p class="max-w-xl mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
          Sign in to keep your experience seamless across sessions with account-aware state and persistent access.
        </p>
        <div class="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Account status</p>
          <p class="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
            {{ authStore.isAuthenticated ? `Signed in as ${authStore.fullName}` : 'Not signed in' }}
          </p>
          <button
            v-if="authStore.isAuthenticated"
            type="button"
            class="px-5 py-3 mt-6 text-sm font-semibold border rounded-full border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200"
            @click="authStore.logout"
          >
            Log out
          </button>
        </div>
      </div>

      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Username</label>
            <input id="username" v-model="form.username" type="text" required class="w-full px-4 py-3 text-sm rounded-2xl border-slate-300 bg-slate-50 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white" />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
            <input id="password" v-model="form.password" type="password" required class="w-full px-4 py-3 text-sm rounded-2xl border-slate-300 bg-slate-50 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white" />
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Use valid DummyJSON account credentials to test the authentication flow.</p>
          <p v-if="authStore.error" class="px-4 py-3 text-sm rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
            {{ authStore.error }}
          </p>
          <button type="submit" class="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950" :disabled="authStore.loading">
            {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
