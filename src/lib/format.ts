// 20163 -> "5h36m", 2700 -> "45m"
export function formatDuration(seconds: number): string {
  const totalMinutes = Math.round(seconds / 60)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m}m`
  return `${h}h${String(m).padStart(2, '0')}m`
}

// 1.4 -> "1.4 mm", 0 -> "0 mm"
export function formatMm(mm: number): string {
  return `${Math.round(mm * 10) / 10} mm`
}

export function formatTemperature(celsius: number): string {
  return `${Math.round(celsius)}°C`
}
