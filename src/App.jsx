import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClubDetail from './pages/ClubDetail';
import Announcements from './pages/Announcements';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clubs/:id" element={<ClubDetail />} />
      <Route path="/announcements" element={<Announcements />} />
      {/* TODO: Add login route here when Firebase is integrated */}
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
