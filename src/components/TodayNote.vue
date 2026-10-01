<script setup lang="ts">
import { formatDuration, formatMm } from '../lib/format'
import type { TodayWeather } from '../lib/today'

defineProps<{ weather: TodayWeather }>()
</script>

<template>
  <!-- Only while part of today is still a forecast. Not in the Figma design; kept small. -->
  <p v-if="!weather.isComplete" class="text-center text-[13px] leading-[1.05] opacity-80">
    So far: {{ formatDuration(weather.soFar.sunshineSeconds) }} <span lang="nl">zon</span>,
    {{ formatMm(weather.soFar.precipitationMm) }} <span lang="nl">regen</span>
    <br />
    Still expected: {{ formatDuration(weather.expected.sunshineSeconds) }} <span lang="nl">zon</span>,
    {{ formatMm(weather.expected.precipitationMm) }} <span lang="nl">regen</span>
  </p>
</template>
