import { Link } from 'react-router-dom';
import OpenPositions from '../components/sections/OpenPositions';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import './PositionsPage.css';

export default function PositionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Open positions"
        title="Current Gulf job orders"
        description="Browse requirements and benefits, then apply through the job portal."
      />

      <div className="positions-page__employer-bar">
        <div className="container positions-page__employer-inner">
          <div>
            <p className="positions-page__employer-label">For employers / clients</p>
            <p className="positions-page__employer-text">
              Post a job card here — it goes live on this Positions page. Password required.
            </p>
          </div>
          <Button to="/employer" variant="primary" size="md">
            Open employer portal
          </Button>
        </div>
      </div>

      <OpenPositions showHeading={false} />

      <p className="positions-page__hint container">
        Client link (bookmark this): <Link to="/employer">/#/employer</Link>
      </p>
    </>
  );
}
