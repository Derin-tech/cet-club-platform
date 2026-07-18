import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-border-light shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-navy-primary rounded-sm flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-bold text-xl text-navy-secondary tracking-tight">
                CET Club Platform
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-text-muted hover:text-navy-primary px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <a href="/#clubs" className="text-text-muted hover:text-navy-primary px-3 py-2 text-sm font-medium transition-colors">
              Clubs
            </a>
            <Link to="/announcements" className="text-text-muted hover:text-navy-primary px-3 py-2 text-sm font-medium transition-colors">
              Announcements
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-pill shadow-card border border-border-light object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-pill bg-navy-primary/10 text-navy-primary flex items-center justify-center font-bold text-sm shadow-card border border-navy-primary/20">
                      {user.email ? user.email[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-sm font-medium text-text-muted truncate max-w-[120px] lg:max-w-[150px]" title={user.displayName || user.email}>
                    {user.displayName || user.email}
                  </span>
                </div>
                <div className="w-px h-4 bg-border-light mx-1"></div>
                <button 
                  onClick={handleLogout}
                  className="text-text-muted hover:text-red-600 px-2 py-1.5 rounded-sm text-sm font-medium transition-colors border border-transparent hover:border-red-100 hover:bg-red-50"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="group flex items-center gap-2 bg-navy-primary text-white px-5 py-2.5 rounded-pill text-sm font-semibold hover:bg-navy-secondary hover:shadow-hover hover:-translate-y-0.5 transition-all"
              >
                <LogIn className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-sm text-text-muted hover:bg-bg-soft focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-primary"
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
        <div className="sm:hidden border-t border-border-light bg-white">
          <div className="pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-muted hover:text-text-dark hover:bg-bg-soft hover:border-border-light"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#clubs"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-muted hover:text-text-dark hover:bg-bg-soft hover:border-border-light"
              onClick={() => setIsOpen(false)}
            >
              Clubs
            </a>
            <Link
              to="/announcements"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text-muted hover:text-text-dark hover:bg-bg-soft hover:border-border-light"
              onClick={() => setIsOpen(false)}
            >
              Announcements
            </Link>
            
            <div className="mt-4 px-4 border-t border-border-light pt-4 pb-4">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center px-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-pill shadow-card border border-border-light object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-pill bg-navy-primary/10 text-navy-primary flex items-center justify-center font-bold shadow-card border border-navy-primary/20">
                        {user.email ? user.email[0].toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="ml-3 min-w-0 flex-1">
                      <div className="text-sm font-medium text-text-dark truncate">
                        {user.displayName || user.email}
                      </div>
                      {user.displayName && (
                        <div className="text-xs text-text-muted truncate">
                          {user.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex justify-center items-center gap-2 bg-white border border-border-light text-text-muted px-4 py-2.5 rounded-sm text-base font-medium hover:bg-bg-soft transition-colors shadow-card"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Log Out
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center gap-2 w-full bg-navy-primary text-white px-4 py-3 rounded-sm text-base font-semibold hover:bg-navy-secondary hover:shadow-hover transition-all active:scale-[0.98]"
                >
                  <LogIn className="w-5 h-5 text-white/70" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
