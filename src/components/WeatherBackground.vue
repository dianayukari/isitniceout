<script setup lang="ts">
import type { Backdrop } from '../lib/niceDay'

defineProps<{ backdrop: Backdrop }>()

// Full class names written out: Tailwind finds classes by scanning the source,
// so a class built at runtime (like `from-${color}-200`) would never be generated.
const gradients: Record<Backdrop, string> = {
  nice: 'from-amber-200 via-yellow-100 to-sky-200',
  showers: 'from-slate-400 via-sky-300 to-amber-100',
  grey: 'from-slate-300 via-slate-200 to-slate-100',
  wet: 'from-slate-500 via-slate-600 to-slate-700',
}
</script>

<template>
  <!--
    A gradient can't be animated into another gradient, so every backdrop gets
    its own full-screen layer, stacked on top of each other. Only the active one
    has opacity-100; a new answer fades one layer out and the next one in.
  -->
  <div class="fixed inset-0 -z-10" aria-hidden="true">
    <div
      v-for="(classes, key) in gradients"
      :key="key"
      class="absolute inset-0 bg-linear-to-b transition-opacity duration-1000 motion-reduce:transition-none"
      :class="[classes, key === backdrop ? 'opacity-100' : 'opacity-0']"
    />
  </div>
</template>
