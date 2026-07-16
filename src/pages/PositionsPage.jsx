import OpenPositions from '../components/sections/OpenPositions';
import PageHero from '../components/ui/PageHero';

export default function PositionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Open positions"
        title="Current Gulf job orders"
        description="Browse requirements and benefits, then apply through the job portal."
      />
      <OpenPositions showHeading={false} />
    </>
  );
}
