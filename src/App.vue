<script setup lang="ts">
import CityPicker from './components/CityPicker.vue'
import TodayNote from './components/TodayNote.vue'
import Verdict from './components/Verdict.vue'
import WeatherDetails from './components/WeatherDetails.vue'
import { useCity } from './composables/useCity'
import { useWeather } from './composables/useWeather'

const { cityId, city } = useCity()
const { weather, loading, error, retry } = useWeather(city)
</script>

<template>
  <main class="min-h-dvh bg-sky-100 text-slate-900">
    <section
      class="mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center gap-8 px-4 py-12 text-center md:gap-12"
    >
      <h1 class="font-display text-4xl leading-tight md:text-6xl">
        Is it a nice day in
        <span class="whitespace-nowrap"><CityPicker v-model="cityId" />?</span>
      </h1>

      <!-- Placeholder for the hand-drawn animation (step 7) -->
      <div class="aspect-square w-40 rounded-full border-2 border-dashed border-slate-900/20 sm:w-56 md:w-64" aria-hidden="true" />

      <!-- min-h keeps the page from jumping while loading -->
      <div class="flex min-h-72 w-full flex-col items-center justify-start gap-8">
        <p v-if="loading" lang="nl" class="font-display text-3xl text-slate-600">Even kijken…</p>

        <div v-else-if="error" class="space-y-4">
          <p class="text-lg">
            <span lang="nl">Oeps!</span> Couldn't load the weather.
          </p>
          <button
            type="button"
            class="rounded-full bg-slate-900 px-5 py-2 text-sm text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
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
