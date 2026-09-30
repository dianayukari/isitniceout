import { computed, ref, watch } from 'vue'
import { cities } from '../data/cities'

const DEFAULT_CITY_ID = 'amsterdam'

// The selected city, kept in the URL (?city=utrecht) so links can be shared.
export function useCity() {
  const fromUrl = new URLSearchParams(window.location.search).get('city')
  const cityId = ref(cities.some((c) => c.id === fromUrl) ? fromUrl! : DEFAULT_CITY_ID)

  const city = computed(() => cities.find((c) => c.id === cityId.value) ?? cities[0]!)

  watch(
    city,
    (c) => {
      const url = new URL(window.location.href)
      url.searchParams.set('city', c.id)
      // replaceState changes the address bar without reloading or adding a history entry
      window.history.replaceState(null, '', url)
      document.title = `Is it a nice day in ${c.name}?`
    },
    { immediate: true },
  )

  return { cityId, city }
}
