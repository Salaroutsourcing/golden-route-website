import './WhyUs.css';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';
import { whyUs } from '../../data/whyUs';
import { useReveal } from '../../hooks/useReveal';

export default function WhyUs() {
  const { ref, visible } = useReveal();

  return (
    <section className="why-us section geo-motif geo-motif--green" id="why-us">
      <div className="container">
        <SectionHeading
          eyebrow="Why Golden Route"
          title="Built for Gulf placements — not generic recruitment"
          description="We move Pakistani tradespeople into verified roles across the six GCC countries under a BE&OE licence."
        />
        <div
          ref={ref}
          className={`why-us__grid reveal ${visible ? 'is-visible' : ''}`}
        >
          {whyUs.map((item) => (
            <article key={item.id} className="why-us__card">
              <div className="why-us__icon" aria-hidden="true">
                <Icon name={item.icon} size={26} />
              </div>
              <h3 className="why-us__title">{item.title}</h3>
              <p className="why-us__desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
