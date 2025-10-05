'use client'

import { useEffect, useState } from 'react'
import { Select } from '@/components/ui/select'
import ChartClient from '@/components/ChartsClient'

interface MeteorData {
  id: string
  name: string
  mass: string
  year: string
  reclat: string
  reclong: string
  recclass: string
}

export default function ChartsPage() {
  const [meteors, setMeteors] = useState<MeteorData[]>([])
  const [chartType, setChartType] = useState('decade')

  useEffect(() => {
    const fetchMeteors = async () => {
      try {
        const res = await fetch('/api/meteors')
        const data = await res.json()
        setMeteors(data)
      } catch (error) {
        console.error('Error fetching meteor data:', error)
      }
    }

    fetchMeteors()
  }, [])

  const chartOptions = [
    { value: 'decade', label: 'Meteors by Decade' },
    { value: 'classification', label: 'Meteors by Classification' },
    { value: 'mass', label: 'Meteors by Mass Range' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-teal-400 mb-3">
          Meteor Data Dashboard
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore visual trends from NASA’s meteor dataset. Choose a chart below
          to understand how meteorite discoveries vary across time, type, and
          mass.
        </p>
      </header>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg max-w-5xl mx-auto">
        {/* Chart Type Selector */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-200">
            Select Chart Type
          </h2>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-gray-900 text-gray-300 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {chartOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-900 rounded-lg p-4">
          <ChartClient meteors={meteors} chartType={chartType} />
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto mt-8 text-gray-400 text-sm leading-relaxed">
        <p>
          Data source: <span className="text-teal-400">NASA CNEOS API</span> — a
          comprehensive dataset of global meteorite landings, classification
          data, and recorded masses. Charts are auto-generated in real time.
        </p>
      </div>
    </div>
  )
}
