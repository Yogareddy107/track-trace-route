import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, MapPin, Truck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleTrackPackage = () => {
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold">Trace360</h1>
          </div>
          <nav className="flex space-x-4">
            <Link to="/login" className="hover:text-orange-500 transition-colors">
              Login
            </Link>
            <Link to="/admin" className="hover:text-orange-500 transition-colors">
              
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Track Your Package in Real-Time
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Enter your tracking number to get live updates and GPS location
          </p>
        </div>

        {/* Tracking Input */}
        <div className="max-w-md mx-auto mb-16">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleTrackPackage()}
            />
            <Button
              onClick={handleTrackPackage}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Track
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-md border-2 border-orange-100">
            <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time GPS</h3>
            <p className="text-gray-600">
              Track your package location with live GPS updates every 5 minutes
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md border-2 border-orange-100">
            <Truck className="h-12 w-12 text-black mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Delivery Updates</h3>
            <p className="text-gray-600">
              Get instant notifications about your package status and ETA
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md border-2 border-orange-100">
            <Package className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Delivery History</h3>
            <p className="text-gray-600">
              View complete delivery history and route tracking
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Trace360. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
