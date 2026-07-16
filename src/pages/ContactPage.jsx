import Contact from '../components/sections/Contact';
import PageHero from '../components/ui/PageHero';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Visit or message our Islamabad desk"
        description="Applications go through the job portal. Use these channels for office visits or WhatsApp questions."
      />
      <Contact showHeading={false} />
    </>
  );
}
