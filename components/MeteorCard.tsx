"use client";

interface MeteorData {
  id: string
  name: string
  mass: number | null
  year: string | null
  recclass: string
}

interface MeteorCardProps {
  meteor: MeteorData
}

export default function MeteorCard({ meteor }: MeteorCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-teal-500 transition-colors">
      <h3 className="text-lg font-semibold text-teal-400 mb-2">{meteor.name}</h3>
      <div className="space-y-1 text-sm text-gray-300">
        <p>
          <span className="text-gray-400">Class:</span> {meteor.recclass}
        </p>
        {meteor.mass && (
          <p>
            <span className="text-gray-400">Mass:</span> {meteor.mass.toLocaleString()} g
          </p>
        )}
        {meteor.year && (
          <p>
            <span className="text-gray-400">Year:</span> {meteor.year}
          </p>
        )}
      </div>
    </div>
  )
}