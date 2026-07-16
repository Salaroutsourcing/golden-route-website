import './Trades.css';
import SectionHeading from '../ui/SectionHeading';
import { trades } from '../../data/trades';
import { useReveal } from '../../hooks/useReveal';

export default function Trades() {
  const { ref, visible } = useReveal();

  return (
    <section className="trades section" id="workforce">
      <div className="container">
        <SectionHeading
          eyebrow="Trades we place"
          title="Drivers, construction, oil & gas — and every skilled trade in between"
          description="We recruit for transportation, construction sites, energy projects, electrical work, welding and hospitality across the Gulf."
        />

        <div
          ref={ref}
          className={`trades__grid reveal ${visible ? 'is-visible' : ''}`}
        >
          {trades.map((item) => (
            <figure key={item.id} className="trades__item">
              <img src={item.src} alt={item.label} loading="lazy" width={800} height={530} />
              <figcaption className="trades__overlay">
                <span className="trades__label">{item.label}</span>
                <span className="trades__caption">{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
