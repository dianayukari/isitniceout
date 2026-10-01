<script setup lang="ts">
import { formatDuration, formatMm } from '../lib/format'
import type { TodayWeather } from '../lib/today'

defineProps<{ weather: TodayWeather }>()
</script>

<template>
  <!-- Only while part of today is still a forecast -->
  <p v-if="!weather.isComplete" class="text-sm text-ink-muted">
    <span class="block sm:inline">
      So far: {{ formatDuration(weather.soFar.sunshineSeconds) }} <span lang="nl">zon</span>,
      {{ formatMm(weather.soFar.precipitationMm) }} <span lang="nl">regen</span>
    </span>
    <span class="hidden sm:inline" aria-hidden="true"> · </span>
    <span class="block sm:inline">
      Still expected: {{ formatDuration(weather.expected.sunshineSeconds) }} <span lang="nl">zon</span>,
      {{ formatMm(weather.expected.precipitationMm) }} <span lang="nl">regen</span>
    </span>
  </p>
</template>
