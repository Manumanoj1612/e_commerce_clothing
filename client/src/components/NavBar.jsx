import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: Lucide icons for hamburger & close
import { useAuth } from '../context/AuthContext';
import { UserCircle } from 'lucide-react';

function NavBar() {
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
          <Link to="/product" className="hover:text-black">Product</Link>
          <Link to="/men" className="hover:text-black">Men</Link>
          <Link to="/women" className="hover:text-black">Women</Link>
          <Link to="/watch" className="hover:text-black">Watch</Link>
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
          <Link to="/cart" className="hover:text-black">Cart</Link>
        </div>
      </div>

      {/* Mobile Menu (shown when open) */}
      {isOpen && (
        <div className="flex flex-col gap-4 px-6 pb-4 text-gray-700 font-medium md:hidden">
          <Link to="/product" onClick={() => setIsOpen(false)}>Product</Link>
          <Link to="/men" onClick={() => setIsOpen(false)}>Men</Link>
          <Link to="/women" onClick={() => setIsOpen(false)}>Women</Link>
          <Link to="/kids" onClick={() => setIsOpen(false)}>Kids</Link>
          <Link to="/watch" onClick={() => setIsOpen(false)}>Watch</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
