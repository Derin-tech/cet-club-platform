import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmittingEmail(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setError('');
    setIsSubmittingGoogle(true);
    
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsSubmittingGoogle(false);
    }
  };

  const handleAuthError = (err) => {
    switch (err.code) {
      case 'auth/invalid-email':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        setError('Invalid email or password.');
        break;
      case 'auth/too-many-requests':
        setError('Too many failed login attempts. Please try again later.');
        break;
      case 'auth/popup-closed-by-user':
        // User closed the popup, usually no need to show an error message, but can clear if any
        break;
      default:
        setError('Failed to log in. Please try again.');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Panel - Brand Moment */}
      <div className="relative md:w-1/2 bg-navy-secondary flex flex-col justify-center items-center p-12 overflow-hidden min-h-[400px]">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-navy-primary rounded-pill mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-[20%] right-[-10%] w-72 h-72 bg-navy-primary rounded-pill mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-80 h-80 bg-navy-primary rounded-pill mix-blend-multiply filter blur-3xl opacity-50"></div>
        
        {/* Abstract SVG Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative z-10 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-8 mx-auto border border-white/20 shadow-floating">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            CET Club Platform
          </h1>
          <p className="text-lg text-white/70 font-medium leading-relaxed">
            One platform for every club at CET. Discover, join, and manage your campus communities all in one place.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="md:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24 bg-white flex-1">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-extrabold text-text-dark mb-2">Welcome back</h2>
          <p className="text-text-muted mb-8 font-medium">Please enter your details to sign in.</p>
          
          <form className="space-y-5" onSubmit={handleEmailSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-md text-sm font-medium flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-border-light rounded-md shadow-card placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-navy-primary focus:border-navy-primary sm:text-sm transition-shadow text-text-dark bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-muted mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-border-light rounded-md shadow-card placeholder-text-muted/50 focus:outline-none focus:ring-2 focus:ring-navy-primary focus:border-navy-primary sm:text-sm transition-shadow text-text-dark bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingEmail || isSubmittingGoogle}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-card text-sm font-semibold text-white bg-navy-primary hover:bg-navy-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              {isSubmittingEmail ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Log In
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-text-muted font-medium">or continue with</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleGoogleSubmit}
                disabled={isSubmittingEmail || isSubmittingGoogle}
                className="w-full flex justify-center items-center py-3 px-4 border border-border-light rounded-md shadow-card bg-white text-sm font-semibold text-text-dark hover:bg-bg-soft hover:border-border-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
              >
                {isSubmittingGoogle ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                )}
                Sign in with Google
              </button>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-center text-xs text-text-muted/60 font-medium">
              Accounts are created by the platform admin. <br className="hidden sm:block" />
              If you don't have an account, please contact your club representative.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
