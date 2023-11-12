import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';

import { NotSupported } from './pages/components/NotSupported';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Home from './pages/Home';
import NoPage from './pages/NoPage';

export const App = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 300);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 320);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isSmallDevice) return <NotSupported />;

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-use" element={<TermsOfUse />} />
        </Route>
      </Routes>
    </Router>
  );
};
