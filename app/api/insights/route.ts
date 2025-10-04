import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, sampleSize = 1000 } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Check for OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in .env.local' },
        { status: 500 }
      )
    }

    // Fetch sample data from our own API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const meteorsResponse = await fetch(`${baseUrl}/api/meteors?limit=${sampleSize}`)
    
    if (!meteorsResponse.ok) {
      throw new Error('Failed to fetch meteor data')
    }

    const meteors = await meteorsResponse.json()

    // Prepare compact dataset summary for the LLM
    const summary = {
      totalCount: meteors.length,
      sampleSize,
      decades: {} as { [key: string]: number },
      classes: {} as { [key: string]: number },
      topMasses: meteors
        .filter((m: any) => m.mass)
        .sort((a: any, b: any) => b.mass - a.mass)
        .slice(0, 10)
        .map((m: any) => ({
          name: m.name,
          mass: m.mass,
          year: m.year,
          class: m.recclass,
        })),
      yearRange: {
        earliest: null as number | null,
        latest: null as number | null,
      },
    }

    // Compute decade and class distributions
    meteors.forEach((meteor: any) => {
      if (meteor.year) {
        const year = parseInt(meteor.year)
        if (!isNaN(year)) {
          const decade = Math.floor(year / 10) * 10
          summary.decades[decade] = (summary.decades[decade] || 0) + 1

          if (!summary.yearRange.earliest || year < summary.yearRange.earliest) {
            summary.yearRange.earliest = year
          }
          if (!summary.yearRange.latest || year > summary.yearRange.latest) {
            summary.yearRange.latest = year
          }
        }
      }

      if (meteor.recclass) {
        summary.classes[meteor.recclass] = (summary.classes[meteor.recclass] || 0) + 1
      }
    })
  }
   