import './Hero.css';
import Button from '../ui/Button';
import Flag from '../ui/Flag';
import { siteConfig } from '../../data/siteConfig';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Welcome">
      <div className="hero__media" aria-hidden="true">
        <img
          className="hero__img"
          src="/images/hero-saudi.jpg"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow">Vision 2030 · Gulf placements from Islamabad</p>
        <h1 className="hero__title">Your verified route to work in the Gulf</h1>
        <p className="hero__sub">
          Golden Route places skilled Pakistani workers with licensed employers in Saudi Arabia,
          UAE, Qatar, Kuwait, Bahrain and Oman.
        </p>
        <Button href="#jobs-portal" variant="primary" size="lg" icon="arrow-right">
          Apply Now
        </Button>
      </div>

      <div className="hero__corridor geo-motif geo-motif--dark">
        <div className="container hero__corridor-inner">
          <p className="hero__welcome">
            <span lang="en">Welcome</span>
            <span className="hero__welcome-sep" aria-hidden="true">·</span>
            <span lang="ar" dir="rtl">أهلاً وسهلاً</span>
          </p>
          <ul className="hero__flags" aria-label="Gulf destination countries">
            {siteConfig.gulfCountries.map((c) => (
              <li key={c.code}>
                <a
                  className="hero__flag"
                  href={`#positions`}
                  title={`Open positions in ${c.name}`}
                >
                  <Flag code={c.code} name={c.name} className="hero__flag-icon" />
                  <span className="hero__flag-name">{c.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
