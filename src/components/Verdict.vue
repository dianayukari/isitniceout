<script setup lang="ts">
import { computed } from 'vue'
import { verdictReason } from '../lib/niceDay'
import type { TodayWeather } from '../lib/today'

const props = defineProps<{ weather: TodayWeather }>()
const reason = computed(() => verdictReason(props.weather.today))
</script>

<template>
  <div>
    <p lang="nl" class="font-display text-8xl leading-none font-semibold tracking-tight md:text-9xl">
      {{ weather.isNice ? 'Ja!' : 'Nee.' }}
    </p>
    <p class="mt-4 text-lg text-slate-700 md:text-xl">{{ reason }}</p>
  </div>
</template>
