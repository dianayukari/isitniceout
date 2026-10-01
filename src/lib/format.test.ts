import { describe, expect, it } from 'vitest'
import { formatDuration, formatMm, formatTemperature } from './format'

describe('format', () => {
  it('formats durations', () => {
    expect(formatDuration(20163.25)).toBe('5h36m')
    expect(formatDuration(2700)).toBe('45m')
    expect(formatDuration(3600)).toBe('1h00m')
    expect(formatDuration(0)).toBe('0m')
  })

  it('formats precipitation to one decimal', () => {
    expect(formatMm(1.4)).toBe('1.4 mm')
    expect(formatMm(0.30000000000000004)).toBe('0.3 mm')
    expect(formatMm(0)).toBe('0 mm')
  })

  it('rounds temperatures', () => {
    expect(formatTemperature(24.6)).toBe('25°C')
    expect(formatTemperature(-0.4)).toBe('0°C')
    expect(formatTemperature(-3.6)).toBe('-4°C')
  })
})
