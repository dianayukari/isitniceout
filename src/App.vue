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
// The drawing waits for a real answer (or a preview), instead of showing the grey placeholder look
const drawing = computed<Backdrop | null>(() => (weather.value || previewBackdrop ? backdrop.value : null))
</script>

<template>
  <!-- isolate: keeps the -z-10 background inside <main> instead of behind the whole page -->
  <main class="relative isolate min-h-dvh text-ink">
    <WeatherBackground :backdrop="backdrop" />

    <!-- Layout from the Figma design: top-aligned column, 15px between the three parts -->
    <section class="mx-auto flex min-h-dvh max-w-4xl flex-col items-center gap-[15px] px-[44px] pt-[69px] pb-12">
      <!--
        flex-wrap: on a narrow screen the city moves to a second line as a whole.
        The city and "?" share a whitespace-nowrap span so "?" never ends up alone.
      -->
      <h1 class="flex flex-wrap justify-center gap-x-[3px] text-[24px] leading-[normal] md:text-[32px]">
        <span class="py-[3px]">Is it a nice day in</span>
        <span class="flex gap-x-[3px] whitespace-nowrap">
          <CityPicker v-model="cityId" />
          <span class="py-[3px]">?</span>
        </span>
      </h1>

      <WeatherDrawing :backdrop="drawing" />

      <!-- min-h: the height of the answer row, so the page doesn't jump while loading -->
      <div class="flex min-h-[76px] w-full flex-col items-center gap-6">
        <p v-if="loading" lang="nl" class="text-[24px]">Even kijken…</p>

        <div v-else-if="error" class="flex flex-col items-center gap-3 text-[16px]">
          <p><span lang="nl">Oeps!</span> Couldn't load the weather.</p>
          <button
            type="button"
            class="rounded-full border border-current px-4 py-1 hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            @click="retry"
          >
            Try again
          </button>
        </div>

        <template v-else-if="weather">
          <!-- items-end: the answer column and the table line up at the bottom -->
          <div class="flex items-end justify-center gap-[25px]">
            <Verdict :weather="weather" />
            <WeatherDetails :weather="weather" />
          </div>
          <TodayNote :weather="weather" />
        </template>
      </div>
    </section>
  </main>
</template>
