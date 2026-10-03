import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { Dashboard } from './pages/Dashboard';
import { SheetBuilder } from './pages/SheetBuilder';
import { ScanSheets } from './pages/ScanSheets';
import { ScoreAnalytics } from './pages/ScoreAnalytics';
import { TestHistory } from './pages/TestHistory';
import { Settings } from './pages/Settings';
import { useStore } from './store';

function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useStore(state => state.theme);

  useEffect(() => {
    let isDark = false;
    if (theme === 'dark') {
      isDark = true;
    } else if (theme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/builder': return 'Sheet builder';
      case '/scan': return 'Scan sheets';
      case '/analytics': return 'Score analytics';
      case '/history': return 'Test history';
      case '/settings': return 'Settings';
      default: return 'GradeStack';
    }
  };

  return (
    <div className="flex h-screen w-full bg-paper overflow-hidden relative">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
        {location.pathname !== '/scan' && <MobileHeader title={getPageTitle()} onMenuClick={() => setSidebarOpen(true)} />}
        <main className={`flex-1 overflow-y-auto w-full relative ${location.pathname === '/scan' ? 'bg-ink' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/builder" element={<SheetBuilder />} />
            <Route path="/scan" element={<ScanSheets />} />
            <Route path="/analytics" element={<ScoreAnalytics />} />
            <Route path="/history" element={<TestHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
