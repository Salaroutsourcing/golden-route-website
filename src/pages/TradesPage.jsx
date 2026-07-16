import Trades from '../components/sections/Trades';
import PageHero from '../components/ui/PageHero';

export default function TradesPage() {
  return (
    <>
      <PageHero
        eyebrow="Trades"
        title="Drivers, construction, oil & gas and more"
        description="We recruit across transportation, construction, energy, electrical, welding and hospitality."
      />
      <Trades showHeading={false} />
    </>
  );
}
