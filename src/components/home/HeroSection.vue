<template>
  <section class="relative overflow-hidden bg-hero-glow">
    <div class="container-shell grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-500">Spring / Summer Edit</p>
        <h1 class="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          Contemporary fashion with a
          <span class="gradient-text">runway-level finish</span>
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Discover elevated pieces curated for sharp tailoring, relaxed luxury, and modern occasion dressing.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <RouterLink
            to="/shop"
            class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          >
            Explore Collection
          </RouterLink>
          <RouterLink
            to="/favorites"
            class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 dark:border-slate-700 dark:text-slate-200"
          >
            View Saved Pieces
          </RouterLink>
        </div>
        <div class="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
            <p class="text-2xl font-bold">190+</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Curated premium items</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
            <p class="text-2xl font-bold">24h</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Fast order dispatch</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
            <p class="text-2xl font-bold">4.8★</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Client satisfaction</p>
          </div>
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <img class="h-[520px] w-full rounded-[2rem] object-cover shadow-soft sm:mt-10" src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" alt="Fashion editorial" />
        <div class="space-y-4">
          <img class="h-64 w-full rounded-[2rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80" alt="Luxury fashion accessories" />
          <img class="h-64 w-full rounded-[2rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80" alt="Modern womenswear" />
        </div>
      </div>
    </div>
  </section>
</template>
