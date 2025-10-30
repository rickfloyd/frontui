import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import NeonTheme from './components/NeonTheme';
import MinimalTheme from './components/MinimalTheme';
import DualModeToggle from './components/DualModeToggle';
import LiveUserCount from './components/LiveUserCount';
import EmailSignIn from './components/EmailSignIn';
import SendTestEmail from './components/SendTestEmail';
import SimpleView from './components/SimpleView';
import CustomView from './components/CustomView';
import Personalities from './pages/Personalities';
import { ModularDashboard } from './pages/ModularDashboard';
import { VRTradingPortal } from './pages/VRTradingPortal';
import EducationHub from './modules/EducationHub';
import SportsPage from './app/sports/page';
import Markets from './pages/Markets';
import CommunityHub from './pages/CommunityHub';

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return theme === 'neon' ? (
    <NeonTheme>{children}</NeonTheme>
  ) : (
    <MinimalTheme>{children}</MinimalTheme>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LayoutWrapper>
          <LiveUserCount fixed />
          <DualModeToggle />
          <main className="p-6 space-y-10">
            <Routes>
              <Route path="/" element={<EmailSignIn />} />
              <Route path="/personalities" element={<Personalities />} />
              <Route path="/dashboard" element={<ModularDashboard />} />
              <Route path="/vr" element={<VRTradingPortal />} />
              <Route path="/education" element={<EducationHub />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/community" element={<CommunityHub />} />
            </Routes>
            <SendTestEmail />
          </main>
        </LayoutWrapper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
