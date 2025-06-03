
import React from 'react';
import { MapPin, Truck } from 'lucide-react';

interface Package {
  id: string;
  trackingNumber: string;
  status: string;
  agent: string;
  currentLocation: string;
}

interface AdminMapProps {
  packages: Package[];
}

const AdminMap: React.FC<AdminMapProps> = ({ packages }) => {
  const activePackages = packages.filter(pkg => 
    pkg.status === 'in_transit' || pkg.status === 'out_for_delivery'
  );

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-gray-100">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-10 h-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-gray-400 opacity-30"></div>
            ))}
          </div>
        </div>
        
        {/* Mock streets */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-1/5 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-2/5 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-3/5 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        <div className="absolute left-4/5 top-0 bottom-0 w-1 bg-gray-400 opacity-50"></div>
        
        {/* Agent/Package markers */}
        {activePackages.map((pkg, index) => {
          const positions = [
            { top: '30%', left: '25%' },
            { top: '60%', left: '70%' },
            { top: '45%', left: '45%' },
            { top: '20%', left: '80%' },
            { top: '75%', left: '30%' }
          ];
          const position = positions[index % positions.length];
          
          return (
            <div 
              key={pkg.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: position.top, left: position.left }}
            >
              <div className="relative group">
                <div className="animate-pulse">
                  <div className="bg-blue-500 rounded-full p-2 shadow-lg">
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    #{pkg.trackingNumber} - {pkg.agent}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
              <Truck className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs">Active Agents ({activePackages.length})</span>
          </div>
        </div>
      </div>
      
      {/* Map Info */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2">
        <p className="text-xs text-gray-600">Real-time Tracking</p>
      </div>
    </div>
  );
};

export default AdminMap;
