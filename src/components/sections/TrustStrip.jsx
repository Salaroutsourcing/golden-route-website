import './TrustStrip.css';
import { siteConfig } from '../../data/siteConfig';

const ITEMS = [
  { label: 'License', value: siteConfig.licenseNumber, mono: true },
  { label: 'Authority', value: siteConfig.licenseLabel },
  { label: 'Experience', value: `${siteConfig.yearsActive} years placing Gulf talent` },
  { label: 'Support', value: 'WhatsApp & phone — Islamabad desk' },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Credentials and trust">
      <div className="container trust-strip__grid">
        {ITEMS.map((item) => (
          <div key={item.label} className="trust-strip__item">
            <span className="trust-strip__label">{item.label}</span>
            <span className={`trust-strip__value ${item.mono ? 'trust-strip__value--mono' : ''}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
