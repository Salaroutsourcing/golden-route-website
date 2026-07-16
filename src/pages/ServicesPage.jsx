import Services from '../components/sections/Services';
import PageHero from '../components/ui/PageHero';

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="From job order to departure"
        description="Recruitment, visa support, Protector clearance and travel — handled by our Islamabad desk."
      />
      <Services showHeading={false} />
    </>
  );
}
