import MapView from '@/components/MapView'
import { sanitizeMeteor } from '@/lib/nasa'

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
    const res = await fetch(`${baseUrl}/api/meteors?limit=1000`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch meteors')
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching meteors:', error)
    return []
  }
}

export default async function MapPage() {
  const meteors = await getMeteors()
  
  // Calculate statistics
  const totalMeteors = meteors.length
  const yearsWithData = meteors
    .filter(m => m.year)
    .map(m => parseInt(m.year!))
    .filter(y => !isNaN(y))
  
  const earliestYear = yearsWithData.length > 0 ? Math.min(...yearsWithData) : null
  const latestYear = yearsWithData.length > 0 ? Math.max(...yearsWithData) : null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-teal-400">Meteorite Landing Map</h1>
      
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Total Meteorites</div>
          <div className="text-3xl font-bold text-teal-400">{totalMeteors.toLocaleString()}</div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Earliest Record</div>
          <div className="text-3xl font-bold text-teal-400">
            {earliestYear || 'N/A'}
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Latest Record</div>
          <div className="text-3xl font-bold text-teal-400">
            {latestYear || 'N/A'}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-teal-500 rounded-lg overflow-hidden" style={{ height: '600px' }}>
        <MapView initialData={meteors} />
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Click on any marker to view detailed information about that meteorite landing.
      </div>
    </div>
  )
}