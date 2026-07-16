import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import TrustStrip from './components/sections/TrustStrip';
import WhyUs from './components/sections/WhyUs';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Trades from './components/sections/Trades';
import OpenPositions from './components/sections/OpenPositions';
import Stats from './components/sections/Stats';
import Testimonials from './components/sections/Testimonials';
import JobsPortal from './components/sections/JobsPortal';
import Contact from './components/sections/Contact';
import EmployerPortal from './components/sections/EmployerPortal';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <WhyUs />
        <Services />
        <Process />
        <Trades />
        <OpenPositions />
        <Stats />
        <Testimonials />
        <JobsPortal />
        <Contact />
        <EmployerPortal />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default App;
