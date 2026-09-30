import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import type { City } from '../data/cities'
import { fetchForecast } from '../lib/openMeteo'
import { summarizeToday, type TodayWeather } from '../lib/today'

// Fetches today's weather for a city, and fetches again whenever the city changes.
export function useWeather(city: MaybeRefOrGetter<City>) {
  const weather = ref<TodayWeather | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  const attempt = ref(0) // bumping this re-runs the watcher below

  watch(
    [() => toValue(city), attempt],
    async ([c], _old, onCleanup) => {
      // If the city changes before this request finishes, cancel it,
      // so an old city's answer can never replace the new one.
      const controller = new AbortController()
      onCleanup(() => controller.abort())

      loading.value = true
      error.value = null
      try {
        weather.value = summarizeToday(await fetchForecast(c, controller.signal))
      } catch (e) {
        if (controller.signal.aborted) return
        error.value = e instanceof Error ? e.message : String(e)
        weather.value = null
      }
      loading.value = false
    },
    { immediate: true },
  )

  const retry = () => attempt.value++

  return { weather, loading, error, retry }
}
