import './Flag.css';

/** Compact Gulf flag via flagcdn.com — avoids bundling every world flag. */
export default function Flag({ code, name, className = '' }) {
  const src = `https://flagcdn.com/w80/${code}.png`;
  const src2x = `https://flagcdn.com/w160/${code}.png`;

  return (
    <img
      className={`flag ${className}`.trim()}
      src={src}
      srcSet={`${src} 1x, ${src2x} 2x`}
      alt={name ? `Flag of ${name}` : ''}
      width={40}
      height={30}
      loading="lazy"
      decoding="async"
    />
  );
}
