// components/ChartClient.tsx
'use client'

import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface MeteorData {
  id: string
  name: string
  mass: string
  year: string
  reclat: string
  reclong: string
  recclass: string
}

interface ChartClientProps {
  meteors: MeteorData[]
  chartType?: 'decade' | 'classification' | 'mass'
}

const COLORS = ['#14b8a6', '#0ea5e9', '#f97316', '#a855f7', '#22c55e']

export default function ChartClient({ meteors, chartType = 'decade' }: ChartClientProps) {
  const data = useMemo(() => {
    if (chartType === 'decade') {
      const map: Record<string, number> = {}
      meteors.forEach((m) => {
        if (m.year) {
          const y = parseInt(m.year.split('-')[0])
          if (!isNaN(y)) {
            const decade = Math.floor(y / 10) * 10
            map[decade] = (map[decade] || 0) + 1
          }
        }
      })
      return Object.entries(map).map(([decade, count]) => ({ name: decade, count }))
    }

    if (chartType === 'classification') {
      const map: Record<string, number> = {}
      meteors.forEach((m) => {
        const cls = m.recclass || 'Unknown'
        map[cls] = (map[cls] || 0) + 1
      })
      return Object.entries(map)
        .map(([name, count]) => ({ name, count }))
        .slice(0, 10) // top 10 classes
    }

    if (chartType === 'mass') {
      const ranges = {
        '<1kg': 0,
        '1–10kg': 0,
        '10–100kg': 0,
        '100–1000kg': 0,
        '>1000kg': 0,
      }

      meteors.forEach((m) => {
        const mass = parseFloat(m.mass)
        if (!isNaN(mass)) {
          if (mass < 1000) ranges['<1kg']++
          else if (mass < 10000) ranges['1–10kg']++
          else if (mass < 100000) ranges['10–100kg']++
          else if (mass < 1000000) ranges['100–1000kg']++
          else ranges['>1000kg']++
        }
      })
      return Object.entries(ranges).map(([name, count]) => ({ name, count }))
    }

    return []
  }, [meteors, chartType])

  if (!data.length) return <p className="text-gray-400">Loading chart data...</p>

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'classification' ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              outerRadius={120}
              fill="#14b8a6"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#111',
                border: 'none',
                color: '#fff',
              }}
            />
          </PieChart>
        ) : (
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111',
                border: 'none',
                color: '#fff',
              }}
            />
            <Bar dataKey="count" fill="#14b8a6" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
