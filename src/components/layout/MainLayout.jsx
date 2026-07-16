import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
