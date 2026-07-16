import Hero from '../components/sections/Hero';
import TrustStrip from '../components/sections/TrustStrip';
import WhyUs from '../components/sections/WhyUs';
import OpenPositions from '../components/sections/OpenPositions';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import Button from '../components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhyUs />
      <OpenPositions compact />
      <Stats />
      <Testimonials />
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)' }}>
            Ready to apply?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '36rem' }}>
            Submit your passport details, experience and documents through our job portal.
          </p>
          <Button to="/apply" variant="primary" size="lg" icon="arrow-right">
            Go to Job Portal
          </Button>
        </div>
      </section>
    </>
  );
}
