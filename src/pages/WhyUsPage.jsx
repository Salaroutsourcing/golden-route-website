import WhyUs from '../components/sections/WhyUs';
import PageHero from '../components/ui/PageHero';

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Golden Route"
        title="Built for Gulf placements"
        description="Licensed BE&OE recruitment focused on Saudi Arabia, UAE, Qatar, Kuwait, Bahrain and Oman."
      />
      <WhyUs showHeading={false} />
    </>
  );
}
