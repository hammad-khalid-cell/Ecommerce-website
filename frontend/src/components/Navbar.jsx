import React, { useState } from "react";
import { User, ShoppingBag, Heart, Search, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/user/userSlice";
import { useEffect } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    dispatch(clearUser());
  };

  return (
    <nav className="bg-white  font-inter border-b-1 border-gray-200">
      <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-2xl font-bold font-sans tracking-wide mb-4 md:mb-0">
          Exclusive
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-gray-900 border-b-2 border-black pb-1 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            About
          </Link>
          {!user && (
            <Link
              to="/signup"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              SignUp
            </Link>
          )}
        </div>

        {/* Search + Icons + Profile */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0 relative">
          {/* Search */}
          <div className="relative w-full md:w-[243px]">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 text-xs rounded-md py-3 pl-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </div>
          </div>

          {/* Icons */}
          <Heart
            size={24}
            className="text-gray-700 cursor-pointer hover:text-red-500 transition-colors duration-200"
          />
          <ShoppingBag
            size={24}
            className="text-gray-700 cursor-pointer hover:text-black transition-colors duration-200"
          />

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User size={24} className="text-gray-700" />
              )}
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${
                  isProfileModalOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {isProfileModalOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 z-[9999]">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <User size={16} />
                      <span>My Account</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <ShoppingBag size={16} />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/reviews"
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <span>⭐ My Reviews</span>
                    </Link>

                    {/* Show Admin Panel only if user is admin */}
                    {user.role === "admin" && (
                      <Link
                        to="/adminpanel"
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <span>⚙ Admin Panel</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <span>🚪 Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User size={16} />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
