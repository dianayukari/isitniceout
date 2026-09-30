import { isNiceDay, type DayTotals } from './niceDay'
import type { ForecastResponse } from './openMeteo'

export interface SunAndRain {
  sunshineSeconds: number
  precipitationMm: number
}

export interface TodayWeather {
  isNice: boolean
  current: {
    time: string
    temperature: number
    weatherCode: number
    cloudCover: number
    isDay: boolean
  }
  today: DayTotals
  // soFar + expected always add up to today's totals
  soFar: SunAndRain
  expected: SunAndRain
  // true once no forecast hours are left, i.e. the answer is final
  isComplete: boolean
}

// Turns the raw API response into exactly what the app needs for today.
export function summarizeToday(res: ForecastResponse): TodayWeather {
  const date = res.current.time.slice(0, 10) // "2026-09-30"
  // "2026-09-30T13:15" -> "2026-09-30T13:00". Hourly slots up to and including this one are in the past.
  const currentHour = `${res.current.time.slice(0, 13)}:00`

  const soFar: SunAndRain = { sunshineSeconds: 0, precipitationMm: 0 }
  const expected: SunAndRain = { sunshineSeconds: 0, precipitationMm: 0 }
  let hoursLeft = 0

  res.hourly.time.forEach((time, i) => {
    if (!time.startsWith(date)) return
    // Same format on both sides, so comparing the strings compares the times.
    const isPast = time <= currentHour
    if (!isPast) hoursLeft++
    const bucket = isPast ? soFar : expected
    bucket.sunshineSeconds += res.hourly.sunshine_duration[i] ?? 0
    bucket.precipitationMm += res.hourly.precipitation[i] ?? 0
  })

  const d = res.daily.time.indexOf(date)
  if (d === -1) throw new Error(`No daily data for ${date}`)
  const today: DayTotals = {
    sunshineSeconds: res.daily.sunshine_duration[d] ?? 0,
    daylightSeconds: res.daily.daylight_duration[d] ?? 0,
    precipitationMm: res.daily.precipitation_sum[d] ?? 0,
  }

  return {
    isNice: isNiceDay(today),
    current: {
      time: res.current.time,
      temperature: res.current.temperature_2m,
      weatherCode: res.current.weather_code,
      cloudCover: res.current.cloud_cover,
      isDay: res.current.is_day === 1,
    },
    today,
    soFar,
    expected,
    isComplete: hoursLeft === 0,
  }
}
