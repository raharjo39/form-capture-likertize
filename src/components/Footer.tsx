
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} PT. Bank Rakyat Indonesia (Persero) Tbk.
          </p>
          <p className="text-sm text-gray-600">
            New Delivery System v1.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
