
import React from 'react';
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/bri-logo.png"
              alt="BRI Logo"
              className="h-8"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/80x32/blue/white?text=BRI';
              }}
            />
            <Separator orientation="vertical" className="h-8" />
            <span className="text-blue-800 font-semibold">New Delivery System</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
