import React, { useState } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  Search,
  ChevronDown,
} from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm font-inter">
      <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo/Brand Name */}
        <div className="text-2xl font-bold font-sans tracking-wide mb-4 md:mb-0">
          Exclusive
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg font-medium">
          <a
            href="#"
            className="hover:text-gray-900 border-b-2 border-black pb-1 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            Contact
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            About
          </a>

          <Link className="hover:text-gray-900 transition-colors duration-200"   to="/signup">SignUp</Link>
        
        </div>

        {/* Search Bar and Icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0 relative">
          {/* Search Input */}
          <div className="relative w-full md:w-[243px]">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 text-xs rounded-md py-3 pl-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {/* Search Icon */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </div>
          </div>

          {/* Heart Icon (Wishlist) */}
          <Heart 
            size={24} 
            className="text-gray-700 cursor-pointer hover:text-red-500 transition-colors duration-200" 
          />

          {/* Shopping Cart Icon */}
          <ShoppingBag 
            size={24} 
            className="text-gray-700 cursor-pointer hover:text-black transition-colors duration-200" 
          />

          {/* Profile Section with Modal */}
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
            >
              <User size={24} className="text-gray-700" />
              <ChevronDown size={16} className={`transform transition-transform duration-200 ${isProfileModalOpen ? 'rotate-180' : ''}`} />
            </div>
            {isProfileModalOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
                <Link to="/AdminPanel" className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2" >
                Manage My Account
                </Link>
                <a
                  href="#"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <User size={16} />
                  <span>Manage My Account</span>
                </a>
                <a
                  href="#"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <ShoppingBag size={16} />
                  <span>My Order</span>
                </a>
                <a
                  href="#"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                  <span>My Cancellations</span>
                </a>
                <a
                  href="#"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>My Reviews</span>
                </a>
                <a
                  href="#"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  <span>Logout</span>
                </a>
                 <a
                  href="#"
                  className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  <span>Admin Panel</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
