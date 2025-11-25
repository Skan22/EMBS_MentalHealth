import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sanctuary } from './pages/Sanctuary';
import { Activities } from './pages/Activities';
import { Store } from './pages/Store';
import { Navigation } from './components/Navigation';

const AppContent = () => {
  const location = useLocation();
  const showNav = ['/', '/activities', '/store'].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Sanctuary />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/store" element={<Store />} />
      </Routes>
      {showNav && <Navigation />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
