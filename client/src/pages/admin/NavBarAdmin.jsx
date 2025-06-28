import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: Lucide icons for hamburger & close
import { useAuth } from '../../context/AuthContext';
import { UserCircle } from 'lucide-react';

function NavBarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();


  return (
    <div className="bg-gray-100 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left Side */}
        <div className="text-xl font-bold">
          <Link to="/">E commerce</Link>
        </div>

        {/* Hamburger (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Center Menu - Nav Links (Desktop Only) */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium absolute left-1/2 transform -translate-x-1/2">
          <Link to="/Adminproduct" className="hover:text-black">Product</Link>
          <Link to="/Order" className="hover:text-black">Order</Link>
          <Link to="/Inventory" className="hover:text-black">Inventory </Link>
          
        </div>

        {/* Right Side */}
        <div className="hidden md:flex gap-4 text-gray-700 font-medium">
          {user ? (
            <Link to="/profile" className="hover:text-black flex items-center gap-1">
              <UserCircle size={20} /> Profile
            </Link>
          ) : (
            <Link to="/login" className="hover:text-black">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu (shown when open) */}
      {isOpen && (
        <div className="flex flex-col gap-4 px-6 pb-4 text-gray-700 font-medium md:hidden">
          <Link to="/product" onClick={() => setIsOpen(false)}>Product</Link>
          <Link to="/Order" onClick={() => setIsOpen(false)}>Order</Link>
          <Link to="/Inventory" onClick={() => setIsOpen(false)}>Inventory </Link>
        </div>
      )}
    </div>
  );
}

export default NavBarAdmin;
