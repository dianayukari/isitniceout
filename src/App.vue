<script setup lang="ts">
import { computed } from 'vue'
import CityPicker from './components/CityPicker.vue'
import TodayNote from './components/TodayNote.vue'
import Verdict from './components/Verdict.vue'
import WeatherBackground from './components/WeatherBackground.vue'
import WeatherDetails from './components/WeatherDetails.vue'
import WeatherDrawing from './components/WeatherDrawing.vue'
import { useCity } from './composables/useCity'
import { useWeather } from './composables/useWeather'
import { backdropFor, type Backdrop } from './lib/niceDay'

const { cityId, city } = useCity()
const { weather, loading, error, retry } = useWeather(city)

// Development only: add ?backdrop=nice (or showers, grey, wet) to the URL to preview a backdrop.
const previewBackdrop = import.meta.env.DEV
  ? (new URLSearchParams(window.location.search).get('backdrop') as Backdrop | null)
  : null

// The background follows the answer. Grey until the first answer arrives; while
// another city loads, `weather` still holds the previous city, so it doesn't flash.
const backdrop = computed<Backdrop>(() => {
  if (previewBackdrop) return previewBackdrop
  if (!weather.value) return 'grey'
  return backdropFor(weather.value.today)
})
const isDark = computed(() => backdrop.value === 'wet')
// The drawing waits for a real answer (or a preview), instead of showing the grey placeholder look
const drawing = computed<Backdrop | null>(() => (weather.value || previewBackdrop ? backdrop.value : null))
</script>

<template>
  <!-- isolate: keeps the -z-10 background inside <main> instead of behind the whole page -->
  <main
    class="relative isolate min-h-dvh text-ink transition-colors duration-1000 motion-reduce:transition-none"
    :class="{ 'on-dark': isDark }"
  >
    <WeatherBackground :backdrop="backdrop" />

    <section
      class="mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center gap-8 px-4 py-12 text-center md:gap-12"
    >
      <h1 class="font-display text-4xl leading-tight md:text-6xl">
        Is it a nice day in
        <span class="whitespace-nowrap"><CityPicker v-model="cityId" />?</span>
      </h1>

      <WeatherDrawing :backdrop="drawing" />

      <!-- min-h keeps the page from jumping while loading -->
      <div class="flex min-h-72 w-full flex-col items-center justify-start gap-8">
        <p v-if="loading" lang="nl" class="font-display text-3xl text-ink-muted">Even kijken…</p>

        <div v-else-if="error" class="space-y-4">
          <p class="text-lg">
            <span lang="nl">Oeps!</span> Couldn't load the weather.
          </p>
          <button
            type="button"
            class="rounded-full border-2 border-current px-5 py-2 text-sm hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            @click="retry"
          >
            Try again
          </button>
        </div>

        <template v-else-if="weather">
          <Verdict :weather="weather" />
          <WeatherDetails :weather="weather" />
          <TodayNote :weather="weather" />
        </template>
      </div>
    </section>
  </main>
</template>
