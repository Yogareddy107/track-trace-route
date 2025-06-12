
import React, { useState } from 'react';
import { Package, Search, MapPin, Pencil, Trash2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobalHeader } from '../components/GlobalHeader';

const UserDashboard = () => {
  const navigate = useNavigate();
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
  };

  const handleTrack = () => {
    if (trackId.trim()) {
      navigate(`/track/${trackId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader title="User Dashboard" />

      <div className="container mx-auto px-4 py-8">
        {/* Track Package Section */}
        <div className="bg-card p-6 rounded-xl shadow border mb-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Track a Package</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Enter tracking number..."
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <Button 
              onClick={handleTrack}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Search className="h-4 w-4 mr-1" /> Track
            </Button>
          </div>
        </div>

        {/* Delivery Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg border text-center shadow">
            <h3 className="text-sm text-muted-foreground">Total Packages</h3>
            <p className="text-xl font-bold text-orange-600">{deliveries.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border text-center shadow">
            <h3 className="text-sm text-muted-foreground">In Transit</h3>
            <p className="text-xl font-bold text-blue-600">
              {deliveries.filter(d => d.status === "IN TRANSIT").length}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border text-center shadow">
            <h3 className="text-sm text-muted-foreground">Delivered</h3>
            <p className="text-xl font-bold text-green-600">
              {deliveries.filter(d => d.status === "DELIVERED").length}
            </p>
          </div>
        </div>

        {/* Delivery List */}
        <div className="bg-card p-6 rounded-xl border shadow">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Your Deliveries</h2>
          <div className="space-y-4">
            {deliveries.map((pkg) => (
              <div
                key={pkg.trackingNumber}
                className="border rounded-lg p-4 bg-muted/50 hover:bg-muted transition"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-foreground">{pkg.trackingNumber}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      pkg.status === "DELIVERED"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : pkg.status === "OUT FOR DELIVERY"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {pkg.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>ETA:</strong> {pkg.eta}
                </p>
                <p className="text-sm text-muted-foreground">
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

        {/* Logout Section */}
        <div className="text-center mt-8">
          <Link to="/login">
            <Button variant="outline" className="text-orange-600 hover:text-orange-700">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
