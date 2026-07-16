import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import WhyUsPage from './pages/WhyUsPage';
import ServicesPage from './pages/ServicesPage';
import TradesPage from './pages/TradesPage';
import PositionsPage from './pages/PositionsPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';
import ApplyPage from './pages/ApplyPage';
import EmployerPage from './pages/EmployerPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="why-us" element={<WhyUsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="trades" element={<TradesPage />} />
          <Route path="positions" element={<PositionsPage />} />
          <Route path="how-it-works" element={<ProcessPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="apply" element={<ApplyPage />} />
          <Route path="employer" element={<EmployerPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
