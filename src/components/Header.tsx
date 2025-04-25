
import React from 'react';
import { Search, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <div className="flex flex-col w-full">
      <header className="w-full bg-[#1e4488] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/3573b1bb-d398-4186-8da6-2a2dae49e4b0.png"
                alt="BRI New Delivery System Logo"
                className="h-10 w-auto"
              />
              <Separator orientation="vertical" className="h-8 bg-white/20" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Input 
                  type="text" 
                  placeholder="Cari menu"
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Search className="absolute left-2 top-2.5 h-5 w-5 text-white/50" />
              </div>
              <User className="w-6 h-6 text-white/90" />
            </div>
          </div>
        </div>
      </header>
      <nav className="w-full bg-[#1e4488] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8">
            {['Finansial', 'Non Finansial', 'Administrasi', 'General'].map((item) => (
              <button
                key={item}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
