<script setup lang="ts">
import type { Backdrop } from '../lib/niceDay'

defineProps<{ backdrop: Backdrop }>()

// From the Figma design: two semi-transparent colours over white.
// `from-[#ff8c00]/28` = that hex colour at 28% opacity.
// Full class names written out: Tailwind finds classes by scanning the source,
// so a class built at runtime (like `from-${color}`) would never be generated.
const gradients: Record<Backdrop, string> = {
  nice: 'from-[#ff8c00]/28 to-[#0059ff]/28',
  showers: 'from-[#fd6012]/30 to-[#2721e4]/30',
  grey: 'from-[#a990f1]/34 to-[#4200ff]/34',
  wet: 'from-[#9c06d7]/40 to-[#4200ff]/40',
}
</script>

<template>
  <!--
    A gradient can't be animated into another gradient, so every backdrop gets
    its own full-screen layer, stacked on top of each other. Only the active one
    has opacity-100; a new answer fades one layer out and the next one in.
    bg-white underneath: the design's colours are see-through, over white.
  -->
  <div class="fixed inset-0 -z-10 bg-white" aria-hidden="true">
    <div
      v-for="(classes, key) in gradients"
      :key="key"
      class="absolute inset-0 bg-linear-to-b transition-opacity duration-1000 motion-reduce:transition-none"
      :class="[classes, key === backdrop ? 'opacity-100' : 'opacity-0']"
    />
  </div>
</template>
