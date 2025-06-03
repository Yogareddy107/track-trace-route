
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Package, MapPin, Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import TrackingMap from '../components/TrackingMap';

interface PackageStatus {
  id: string;
  trackingNumber: string;
  sender: string;
  receiver: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered';
  eta: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  history: Array<{
    timestamp: string;
    status: string;
    location: string;
    description: string;
  }>;
}

const TrackPackage = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [packageData, setPackageData] = useState<PackageStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch package data
    setTimeout(() => {
      const mockData: PackageStatus = {
        id: '1',
        trackingNumber: trackingNumber || '',
        sender: 'Amazon Warehouse',
        receiver: 'John Doe',
        status: 'in_transit',
        eta: '2024-06-04 14:30',
        currentLocation: {
          lat: 40.7128,
          lng: -74.0060,
          address: 'Manhattan, NY'
        },
        history: [
          {
            timestamp: '2024-06-03 09:00',
            status: 'Package picked up',
            location: 'Warehouse, NJ',
            description: 'Package collected from sender'
          },
          {
            timestamp: '2024-06-03 14:30',
            status: 'In transit',
            location: 'Distribution Center, NY',
            description: 'Package sorted and dispatched'
          },
          {
            timestamp: '2024-06-04 08:15',
            status: 'Out for delivery',
            location: 'Manhattan, NY',
            description: 'Package loaded on delivery vehicle'
          }
        ]
      };
      setPackageData(mockData);
      setLoading(false);
    }, 1000);
  }, [trackingNumber]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'out_for_delivery': return 'text-blue-600 bg-blue-100';
      case 'in_transit': return 'text-yellow-600 bg-yellow-100';
      case 'picked_up': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5" />;
      case 'out_for_delivery': return <Package className="h-5 w-5" />;
      case 'in_transit': return <MapPin className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading package information...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Package Not Found</h2>
          <p className="text-gray-600 mb-4">
            We couldn't find a package with tracking number: {trackingNumber}
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-800">Trace360</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Package Info */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  #{packageData.trackingNumber}
                </h1>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(packageData.status)}`}>
                  {getStatusIcon(packageData.status)}
                  <span className="text-sm font-medium capitalize">
                    {packageData.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">From:</p>
                  <p className="font-medium">{packageData.sender}</p>
                </div>
                <div>
                  <p className="text-gray-600">To:</p>
                  <p className="font-medium">{packageData.receiver}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Estimated delivery:</span>
                <span className="font-medium">{packageData.eta}</span>
              </div>
            </div>

            {/* Current Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Location</h2>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">{packageData.currentLocation.address}</p>
                  <p className="text-sm text-gray-600">
                    {packageData.currentLocation.lat.toFixed(4)}, {packageData.currentLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery History</h2>
              <div className="space-y-4">
                {packageData.history.map((event, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{event.status}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <p className="text-sm text-gray-500">{event.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Tracking</h2>
            <TrackingMap location={packageData.currentLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPackage;
