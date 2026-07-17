import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClubDetail from './pages/ClubDetail';
import Announcements from './pages/Announcements';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
