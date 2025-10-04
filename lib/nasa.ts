import dayjs from 'dayjs'

interface RawMeteor {
  id?: string
  name?: string
  mass?: string
  year?: string
  reclat?: string
  reclong?: string
  recclass?: string
  [key: string]: any
}

interface SanitizedMeteor {
  id: string
  name: string
  mass: number | null
  year: string | null
  lat: number
  lng: number
  recclass: string
}

export function sanitizeMeteor(raw: RawMeteor): SanitizedMeteor | null {
  try {
    // Parse coordinates
    const lat = parseFloat(raw.reclat || '')
    const lng = parseFloat(raw.reclong || '')

    // Skip if missing or invalid coordinates
    if (isNaN(lat) || isNaN(lng)) {
      return null
    }

    // Skip if coordinates are out of valid range
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return null
    }

    // Parse mass (optional)
    let mass: number | null = null
    if (raw.mass) {
      const parsedMass = parseFloat(raw.mass)
      if (!isNaN(parsedMass) && parsedMass > 0) {
        mass = parsedMass
      }
    }

    // Parse year (optional)
    let year: string | null = null
    if (raw.year) {
      try {
        const parsed = dayjs(raw.year)
        if (parsed.isValid()) {
          year = parsed.year().
          toString()
        }
      } catch (e) {
        // Year parsing failed, leave as null
      }
    }

    return {
      id: raw.id || `meteor-${Date.now()}-${Math.random()}`,
      name: raw.name || 'Unknown',
      mass,
      year,
      lat,
      lng,
      recclass: raw.recclass || 'Unknown',
    }
  } catch (error) {
    console.error('Error sanitizing meteor:', error)
    return null
  }
}