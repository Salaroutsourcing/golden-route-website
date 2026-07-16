import { useState } from 'react';
import './JobsPortal.css';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { siteConfig } from '../../data/siteConfig';

const INITIAL = {
  name: '',
  passportNo: '',
  experience: '',
  overseasExp: '',
  age: '',
  education: '',
  phone: '',
  cv: null,
  photo: null,
};

export default function JobsPortal() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('');

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((f) => ({ ...f, [name]: files[0] || null }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus(
      'Opening the official Google Form so you can attach your CV and passport photo. Complete the submission there to confirm your application.'
    );
    window.open(siteConfig.jobPortalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="jobs-portal section" id="jobs-portal">
      <div className="container">
        <SectionHeading
          eyebrow="Job portal"
          title="Apply for Gulf placements"
          description="Fill in your details below, then complete the official form — including CV and passport photo uploads — to confirm your application."
        />

        <div className="jobs-portal__layout">
          <form className="jobs-portal__form" onSubmit={onSubmit} noValidate>
            <div className="jobs-portal__row">
              <label className="jobs-portal__field">
                <span>Full name</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="As on passport"
                />
              </label>
              <label className="jobs-portal__field">
                <span>Passport No</span>
                <input
                  name="passportNo"
                  type="text"
                  required
                  value={form.passportNo}
                  onChange={onChange}
                  placeholder="Passport number"
                />
              </label>
            </div>

            <div className="jobs-portal__row">
              <label className="jobs-portal__field">
                <span>Experience</span>
                <input
                  name="experience"
                  type="text"
                  required
                  value={form.experience}
                  onChange={onChange}
                  placeholder="e.g. 5 years driver"
                />
              </label>
              <label className="jobs-portal__field">
                <span>Overseas experience</span>
                <input
                  name="overseasExp"
                  type="text"
                  value={form.overseasExp}
                  onChange={onChange}
                  placeholder="Gulf / abroad experience"
                />
              </label>
            </div>

            <div className="jobs-portal__row">
              <label className="jobs-portal__field">
                <span>Age</span>
                <input
                  name="age"
                  type="number"
                  min="18"
                  max="65"
                  required
                  value={form.age}
                  onChange={onChange}
                  placeholder="Years"
                />
              </label>
              <label className="jobs-portal__field">
                <span>Education</span>
                <input
                  name="education"
                  type="text"
                  required
                  value={form.education}
                  onChange={onChange}
                  placeholder="e.g. Matric, Intermediate"
                />
              </label>
            </div>

            <label className="jobs-portal__field">
              <span>Phone number</span>
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={onChange}
                placeholder="+92 3XX XXXXXXX"
              />
            </label>

            <div className="jobs-portal__row">
              <label className="jobs-portal__field">
                <span>Upload CV & experience documents</span>
                <input
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  required
                  onChange={onChange}
                />
              </label>
              <label className="jobs-portal__field">
                <span>Passport-size picture</span>
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  required
                  onChange={onChange}
                />
              </label>
            </div>

            <p className="jobs-portal__note">
              Submitting opens our official Google Form so file uploads are stored securely.
              Use the same details there to confirm your application.
            </p>

            <div className="jobs-portal__actions">
              <Button type="submit" variant="primary" size="lg" icon="arrow-right">
                Continue to Confirm Application
              </Button>
              <a
                className="jobs-portal__direct"
                href={siteConfig.jobPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Form directly
              </a>
            </div>

            {status && (
              <p className="jobs-portal__status" role="status">
                {status}
              </p>
            )}
          </form>

          <aside className="jobs-portal__qr geo-motif">
            <div className="jobs-portal__qr-frame">
              <img
                src="/images/job-portal-qr.png"
                alt="QR code linking to Golden Route Google Form job portal"
                width={220}
                height={220}
                loading="lazy"
              />
            </div>
            <p className="jobs-portal__qr-title">Scan to apply on mobile</p>
            <p className="jobs-portal__qr-text">
              Opens the same official job portal form on your phone.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
