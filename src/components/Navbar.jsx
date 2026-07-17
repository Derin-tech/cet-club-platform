import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-bold text-xl text-blue-950 tracking-tight">
                CET Club Platform
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <a href="/#clubs" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Clubs
            </a>
            <Link to="/announcements" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Announcements
            </Link>
            
            {/* TODO: Firebase login button goes here */}
            {/* 
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Sign In
            </button> 
            */}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white">
          <div className="pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#clubs"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Clubs
            </a>
            <Link
              to="/announcements"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Announcements
            </Link>
            
            {/* TODO: Firebase login button goes here */}
            {/*
            <div className="mt-4 px-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Sign In
              </button>
            </div>
            */}
          </div>
        </div>
      )}
    </nav>
  );
}
