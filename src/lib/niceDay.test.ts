import { describe, expect, it } from 'vitest'
import { backdropFor, isNiceDay, verdictReason } from './niceDay'

const HOUR = 3600

describe('isNiceDay', () => {
  it('is nice with more than half the daylight sunny and under 1 mm', () => {
    expect(isNiceDay({ sunshineSeconds: 7 * HOUR, daylightSeconds: 12 * HOUR, precipitationMm: 0.9 })).toBe(true)
  })

  it('is not nice at exactly 50% sun', () => {
    expect(isNiceDay({ sunshineSeconds: 6 * HOUR, daylightSeconds: 12 * HOUR, precipitationMm: 0 })).toBe(false)
  })

  it('is not nice with 1 mm or more, however sunny', () => {
    expect(isNiceDay({ sunshineSeconds: 11 * HOUR, daylightSeconds: 12 * HOUR, precipitationMm: 1 })).toBe(false)
  })

  it('is not nice without daylight data', () => {
    expect(isNiceDay({ sunshineSeconds: 0, daylightSeconds: 0, precipitationMm: 0 })).toBe(false)
  })
})

describe('verdictReason', () => {
  const day = (sunHours: number, mm: number) => ({ sunshineSeconds: sunHours * HOUR, daylightSeconds: 12 * HOUR, precipitationMm: mm })

  it('explains which rule failed', () => {
    expect(verdictReason(day(8, 0))).toBe('Sunny most of the day, and dry.')
    expect(verdictReason(day(2, 5))).toBe('Not enough sun, and too much rain.')
    expect(verdictReason(day(2, 0))).toBe('Not enough sun today.')
    expect(verdictReason(day(8, 5))).toBe('Sunny, but too much rain.')
  })
})

describe('backdropFor', () => {
  const day = (sunHours: number, mm: number) => ({ sunshineSeconds: sunHours * HOUR, daylightSeconds: 12 * HOUR, precipitationMm: mm })

  it('has one backdrop per combination of sun and rain', () => {
    expect(backdropFor(day(8, 0))).toBe('nice')
    expect(backdropFor(day(8, 5))).toBe('showers')
    expect(backdropFor(day(2, 0))).toBe('grey')
    expect(backdropFor(day(2, 5))).toBe('wet')
  })
})
