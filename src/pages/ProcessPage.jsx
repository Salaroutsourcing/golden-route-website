import Process from '../components/sections/Process';
import PageHero from '../components/ui/PageHero';

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Four steps from apply to deployment"
        description="A clear sequence — apply, screening, visa, then deployment to your Gulf workplace."
      />
      <Process showHeading={false} />
    </>
  );
}
