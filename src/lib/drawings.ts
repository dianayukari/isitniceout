import type { Backdrop } from './niceDay'

// All SVGs in the folder, as text. Matching on the end of the file name means a
// fresh Illustrator export ("Is it nice out_wet.svg") can be dropped in as-is.
const files = import.meta.glob<string>('../assets/drawings/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Square crop of each 802×802 artboard, measured from the Figma design so every
// drawing sits in its box exactly as designed (each one is scaled a bit differently).
const viewBoxes: Record<Backdrop, string> = {
  nice: '139 155 501 501',
  showers: '115 127 547 547',
  grey: '154 170 478 478',
  wet: '118 136 548 548',
}

// Tailwind classes for each moving part, keyed by Illustrator layer name.
// Written out in full here so Tailwind's scanner finds them (see step 4).
const partClasses: Record<string, string> = {
  rays: 'origin-center transform-fill animate-spin-slow motion-reduce:animate-none',
  wind: 'animate-drift motion-reduce:animate-none',
}
const dropClasses = 'animate-fall motion-reduce:animate-none'

function prepare(source: string, viewBox: string): string {
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml')
  const svg = doc.documentElement

  svg.setAttribute('viewBox', viewBox)
  svg.setAttribute('class', 'size-full fill-current') // colour comes from the text colour (ink)
  svg.setAttribute('aria-hidden', 'true')
  doc.querySelectorAll('[fill]').forEach((el) => el.removeAttribute('fill'))

  doc.querySelectorAll('g[id]').forEach((group) => {
    // Illustrator renames repeated layer names across artboards: "drops" -> "drops-2"
    const part = group.id.replace(/-\d+$/, '')
    group.removeAttribute('id') // ids would clash while two drawings crossfade

    if (part === 'drops') {
      // Animate every drop on its own, each starting at a different moment
      group.querySelectorAll('path').forEach((drop, i) => {
        drop.setAttribute('class', dropClasses)
        drop.setAttribute('style', `animation-delay: -${((i * 0.37) % 1.5).toFixed(2)}s`)
      })
    } else if (partClasses[part]) {
      group.setAttribute('class', partClasses[part])
    }
  })

  return new XMLSerializer().serializeToString(svg)
}

const cache = new Map<Backdrop, string>()

// The prepared SVG markup for a backdrop, ready for v-html
export function drawingFor(backdrop: Backdrop): string {
  let svg = cache.get(backdrop)
  if (!svg) {
    const file = Object.entries(files).find(
      ([path]) => path.endsWith(`_${backdrop}.svg`) || path.endsWith(`/${backdrop}.svg`),
    )
    if (!file) throw new Error(`No drawing for "${backdrop}" in src/assets/drawings`)
    svg = prepare(file[1], viewBoxes[backdrop])
    cache.set(backdrop, svg)
  }
  return svg
}
