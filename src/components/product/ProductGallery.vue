<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  images: string[]
  fallback: string
}>()

const selected = ref(0)
watch(
  () => props.images,
  () => {
    selected.value = 0
  },
)
</script>

<template>
  <div>
    <img
      :src="props.images[selected] || props.fallback"
      alt="Product image"
      class="h-[520px] w-full rounded-[2rem] object-cover shadow-soft"
    />
    <div class="grid grid-cols-4 gap-3 mt-4">
      <button
        v-for="(image, index) in props.images.slice(0, 4)"
        :key="`${image}-${index}`"
        type="button"
        class="overflow-hidden border-2 rounded-2xl"
        :class="selected === index ? 'border-slate-900 dark:border-white' : 'border-transparent'"
        @click="selected = index"
      >
        <img :src="image" alt="Thumbnail" class="object-cover w-full h-24" />
      </button>
    </div>
  </div>
</template>
