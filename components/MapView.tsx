"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { useMemo } from 'react'

interface MeteorData {
  id: string
  name: string
  mass: number | null
  year: string | null
  lat: number
  lng: number
  recclass: string
}

interface MapViewProps {
  initialData: MeteorData[]
}

export default function MapView({ initialData }: MapViewProps) {
  // Limit markers for performance
  const displayData = useMemo(() => {
    if (initialData.length > 500) {
      return initialData.slice(0, 500)
    }
    return initialData
  }, [initialData])

  const showLimitNotice = initialData.length > 500

  const defaultCenter = process.env.NEXT_PUBLIC_DEFAULT_CENTER 
    ? process.env.NEXT_PUBLIC_DEFAULT_CENTER.split(',').map(Number) as [number, number]
    : [20, 0] as [number, number]

  return (
    <div className="relative w-full h-full">
      {showLimitNotice && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-lg">
          Showing first 500 of {initialData.length.toLocaleString()} meteorites for performance
        </div>
      )}
      
      <MapContainer
        center={defaultCenter}
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {displayData.map((meteor) => (
          <Marker key={meteor.id} position={[meteor.lat, meteor.lng]}>
            <Popup>
              <div className="text-gray-900">
                <h3 className="font-bold text-lg">{meteor.name}</h3>
                <p><strong>Class:</strong> {meteor.recclass}</p>
                {meteor.mass && <p><strong>Mass:</strong> {meteor.mass.toLocaleString()} g</p>}
                {meteor.year && <p><strong>Year:</strong> {meteor.year}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}