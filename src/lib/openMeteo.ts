import type { City } from '../data/cities'

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// Only the fields we ask for. Open-Meteo can return null for missing values.
export interface ForecastResponse {
  current: {
    time: string // local Amsterdam time, e.g. "2026-09-30T13:15"
    temperature_2m: number
    weather_code: number
    cloud_cover: number
    is_day: number // 1 or 0
  }
  hourly: {
    time: string[] // "2026-09-30T13:00"; each value covers the hour BEFORE this time
    sunshine_duration: (number | null)[] // seconds
    precipitation: (number | null)[] // mm
  }
  daily: {
    time: string[] // "2026-09-30"
    sunshine_duration: (number | null)[] // seconds
    daylight_duration: (number | null)[] // seconds
    precipitation_sum: (number | null)[] // mm
  }
}

export async function fetchForecast(city: City, signal?: AbortSignal): Promise<ForecastResponse> {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    current: 'temperature_2m,weather_code,cloud_cover,is_day',
    hourly: 'sunshine_duration,precipitation',
    daily: 'sunshine_duration,daylight_duration,precipitation_sum',
    timezone: 'Europe/Amsterdam',
    // The archive lags ~5 days behind; these recent days fill that gap in step 5.
    past_days: '7',
    forecast_days: '1',
  })

  const res = await fetch(`${FORECAST_URL}?${params}`, { signal })
  if (!res.ok) throw new Error(`Open-Meteo responded with ${res.status}`)
  return res.json()
}
