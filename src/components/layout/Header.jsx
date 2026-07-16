import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { siteConfig } from '../../data/siteConfig';

const NAV_LINKS = [
  { label: 'Why Us', to: '/why-us' },
  { label: 'Services', to: '/services' },
  { label: 'Trades', to: '/trades' },
  { label: 'Positions', to: '/positions' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Contact', to: '/contact' },
  { label: 'Employer', to: '/employer' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo-link" aria-label="Golden Route — home">
          <Logo size={isScrolled ? 36 : 42} />
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <a
            href={`tel:${siteConfig.contact.phones[0].number.replace(/\s/g, '')}`}
            className="header__phone"
          >
            <Icon name="phone" size={16} />
            <span>{siteConfig.contact.phones[0].number}</span>
          </a>
          <Button to="/apply" variant="primary" size="sm">
            Apply Now
          </Button>
        </div>

        <button
          className="header__menu-toggle"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          type="button"
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={26} />
        </button>
      </div>

      <div
        className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}
        id="mobile-nav"
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleLinkClick}
              className="header__mobile-link"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header__mobile-footer">
          <a
            href={`tel:${siteConfig.contact.phones[0].number.replace(/\s/g, '')}`}
            className="header__mobile-phone"
          >
            <Icon name="phone" size={18} />
            {siteConfig.contact.phones[0].number}
          </a>
          <Button
            to="/apply"
            variant="primary"
            size="lg"
            onClick={handleLinkClick}
            className="header__mobile-cta"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
