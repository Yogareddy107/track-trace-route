
import React from 'react';
import { MapPin } from 'lucide-react';

interface TrackingMapProps {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

const TrackingMap: React.FC<TrackingMapProps> = ({ location }) => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-gray-100">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-400 opacity-30"></div>
            ))}
          </div>
        </div>
        
        {/* Mock streets */}
        <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        
        {/* Package location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75"></div>
            <div className="relative inline-flex rounded-full h-6 w-6 bg-red-500 items-center justify-center">
              <MapPin className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
        <div className="flex flex-col space-y-1">
          <button className="p-2 hover:bg-gray-100 rounded text-sm font-bold">+</button>
          <button className="p-2 hover:bg-gray-100 rounded text-sm font-bold">-</button>
        </div>
      </div>
      
      {/* Location Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-red-500" />
          <div>
            <p className="text-sm font-medium">{location.address}</p>
            <p className="text-xs text-gray-600">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2">
        <p className="text-xs text-gray-600">Live Tracking</p>
      </div>
    </div>
  );
};

export default TrackingMap;
