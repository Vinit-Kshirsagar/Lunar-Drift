"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface MeteorData {
  id: string
  name: string
  mass: string
  year: string
}

export default function ChartsClient({ meteors }: { meteors: MeteorData[] }) {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (meteors.length > 0) {
      // Example: Group meteors by year
      const yearCounts: Record<string, number> = {}
      meteors.forEach((m) => {
        const year = m.year ? m.year.slice(0, 4) : "Unknown"
        yearCounts[year] = (yearCounts[year] || 0) + 1
      })

      setChartData({
        labels: Object.keys(yearCounts),
        datasets: [
          {
            label: "Meteors per year",
            data: Object.values(yearCounts),
            backgroundColor: "rgba(45, 212, 191, 0.6)", // teal
          },
        ],
      })
    }
  }, [meteors])

  if (!chartData) return <p className="text-gray-400">Loading chart...</p>

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" as const },
            title: { display: true, text: "Meteor Distribution Over Time" },
          },
        }}
      />
    </div>
  )
}
