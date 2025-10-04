import { NextRequest, NextResponse } from 'next/server'
import { sanitizeMeteor } from '@/lib/nasa'

// In-memory cache with TTL
let cache: { data: any[] | null; timestamp: number } = {
  data: null,
  timestamp: 0,
}

const CACHE_TTL = 30 * 60 * 1000 // 30 minutes
const DEFAULT_LIMIT = 1000
const MAX_LIMIT = 10000

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam) : DEFAULT_LIMIT

    if (isNaN(limit) || limit < 1 || limit > MAX_LIMIT) {
      return NextResponse.json(
        { error: `Invalid limit parameter. Must be between 1 and ${MAX_LIMIT}.` },
        { status: 400 }
      )
    }

    const now = Date.now()

    // Serve from cache if valid
    if (cache.data && now - cache.timestamp < CACHE_TTL) {
      return NextResponse.json(cache.data.slice(0, limit))
    }

    const nasaUrl = process.env.NASA_API_URL || 'https://data.nasa.gov/resource/y77d-th95.json'
    const fetchUrl = `${nasaUrl}?$limit=${limit}`

    // Use fetch with timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10s timeout

    let rawData: any[] = []
    try {
      const response = await fetch(fetchUrl, { signal: controller.signal })
      clearTimeout(timeout)

      if (!response.ok) {
        throw new Error(`NASA API returned ${response.status}`)
      }

      rawData = await response.json()
    } catch (err: any) {
      console.error('Error fetching NASA API:', err)
      return NextResponse.json({ error: 'Failed to fetch meteorite data from NASA' }, { status: 502 })
    }

    // Sanitize safely
    const sanitized = rawData
      .map((m) => {
        try {
          return sanitizeMeteor(m)
        } catch {
          return null
        }
      })
      .filter((m) => m !== null)

    // Update cache
    cache = { data: sanitized, timestamp: now }

    return NextResponse.json(sanitized.slice(0, limit))
  } catch (error) {
    console.error('Unexpected error in /api/meteors:', error)
    return NextResponse.json({ error: 'Server error fetching meteors' }, { status: 500 })
  }
}
