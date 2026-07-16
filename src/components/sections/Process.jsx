import './Process.css';
import SectionHeading from '../ui/SectionHeading';
import { processSteps } from '../../data/processSteps';
import { useReveal } from '../../hooks/useReveal';

export default function Process() {
  const { ref, visible } = useReveal();

  return (
    <section className="process section" id="process">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps from apply to deployment"
          description="A clear sequence — apply, screening, visa, then deployment to your Gulf workplace."
        />

        <ol
          ref={ref}
          className={`process__timeline reveal ${visible ? 'is-visible' : ''}`}
        >
          {processSteps.map((item, i) => (
            <li key={item.step} className="process__item">
              {i < processSteps.length - 1 && (
                <span className="process__connector" aria-hidden="true" />
              )}
              <span className="process__number">{item.step}</span>
              <h3 className="process__title">{item.title}</h3>
              <p className="process__desc">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
