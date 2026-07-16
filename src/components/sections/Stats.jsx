import { useEffect, useRef, useState } from 'react';
import './Stats.css';
import { stats } from '../../data/stats';

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatItem({ item, active }) {
  const value = useCountUp(item.value, active);
  return (
    <div className="stats__item">
      <p className="stats__value">
        {value.toLocaleString()}
        <span>{item.suffix}</span>
      </p>
      <p className="stats__label">{item.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats section" aria-label="Agency statistics" ref={ref}>
      <div className="container stats__grid">
        {stats.map((item) => (
          <StatItem key={item.id} item={item} active={active} />
        ))}
      </div>
    </section>
  );
}
