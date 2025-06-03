
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Users, MapPin, TrendingUp, Search, Eye } from "lucide-react";
import AdminMap from '../components/AdminMap';

interface PackageData {
  id: string;
  trackingNumber: string;
  sender: string;
  receiver: string;
  status: string;
  agent: string;
  eta: string;
  currentLocation: string;
}

const AdminDashboard = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    // Mock data for packages
    const mockPackages: PackageData[] = [
      {
        id: '1',
        trackingNumber: 'TR001234',
        sender: 'Amazon Warehouse',
        receiver: 'John Doe',
        status: 'in_transit',
        agent: 'Mike Johnson',
        eta: '2024-06-04 14:30',
        currentLocation: 'Manhattan, NY'
      },
      {
        id: '2',
        trackingNumber: 'TR001235',
        sender: 'Best Buy Store',
        receiver: 'Jane Smith',
        status: 'out_for_delivery',
        agent: 'Sarah Wilson',
        eta: '2024-06-04 16:00',
        currentLocation: 'Brooklyn, NY'
      },
      {
        id: '3',
        trackingNumber: 'TR001236',
        sender: 'Local Store',
        receiver: 'Bob Wilson',
        status: 'delivered',
        agent: 'Tom Brown',
        eta: '2024-06-04 10:30',
        currentLocation: 'Queens, NY'
      }
    ];
    setPackages(mockPackages);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'in_transit': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.receiver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || pkg.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalPackages: packages.length,
    inTransit: packages.filter(p => p.status === 'in_transit').length,
    delivered: packages.filter(p => p.status === 'delivered').length,
    activeAgents: new Set(packages.map(p => p.agent)).size
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold">Trace360 Admin</h1>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                <p className="text-3xl font-bold text-black">{stats.totalPackages}</p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-3xl font-bold text-black">{stats.inTransit}</p>
              </div>
              <MapPin className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-3xl font-bold text-black">{stats.delivered}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Agents</p>
                <p className="text-3xl font-bold text-black">{stats.activeAgents}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Package List */}
          <div className="bg-white rounded-lg shadow-md border-2 border-orange-100">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-black mb-4">Package Management</h2>
              
              {/* Filters */}
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by tracking number or receiver..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_transit">In Transit</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="p-4 border-b hover:bg-orange-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-semibold text-black">#{pkg.trackingNumber}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                          {pkg.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>To:</strong> {pkg.receiver}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Agent:</strong> {pkg.agent}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>ETA:</strong> {pkg.eta}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-orange-300 hover:bg-orange-50">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Map */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-orange-100">
            <h2 className="text-xl font-bold text-black mb-4">Live Agent Locations</h2>
            <AdminMap packages={packages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
