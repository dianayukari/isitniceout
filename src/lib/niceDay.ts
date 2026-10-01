// The one place that defines a "nice day". Used for today AND for the 5-year history.
export const MIN_SUN_SHARE = 0.5
export const MAX_PRECIPITATION_MM = 1

export interface DayTotals {
  sunshineSeconds: number
  daylightSeconds: number
  precipitationMm: number // rain + showers + snow (as water)
}

function checks(day: DayTotals) {
  const sunShare = day.daylightSeconds > 0 ? day.sunshineSeconds / day.daylightSeconds : 0
  return {
    sunny: sunShare > MIN_SUN_SHARE,
    dry: day.precipitationMm < MAX_PRECIPITATION_MM,
  }
}

export function isNiceDay(day: DayTotals): boolean {
  const { sunny, dry } = checks(day)
  return sunny && dry
}

// The short line under "Ja!" / "Nee."
export function verdictReason(day: DayTotals): string {
  const { sunny, dry } = checks(day)
  if (sunny && dry) return 'Sunny most of the day, and dry.'
  if (!sunny && !dry) return 'Not enough sun, and too much rain.'
  if (!sunny) return 'Not enough sun today.'
  return 'Sunny, but too much rain.'
}

// The page background follows the answer, one look per combination of the two rules:
//                 dry         too much rain
// enough sun      'nice'      'showers'
// not enough sun  'grey'      'wet'
export type Backdrop = 'nice' | 'showers' | 'grey' | 'wet'

export function backdropFor(day: DayTotals): Backdrop {
  const { sunny, dry } = checks(day)
  if (sunny) return dry ? 'nice' : 'showers'
  return dry ? 'grey' : 'wet'
}
