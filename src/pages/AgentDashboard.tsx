
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Package, MapPin, CheckCircle, Clock, Navigation } from "lucide-react";
import AgentMap from '../components/AgentMap';

interface AssignedPackage {
  id: string;
  trackingNumber: string;
  receiver: string;
  address: string;
  status: string;
  eta: string;
  priority: 'low' | 'medium' | 'high';
}

const AgentDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [assignedPackages, setAssignedPackages] = useState<AssignedPackage[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Mock assigned packages
    const mockPackages: AssignedPackage[] = [
      {
        id: '1',
        trackingNumber: 'TR001234',
        receiver: 'John Doe',
        address: '123 Main St, Manhattan, NY',
        status: 'in_transit',
        eta: '14:30',
        priority: 'high'
      },
      {
        id: '2',
        trackingNumber: 'TR001235',
        receiver: 'Jane Smith',
        address: '456 Broadway, Manhattan, NY',
        status: 'pending',
        eta: '16:00',
        priority: 'medium'
      },
      {
        id: '3',
        trackingNumber: 'TR001236',
        receiver: 'Bob Wilson',
        address: '789 5th Ave, Manhattan, NY',
        status: 'pending',
        eta: '17:30',
        priority: 'low'
      }
    ];
    setAssignedPackages(mockPackages);

    // Simulate location updates
    const locationInterval = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => clearInterval(locationInterval);
  }, []);

  const updatePackageStatus = (packageId: string, newStatus: string) => {
    setAssignedPackages(prev =>
      prev.map(pkg =>
        pkg.id === packageId ? { ...pkg, status: newStatus } : pkg
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold">Agent Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsOnline(!isOnline)}
                className="text-white border-white hover:bg-white hover:text-slate-800"
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Location & Stats */}
          <div className="space-y-6">
            {/* Current Location Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Current Location</h2>
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">Manhattan, NY</p>
                  <p className="text-sm text-gray-600">
                    {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Navigation className="h-4 w-4 mr-2" />
                Update Location
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Deliveries</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{assignedPackages.filter(p => p.status === 'pending').length}</p>
                  </div>
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Assigned Packages */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">Assigned Packages</h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {assignedPackages.map((pkg) => (
                  <div key={pkg.id} className="p-4 border-b hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-semibold text-gray-800">#{pkg.trackingNumber}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(pkg.priority)}`}>
                            {pkg.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                            {pkg.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>To:</strong> {pkg.receiver}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Address:</strong> {pkg.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>ETA:</strong> {pkg.eta}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {pkg.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => updatePackageStatus(pkg.id, 'in_transit')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start Delivery
                        </Button>
                      )}
                      {pkg.status === 'in_transit' && (
                        <Button
                          size="sm"
                          onClick={() => updatePackageStatus(pkg.id, 'delivered')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Delivered
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Route Map</h2>
            <AgentMap 
              currentLocation={currentLocation}
              packages={assignedPackages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
