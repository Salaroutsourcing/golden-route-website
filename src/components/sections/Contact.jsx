import './Contact.css';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { siteConfig } from '../../data/siteConfig';

export default function Contact({ showHeading = true }) {
  return (
    <section className="contact section" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          {showHeading && (
            <SectionHeading
              eyebrow="Contact"
              align="left"
              title="Visit or message our Islamabad desk"
              description="Applications go through the job portal. Use these channels for office visits, employer inquiries, or quick WhatsApp questions."
            />
          )}

          <div className="contact__details">
            <a
              href={`tel:${siteConfig.contact.phones[0].number.replace(/\s/g, '')}`}
              className="contact__detail-card"
            >
              <Icon name="phone" size={20} />
              <div>
                <span className="contact__detail-label">Call us</span>
                <span className="contact__detail-value">
                  {siteConfig.contact.phones[0].number}
                </span>
              </div>
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__detail-card"
            >
              <Icon name="whatsapp" size={20} />
              <div>
                <span className="contact__detail-label">WhatsApp</span>
                <span className="contact__detail-value">Chat with the recruitment desk</span>
              </div>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="contact__detail-card">
              <Icon name="mail" size={20} />
              <div>
                <span className="contact__detail-label">Email</span>
                <span className="contact__detail-value">{siteConfig.contact.email}</span>
              </div>
            </a>
            <a
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__detail-card"
            >
              <Icon name="pin" size={20} />
              <div>
                <span className="contact__detail-label">Office</span>
                <span className="contact__detail-value">{siteConfig.contact.address}</span>
              </div>
            </a>
          </div>
        </div>

        <div className="contact__cta-panel geo-motif geo-motif--dark">
          <h3 className="contact__cta-title">Ready to apply?</h3>
          <p className="contact__cta-text">
            Use the job portal for passport details, experience, CV and passport photo.
            That is how we confirm your application.
          </p>
          <Button to="/apply" variant="primary" size="lg" icon="arrow-right">
            Go to Job Portal
          </Button>
          <a
            className="contact__map-link"
            href={siteConfig.contact.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open office on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
