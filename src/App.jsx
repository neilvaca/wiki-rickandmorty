import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';

import Home from './pages/Home';
import NoPage from './pages/NoPage';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
