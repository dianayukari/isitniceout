<script setup lang="ts">
import { computed } from 'vue'
import { formatDuration, formatTemperature } from '../lib/format'
import type { TodayWeather } from '../lib/today'
import { weatherLabel } from '../lib/weatherCodes'

const props = defineProps<{ weather: TodayWeather }>()

const items = computed(() => [
  { label: 'Temperature', value: formatTemperature(props.weather.current.temperature) },
  { label: 'Right now', value: weatherLabel(props.weather.current.weatherCode).toLowerCase() },
  { label: 'Cloud cover', value: `${props.weather.current.cloudCover}%` },
  { label: 'Sun time', value: formatDuration(props.weather.today.sunshineSeconds) },
])
</script>

<template>
  <!--
    A 2-column table: labels left, values right.
    grid-cols-[auto_auto]: each column is as wide as its longest text.
    `contents` makes each row's <div> "disappear" for the layout, so its
    <dt> and <dd> become cells of the grid directly.
  -->
  <dl class="grid grid-cols-[auto_auto] gap-x-[10px] gap-y-[2px] text-[13px] leading-[normal] md:text-[16px]">
    <div v-for="item in items" :key="item.label" class="contents">
      <dt class="uppercase">{{ item.label }}</dt>
      <dd>{{ item.value }}</dd>
    </div>
  </dl>
</template>
