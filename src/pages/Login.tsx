
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, User, Shield, Truck } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { GlobalHeader } from '../components/GlobalHeader';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'admin' | 'agent'>('user');

  const handleLogin = () => {
    console.log('Login attempt:', { email, password, userType });
    // Mock authentication - redirect based on user type
    switch (userType) {
      case 'admin':
        navigate('/admin');
        break;
      case 'agent':
        navigate('/agent');
        break;
      case 'user':
        navigate('/user');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader title="Trace360 Login" />
      
      <div className="gradient-secondary flex items-center justify-center relative overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-vibrant-pink opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-10 w-96 h-96 bg-vibrant-cyan opacity-15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-vibrant-yellow opacity-10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-md w-full mx-4 relative z-10">
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-border/20">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="p-3 rounded-xl gradient-primary">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Trace360
                </h1>
              </div>
              <p className="text-muted-foreground font-medium">Sign in to your account</p>
            </div>

            {/* User Type Selection */}
            <div className="mb-6">
              <Label className="text-sm font-semibold text-foreground mb-3 block">
                Login as:
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setUserType('user')}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                    userType === 'user'
                      ? 'bg-vibrant-blue text-white border-transparent shadow-lg shadow-blue-500/25'
                      : 'bg-muted/80 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <User className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">User</span>
                </button>
                <button
                  onClick={() => setUserType('admin')}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                    userType === 'admin'
                      ? 'bg-vibrant-purple text-white border-transparent shadow-lg shadow-purple-500/25'
                      : 'bg-muted/80 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Shield className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Admin</span>
                </button>
                <button
                  onClick={() => setUserType('agent')}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                    userType === 'agent'
                      ? 'bg-vibrant-green text-white border-transparent shadow-lg shadow-green-500/25'
                      : 'bg-muted/80 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Truck className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Agent</span>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 border-2 border-border focus:border-orange-500 transition-colors duration-200"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 border-2 border-border focus:border-orange-500 transition-colors duration-200"
                />
              </div>

              <Button 
                onClick={handleLogin} 
                className="w-full gradient-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Sign In
              </Button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-border bg-gradient-to-r from-muted to-blue-50 dark:to-blue-950">
              <p className="text-sm font-semibold text-foreground mb-2 text-center">🎯 Demo Credentials</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="flex justify-between">
                  <span className="font-medium text-vibrant-purple">Admin:</span> 
                  <span>admin@trace360.com / admin123</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-vibrant-green">Agent:</span> 
                  <span>agent@trace360.com / agent123</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium text-vibrant-blue">User:</span> 
                  <span>user@trace360.com / user123</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
