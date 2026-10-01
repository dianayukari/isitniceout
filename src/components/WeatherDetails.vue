<script setup lang="ts">
import { computed } from 'vue'
import { formatDuration, formatTemperature } from '../lib/format'
import type { TodayWeather } from '../lib/today'
import { weatherLabel } from '../lib/weatherCodes'

const props = defineProps<{ weather: TodayWeather }>()

const items = computed(() => [
  { label: 'Temperature', value: formatTemperature(props.weather.current.temperature) },
  { label: 'Right now', value: weatherLabel(props.weather.current.weatherCode) },
  { label: 'Cloud cover', value: `${props.weather.current.cloudCover}%` },
  { label: 'zon vandaag', value: formatDuration(props.weather.today.sunshineSeconds), lang: 'nl' },
])
</script>

<template>
  <!-- 2 columns on phones, 4 in one row from the md breakpoint (768px) up -->
  <dl class="grid w-full max-w-2xl grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
    <!-- flex-col-reverse: <dt> must come first in the HTML, but we want the value on top -->
    <div v-for="item in items" :key="item.label" class="flex flex-col-reverse gap-1">
      <dt class="text-xs tracking-wider text-ink-muted uppercase" :lang="item.lang">{{ item.label }}</dt>
      <dd class="font-display text-2xl">{{ item.value }}</dd>
    </div>
  </dl>
</template>
