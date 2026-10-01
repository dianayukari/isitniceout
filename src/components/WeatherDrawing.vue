<script setup lang="ts">
import { computed } from 'vue'
import { drawingFor } from '../lib/drawings'
import type { Backdrop } from '../lib/niceDay'

// null while there's no answer yet: the space stays reserved but empty
const props = defineProps<{ backdrop: Backdrop | null }>()
const svg = computed(() => (props.backdrop ? drawingFor(props.backdrop) : null))
</script>

<template>
  <div class="relative aspect-square w-60 sm:w-72 md:w-80">
    <!--
      <Transition> adds these classes while a drawing enters or leaves.
      The leaving one is taken out of the flow (absolute inset-0) so both
      overlap and crossfade, just like the background layers.
    -->
    <Transition
      enter-active-class="transition-opacity duration-1000 motion-reduce:transition-none"
      leave-active-class="absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <!-- v-html is safe here: the markup is our own SVG files, never user input -->
      <div v-if="svg" :key="backdrop!" class="size-full" v-html="svg" />
    </Transition>
  </div>
</template>
