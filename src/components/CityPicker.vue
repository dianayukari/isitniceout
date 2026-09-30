<script setup lang="ts">
import { computed } from 'vue'
import { cities } from '../data/cities'

// defineModel makes `v-model="cityId"` work on <CityPicker>
const cityId = defineModel<string>({ required: true })
const name = computed(() => cities.find((c) => c.id === cityId.value)?.name)
</script>

<template>
  <!--
    The visible part is just styled text. An invisible native <select> is stretched
    over it (absolute inset-0 opacity-0), so clicking the name opens the real
    picker: a wheel on iPhone, a list on desktop, keyboard support for free.
  -->
  <span
    class="relative inline-flex items-baseline gap-[0.15em] rounded-lg focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-current"
  >
    <span class="italic underline decoration-current/30 decoration-2 underline-offset-[0.15em]">{{ name }}</span>
    <svg class="size-[0.4em] shrink-0 self-center opacity-60" viewBox="0 0 12 8" aria-hidden="true">
      <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <select v-model="cityId" aria-label="Choose a city" class="absolute inset-0 cursor-pointer text-base opacity-0">
      <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
  </span>
</template>
