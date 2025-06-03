
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, User, Shield, Truck } from "lucide-react";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'admin' | 'agent'>('user');

  const handleLogin = () => {
    console.log('Login attempt:', { email, password, userType });
    // Mock authentication - redirect based on user type
    switch (userType) {
      case 'admin':
        window.location.href = '/admin';
        break;
      case 'agent':
        window.location.href = '/agent';
        break;
      default:
        window.location.href = '/';
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-orange-100">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Package className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-black">Trace360</h1>
            </div>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-black mb-3 block">
              Login as:
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setUserType('user')}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  userType === 'user'
                    ? 'bg-orange-50 border-orange-200 text-orange-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">User</span>
              </button>
              <button
                onClick={() => setUserType('admin')}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  userType === 'admin'
                    ? 'bg-orange-50 border-orange-200 text-orange-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Admin</span>
              </button>
              <button
                onClick={() => setUserType('agent')}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  userType === 'agent'
                    ? 'bg-orange-50 border-orange-200 text-orange-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Truck className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Agent</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button onClick={handleLogin} className="w-full bg-orange-600 hover:bg-orange-700">
              Sign In
            </Button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-orange-100">
            <p className="text-sm font-medium text-black mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Admin:</strong> admin@trace360.com / admin123</p>
              <p><strong>Agent:</strong> agent@trace360.com / agent123</p>
              <p><strong>User:</strong> user@trace360.com / user123</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-orange-600 hover:text-orange-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
