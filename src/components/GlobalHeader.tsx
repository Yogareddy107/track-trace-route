
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Package, Home } from "lucide-react";
import { ThemeToggle } from './ThemeToggle';

interface GlobalHeaderProps {
  title: string;
  showBackToHome?: boolean;
}

export function GlobalHeader({ title, showBackToHome = true }: GlobalHeaderProps) {
  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-orange-600" />
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {showBackToHome && (
              <Link to="/">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
