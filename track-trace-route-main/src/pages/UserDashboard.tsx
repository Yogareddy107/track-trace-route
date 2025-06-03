// pages/UserDashboard.tsx

import React, { useState } from 'react';
import { Package, LogOut, MapPin, Search, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserDashboard = () => {
  const [trackId, setTrackId] = useState("");
  const [deliveries, setDeliveries] = useState([
    {
      trackingNumber: "#TR001234",
      status: "IN TRANSIT",
      eta: "2024-06-04 14:30",
      address: "123 Main St, Manhattan, NY",
    },
    {
      trackingNumber: "#TR001235",
      status: "OUT FOR DELIVERY",
      eta: "2024-06-04 16:00",
      address: "456 Broadway, Manhattan, NY",
    },
    {
      trackingNumber: "#TR001236",
      status: "DELIVERED",
      eta: "2024-06-04 10:30",
      address: "789 5th Ave, Manhattan, NY",
    },
  ]);

  const handleDelete = (trackingNumber: string) => {
    const confirm = window.confirm(`Are you sure you want to delete ${trackingNumber}?`);
    if (confirm) {
      setDeliveries(deliveries.filter(pkg => pkg.trackingNumber !== trackingNumber));
    }
  };

  const handleEdit = (trackingNumber: string) => {
    alert(`Edit feature coming soon for ${trackingNumber}`);
    // You can redirect to edit screen or open a modal here
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Package className="w-8 h-8 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-800">Trace360 - User Dashboard</h1>
        </div>
        <Link to="/login">
          <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
            <LogOut className="mr-1 h-4 w-4" /> Logout
          </Button>
        </Link>
      </div>

      {/* Track Package */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <h2 className="text-xl font-semibold mb-4">Track a Package</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter tracking number..."
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
          />
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Search className="h-4 w-4 mr-1" /> Track
          </Button>
        </div>
      </div>

      {/* Delivery Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border text-center shadow">
          <h3 className="text-sm text-gray-600">Total Packages</h3>
          <p className="text-xl font-bold text-orange-600">{deliveries.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center shadow">
          <h3 className="text-sm text-gray-600">In Transit</h3>
          <p className="text-xl font-bold text-blue-600">
            {deliveries.filter(d => d.status === "IN TRANSIT").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center shadow">
          <h3 className="text-sm text-gray-600">Delivered</h3>
          <p className="text-xl font-bold text-green-600">
            {deliveries.filter(d => d.status === "DELIVERED").length}
          </p>
        </div>
      </div>

      {/* Delivery List */}
      <div className="bg-white p-6 rounded-xl border shadow">
        <h2 className="text-xl font-semibold mb-4">Your Deliveries</h2>
        <div className="space-y-4">
          {deliveries.map((pkg) => (
            <div
              key={pkg.trackingNumber}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">{pkg.trackingNumber}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    pkg.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : pkg.status === "OUT FOR DELIVERY"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {pkg.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <strong>ETA:</strong> {pkg.eta}
              </p>
              <p className="text-sm text-gray-600">
                <MapPin className="inline-block h-4 w-4 mr-1" />
                {pkg.address}
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => handleEdit(pkg.trackingNumber)}
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(pkg.trackingNumber)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center mt-8">
        <Link to="/" className="text-sm text-orange-600 hover:text-orange-700 underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
