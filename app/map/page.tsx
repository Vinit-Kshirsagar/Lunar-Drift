'use client'

import { useEffect, useState } from 'react'
import MapView from '@/components/MapView'

interface MeteorData {
  id: string
  name: string
  mass: number | null
  year: string | null
  lat: number
  lng: number
  recclass: string
}


// MOCK data so map works immediately
const MOCK_METEORS: MeteorData[] = [
  { id: '1', name: 'Aachen', lat: 50.775, lng: 6.08333, mass: 21, year: '1880', recclass: 'L5' },
  { id: '2', name: 'Aarhus', lat: 56.18333, lng: 10.23333, mass: 720, year: '1951', recclass: 'H6' },
  { id: '3', name: 'Abee', lat: 54.21667, lng: -113.0, mass: 107000, year: '1952', recclass: 'EH4' },
]

export default function MapPage() {
  const [meteors, setMeteors] = useState<MeteorData[]>([])

  // Load mock data initially; replace with API call later
  useEffect(() => {
    setMeteors(MOCK_METEORS)
  }, [])

  // --- Statistics calculations ---
  const totalMeteors = meteors.length

  const yearsWithData = meteors
    .filter(m => m.year)
    .map(m => parseInt(m.year!))
    .filter(y => !isNaN(y))

  const earliestYear = yearsWithData.length > 0 ? Math.min(...yearsWithData) : null
  const latestYear = yearsWithData.length > 0 ? Math.max(...yearsWithData) : null

  const massesWithData = meteors.filter(m => m.mass && m.mass > 0).map(m => m.mass!)
  const averageMass =
    massesWithData.length > 0
      ? Math.round(massesWithData.reduce((a, b) => a + b, 0) / massesWithData.length)
      : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Meteorite Landing Map
          </h1>
          <p className="text-gray-400 text-lg">
            Explore {totalMeteors.toLocaleString()} recorded meteorite landings across the globe
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur border border-teal-500/30 rounded-xl p-6 hover:border-teal-500/60 transition-all duration-300 shadow-lg hover:shadow-teal-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm font-medium">Total Meteorites</div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {totalMeteors.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm font-medium">Earliest Record</div>
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {earliestYear || 'N/A'}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm font-medium">Latest Record</div>
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {latestYear || 'N/A'}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-6 hover:border-amber-500/60 transition-all duration-300 shadow-lg hover:shadow-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm font-medium">Avg Mass (g)</div>
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              {averageMass ? averageMass.toLocaleString() : 'N/A'}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-gray-800/50 backdrop-blur border border-teal-500/40 rounded-xl overflow-hidden shadow-2xl shadow-teal-500/10">
          <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 px-6 py-4 border-b border-teal-500/30">
            <h2 className="text-xl font-semibold text-teal-300">Interactive Global Map</h2>
          </div>
          <div style={{ height: '650px' }}>
           <MapView meteors={[]} />



          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg
              className="w-5 h-5 text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Click on any marker to view detailed information about that meteorite landing</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              <span>Fell</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span>Found</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
