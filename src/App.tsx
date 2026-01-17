import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { RunTracker } from './pages/RunTracker';
import { History } from './pages/History';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { BottomNav } from './components/BottomNav';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hideNav = location.pathname === '/run';

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <main className={!hideNav ? "pb-20" : ""}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/run" element={<RunTracker />} />
          <Route path="/history" element={<History />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;