import MeteorCard from '@/components/MeteorCard'
import ChartsClient from '../../components/ChartsClient'

interface MeteorData {
  id: string
  name: string
  mass: number | null
  year: string | null
  lat: number
  lng: number
  recclass: string
}

async function getMeteors(): Promise<MeteorData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/meteors?limit=5000`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch meteors')
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error fetching meteors:', error)
    return []
  }
}

export default async function ChartsPage() {
  const meteors = await getMeteors()

  // Compute decade data
  const decadeMap: { [key: string]: number } = {}
  
  meteors.forEach((meteor) => {
    if (meteor.year) {
      const year = parseInt(meteor.year)
      if (!isNaN(year) && year >= 1000 && year <= 2100) {
        const decade = Math.floor(year / 10) * 10
        decadeMap[decade] = (decadeMap[decade] || 0) + 1
      }
    }
  })

  const decadeData = Object.entries(decadeMap)
    .map(([decade, count]) => ({
      decade: `${decade}s`,
      count,
    }))
    .sort((a, b) => parseInt(a.decade) - parseInt(b.decade))

  // Top 10 largest meteors
  const largestMeteors = meteors
    .filter((m) => m.mass && m.mass > 0)
    .sort((a, b) => (b.mass || 0) - (a.mass || 0))
    .slice(0, 10)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-400">Meteorite Data Visualization</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Meteorites by Decade</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <ChartsClient decadeData={decadeData} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Top 10 Largest Meteorites</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {largestMeteors.map((meteor, index) => (
            <div key={meteor.id} className="flex items-start space-x-3">
              <div className="bg-teal-500 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-grow">
                <MeteorCard meteor={meteor} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}