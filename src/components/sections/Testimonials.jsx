import { useEffect, useState } from 'react';
import './Testimonials.css';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';
import Flag from '../ui/Flag';
import { testimonials } from '../../data/testimonials';

const INTERVAL_MS = 5000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const item = testimonials[index];

  return (
    <section
      className="testimonials section"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <SectionHeading
          eyebrow="Stories from the corridor"
          title="What workers and partners say"
          description="Placeholder quotes — replace with real names when you are ready."
        />

        <div className="testimonials__stage" aria-live="polite">
          <Icon name="quote" size={36} className="testimonials__quote-icon" />
          <blockquote className="testimonials__quote">“{item.quote}”</blockquote>
          <footer className="testimonials__footer">
            <Flag
              code={item.countryCode}
              name={item.country}
              className="testimonials__flag"
            />
            <div>
              <p className="testimonials__name">{item.name}</p>
              <p className="testimonials__role">
                {item.role} · {item.country}
              </p>
            </div>
          </footer>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Testimonials">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              className={`testimonials__dot ${i === index ? 'testimonials__dot--active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
