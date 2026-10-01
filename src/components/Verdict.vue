<script setup lang="ts">
import { computed } from 'vue'
import { verdictReason } from '../lib/niceDay'
import type { TodayWeather } from '../lib/today'

const props = defineProps<{ weather: TodayWeather }>()
const reason = computed(() => verdictReason(props.weather.today))
</script>

<template>
  <div class="flex flex-col">
    <p lang="nl" class="text-[40px] leading-[normal] whitespace-nowrap md:text-[56px]">
      {{ weather.isNice ? 'Ja!' : 'Nee' }}
    </p>
    <!-- Narrow on purpose (from the design), so the reason wraps into a short column -->
    <p class="w-[66px] text-[13px] leading-[1.05] md:w-[88px] md:text-[16px]">{{ reason }}</p>
  </div>
</template>
