'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, LeafletEvent } from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

interface MeteorData {
  id: string;
  name: string;
  mass: number | null;
  year: string | null;
  lat: number;
  lng: number;
}

interface MapViewProps {
  meteors: MeteorData[];
}

export default function MapView({ meteors }: MapViewProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [leaflet, setLeaflet] = useState<typeof import('leaflet') | null>(null);
  const [isReady, setIsReady] = useState(false);

  const defaultCenter: [number, number] = [20, 0];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('leaflet').then(L => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });

      setLeaflet(L);
      setIsReady(true);
    });
  }, []);

  if (!isReady || !leaflet) {
    return <div className="h-[650px] w-full rounded-xl bg-gray-900" />;
  }

  return (
    <div className="relative w-full h-[650px] rounded-xl overflow-hidden">
      <MapContainer
        key="meteor-map"
        center={defaultCenter}
        zoom={2}
        scrollWheelZoom
        className="w-full h-full"
        whenReady={() => {
          console.log('Map ready event:');
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {meteors.map(m => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Popup>
              <div className="text-sm font-medium">
                <div className="font-bold">{m.name}</div>
                {m.year && <div>Year: {m.year}</div>}
                {m.mass && <div>Mass: {m.mass} g</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
