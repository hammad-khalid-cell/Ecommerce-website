import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
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
          <a
            href="#"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            Sign Up
          </a>
        </div>

        {/* Search Bar and Icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0 ">
          {/* Search Input */}
          <div className="relative w-[243px] ">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100  text-xs   rounded-md py-3 pl-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            />
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Heart Icon (Wishlist) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 cursor-pointer hover:text-red-500 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          {/* Shopping Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 cursor-pointer hover:text-black transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.932.707 2.828.89.89 2.192 1.338 2.828.707L15 15m-4 5a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
