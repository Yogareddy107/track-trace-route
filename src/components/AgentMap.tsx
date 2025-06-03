
import React from 'react';
import { MapPin, Package as PackageIcon, Navigation } from 'lucide-react';

interface Package {
  id: string;
  trackingNumber: string;
  receiver: string;
  address: string;
  status: string;
  priority: string;
}

interface AgentMapProps {
  currentLocation: { lat: number; lng: number };
  packages: Package[];
}

const AgentMap: React.FC<AgentMapProps> = ({ currentLocation, packages }) => {
  const pendingPackages = packages.filter(pkg => pkg.status === 'pending');

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
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        
        {/* Current location (agent) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75"></div>
            <div className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 items-center justify-center">
              <Navigation className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Package delivery locations */}
        {pendingPackages.map((pkg, index) => {
          const positions = [
            { top: '25%', left: '25%' },
            { top: '70%', left: '75%' },
            { top: '30%', left: '80%' },
            { top: '80%', left: '20%' }
          ];
          const position = positions[index % positions.length];
          
          const getPriorityColor = (priority: string) => {
            switch (priority) {
              case 'high': return 'bg-red-500';
              case 'medium': return 'bg-yellow-500';
              case 'low': return 'bg-green-500';
              default: return 'bg-gray-500';
            }
          };
          
          return (
            <div 
              key={pkg.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: position.top, left: position.left }}
            >
              <div className="relative group">
                <div className={`rounded-full p-2 shadow-lg ${getPriorityColor(pkg.priority)}`}>
                  <PackageIcon className="h-4 w-4 text-white" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap max-w-48">
                    <div>#{pkg.trackingNumber}</div>
                    <div>{pkg.receiver}</div>
                    <div className="text-xs opacity-75">{pkg.priority} priority</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Route line (mock) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <pattern id="dashed" patternUnits="userSpaceOnUse" width="10" height="2">
              <rect width="5" height="2" fill="#3B82F6" />
            </pattern>
          </defs>
          <path
            d="M 50% 50% L 25% 25% M 50% 50% L 75% 70% M 50% 50% L 80% 30%"
            stroke="url(#dashed)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
        <div className="flex flex-col space-y-1">
          <button className="p-2 hover:bg-gray-100 rounded text-sm font-bold">+</button>
          <button className="p-2 hover:bg-gray-100 rounded text-sm font-bold">-</button>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full p-1">
              <Navigation className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs">Your Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 rounded-full p-1">
              <PackageIcon className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs">High Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-500 rounded-full p-1">
              <PackageIcon className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs">Medium Priority</span>
          </div>
        </div>
      </div>
      
      {/* Current location info */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Manhattan, NY</p>
            <p className="text-xs text-gray-600">
              {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentMap;
