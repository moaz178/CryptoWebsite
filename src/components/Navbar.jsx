import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, TrendingUp, Newspaper, Home, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white">
              <TrendingUp className="h-8 w-8 text-purple-300" />
              <span className="ml-2 text-xl font-bold">CryptoInsight</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-800 transition duration-150"
            >
              <Home className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link
              to="/news"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-800 transition duration-150"
            >
              <Newspaper className="h-5 w-5 mr-1" />
              News
            </Link>
            {/* Expanding Search */}
            <div className="relative">
              <button
                onClick={() => setSearchActive(!searchActive)}
                className="text-white hover:text-purple-300 focus:outline-none"
              >
                <Search className="h-5 w-5" />
              </button>
              <div
                className={`absolute right-0 mt-2 transition-all duration-300 overflow-hidden ${
                  searchActive ? 'w-48 opacity-100' : 'w-0 opacity-0'
                }`}
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search coins..."
                  className="w-full pl-8 pr-4 py-1 rounded-full bg-indigo-800 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-300 hover:bg-indigo-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden transition-all duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-800 transition duration-150"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link
              to="/news"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-800 transition duration-150"
            >
              <Newspaper className="h-5 w-5 mr-2" />
              News
            </Link>
            <div className="relative px-3 py-2">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search coins..."
                className="w-full pl-8 pr-4 py-1 rounded-full bg-indigo-800 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <Search className="absolute left-5 top-3.5 h-5 w-5 text-indigo-300" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
