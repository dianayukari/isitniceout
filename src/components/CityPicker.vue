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
    class="relative border-b border-current py-[3px] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-current"
  >
    {{ name }}
    <select v-model="cityId" aria-label="Choose a city" class="absolute inset-0 cursor-pointer text-base opacity-0">
      <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
  </span>
</template>
