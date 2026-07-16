import { useEffect, useState } from 'react';
import './OpenPositions.css';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Flag from '../ui/Flag';
import { subscribeJobs } from '../../lib/jobsStore';
import { useReveal } from '../../hooks/useReveal';

export default function OpenPositions() {
  const [jobs, setJobs] = useState([]);
  const { ref, visible } = useReveal();

  useEffect(() => subscribeJobs(setJobs), []);

  const active = jobs.filter((j) => j.active !== false);

  return (
    <section className="positions section geo-motif geo-motif--green" id="positions">
      <div className="container">
        <SectionHeading
          eyebrow="Open positions"
          title="Current Gulf job orders"
          description="Quick-apply sends you to our job portal. Employers post and close roles through the employer desk."
        />

        {active.length === 0 ? (
          <p className="positions__empty">
            No open positions right now. Register your profile on the job portal — we match you when a verified order opens.
          </p>
        ) : (
          <div
            ref={ref}
            className={`positions__grid reveal ${visible ? 'is-visible' : ''}`}
          >
            {active.map((job) => (
              <article key={job.id} className="positions__card">
                <div className="positions__top">
                  <Flag
                    code={job.countryCode}
                    name={job.country}
                    className="positions__flag"
                  />
                  <span className="positions__trade">{job.trade}</span>
                </div>
                <h3 className="positions__title">{job.title}</h3>
                <p className="positions__meta">{job.country}</p>
                {job.salaryNote && (
                  <p className="positions__salary">{job.salaryNote}</p>
                )}
                <Button href="#jobs-portal" variant="primary" size="sm" icon="arrow-right">
                  Quick Apply
                </Button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
