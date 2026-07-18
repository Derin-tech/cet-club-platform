import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClubDetail from './pages/ClubDetail';
import Announcements from './pages/Announcements';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen relative font-sans text-text-dark bg-white overflow-x-hidden">
        {/* Global Fixed Background Image */}
        <div 
          className="fixed inset-0 bg-contain bg-[50%_85%] bg-no-repeat opacity-[0.08] pointer-events-none scale-[1.3] transform-origin-center z-0 translate-y-12"
          style={{ backgroundImage: "url('/home-bg.jpg')" }}
        ></div>
        
        {/* App Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs/:id" element={<ClubDetail />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
