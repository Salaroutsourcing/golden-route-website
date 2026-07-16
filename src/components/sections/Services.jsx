import './Services.css';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';
import { services } from '../../data/services';
import { useReveal } from '../../hooks/useReveal';

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section className="services section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="From job order to departure"
          description="Recruitment, visa support, Protector clearance and travel — handled by our licensed Islamabad team."
        />

        <div
          ref={ref}
          className={`services__grid reveal ${visible ? 'is-visible' : ''}`}
        >
          {services.map((service) => (
            <article key={service.id} className="services__card">
              <div className="services__icon">
                <Icon name={service.icon} size={26} />
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
