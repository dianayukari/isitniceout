export interface City {
  id: string
  name: string
  lat: number
  lon: number
}

export const cities: City[] = [
  { id: 'amsterdam', name: 'Amsterdam', lat: 52.3676, lon: 4.9041 },
  { id: 'rotterdam', name: 'Rotterdam', lat: 51.9244, lon: 4.4777 },
  { id: 'den-haag', name: 'Den Haag', lat: 52.0705, lon: 4.3007 },
  { id: 'utrecht', name: 'Utrecht', lat: 52.0907, lon: 5.1214 },
  { id: 'eindhoven', name: 'Eindhoven', lat: 51.4416, lon: 5.4697 },
  { id: 'groningen', name: 'Groningen', lat: 53.2194, lon: 6.5665 },
  { id: 'maastricht', name: 'Maastricht', lat: 50.8514, lon: 5.691 },
  { id: 'leeuwarden', name: 'Leeuwarden', lat: 53.2012, lon: 5.7999 },
  { id: 'zwolle', name: 'Zwolle', lat: 52.5168, lon: 6.083 },
  { id: 'nijmegen', name: 'Nijmegen', lat: 51.8126, lon: 5.8372 },
  { id: 'enschede', name: 'Enschede', lat: 52.2215, lon: 6.8937 },
  { id: 'middelburg', name: 'Middelburg', lat: 51.4988, lon: 3.6136 },
  { id: 'haarlem', name: 'Haarlem', lat: 52.3874, lon: 4.6462 },
  { id: 'breda', name: 'Breda', lat: 51.5719, lon: 4.7683 },
  { id: 'den-helder', name: 'Den Helder', lat: 52.9563, lon: 4.7601 },
]
