import { describe, expect, it } from 'vitest'
import type { ForecastResponse } from './openMeteo'
import { summarizeToday } from './today'

function hours(date: string) {
  return Array.from({ length: 24 }, (_, h) => `${date}T${String(h).padStart(2, '0')}:00`)
}

// Yesterday + today, with sun from 10:00 to 15:00 and rain in the evening today.
const time = [...hours('2026-09-29'), ...hours('2026-09-30')]
const sun = time.map((t) => (t.startsWith('2026-09-29') ? 3600 : ['10', '11', '12', '13', '14', '15'].includes(t.slice(11, 13)) ? 3600 : 0))
const rain = time.map((t) => (t === '2026-09-30T20:00' ? 0.4 : t === '2026-09-30T08:00' ? 0.2 : 0))

const response: ForecastResponse = {
  current: { time: '2026-09-30T13:15', temperature_2m: 18.2, weather_code: 2, cloud_cover: 40, is_day: 1 },
  hourly: { time, sunshine_duration: sun, precipitation: rain },
  daily: {
    time: ['2026-09-29', '2026-09-30'],
    sunshine_duration: [24 * 3600, 6 * 3600],
    daylight_duration: [12 * 3600, 11 * 3600],
    precipitation_sum: [0, 0.6],
  },
}

describe('summarizeToday', () => {
  const result = summarizeToday(response)

  it('uses the full-day totals for the answer', () => {
    expect(result.today).toEqual({ sunshineSeconds: 6 * 3600, daylightSeconds: 11 * 3600, precipitationMm: 0.6 })
    expect(result.isNice).toBe(true) // 6/11 = 55% sun, 0.6 mm
  })

  it('splits today at the current hour, ignoring yesterday', () => {
    // 10:00-13:00 slots are past (4 h), 14:00-15:00 still to come (2 h)
    expect(result.soFar.sunshineSeconds).toBe(4 * 3600)
    expect(result.expected.sunshineSeconds).toBe(2 * 3600)
    expect(result.soFar.precipitationMm).toBeCloseTo(0.2)
    expect(result.expected.precipitationMm).toBeCloseTo(0.4)
    expect(result.isComplete).toBe(false)
  })

  it('is complete during the last hour of the day', () => {
    const late = summarizeToday({ ...response, current: { ...response.current, time: '2026-09-30T23:30' } })
    expect(late.isComplete).toBe(true)
    expect(late.soFar.sunshineSeconds).toBe(6 * 3600)
  })

  it('maps the current conditions', () => {
    expect(result.current).toEqual({ time: '2026-09-30T13:15', temperature: 18.2, weatherCode: 2, cloudCover: 40, isDay: true })
  })
})
