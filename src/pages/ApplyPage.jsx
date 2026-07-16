import JobsPortal from '../components/sections/JobsPortal';
import PageHero from '../components/ui/PageHero';

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Job portal"
        title="Apply for Gulf placements"
        description="Fill in your details, then complete the official Google Form — including CV and passport photo — to confirm your application."
      />
      <JobsPortal showHeading={false} />
    </>
  );
}
