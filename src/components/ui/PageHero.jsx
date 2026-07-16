import './PageHero.css';

export default function PageHero({ eyebrow, title, description }) {
  return (
    <div className="page-hero geo-motif geo-motif--dark">
      <div className="container page-hero__inner">
        {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {description && <p className="page-hero__desc">{description}</p>}
      </div>
    </div>
  );
}
