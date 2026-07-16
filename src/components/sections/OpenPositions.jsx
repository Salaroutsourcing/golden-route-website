import { useEffect, useState } from 'react';
import './OpenPositions.css';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Flag from '../ui/Flag';
import { subscribeJobs } from '../../lib/jobsStore';

function splitLines(text) {
  if (!text) return [];
  return text
    .split(/\n|•|;/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function OpenPositions({ compact = false, showHeading = true }) {
  const [jobs, setJobs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => subscribeJobs(setJobs), []);

  const active = jobs.filter((j) => j.active !== false);

  return (
    <section className="positions section geo-motif geo-motif--green" id="positions">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow="Open positions"
            title="Current Gulf job orders"
            description="Open a role for requirements and benefits, then apply through the job portal."
          />
        )}

        {active.length === 0 ? (
          <p className="positions__empty">
            No open positions right now. Register on the job portal — we match you when a verified
            order opens.
          </p>
        ) : (
          <div className="positions__grid">
            {(compact ? active.slice(0, 3) : active).map((job) => {
              const open = expandedId === job.id;
              const requirements = splitLines(job.requirements);
              const benefits = splitLines(job.benefits);

              return (
                <article
                  key={job.id}
                  className={`positions__card ${open ? 'positions__card--open' : ''}`}
                >
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

                  <button
                    type="button"
                    className="positions__toggle"
                    aria-expanded={open}
                    onClick={() => setExpandedId(open ? null : job.id)}
                  >
                    {open ? 'Hide details' : 'View requirements & benefits'}
                  </button>

                  {open && (
                    <div className="positions__details">
                      {job.details && (
                        <div className="positions__block">
                          <h4>About this role</h4>
                          <p>{job.details}</p>
                        </div>
                      )}
                      {requirements.length > 0 && (
                        <div className="positions__block">
                          <h4>Requirements</h4>
                          <ul>
                            {requirements.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {benefits.length > 0 && (
                        <div className="positions__block">
                          <h4>Benefits</h4>
                          <ul>
                            {benefits.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {!job.details &&
                        requirements.length === 0 &&
                        benefits.length === 0 && (
                          <p className="positions__no-detail">
                            Details will be shared during screening. Apply to register your
                            interest.
                          </p>
                        )}
                    </div>
                  )}

                  <Button to="/apply" variant="primary" size="sm" icon="arrow-right">
                    Quick Apply
                  </Button>
                </article>
              );
            })}
          </div>
        )}

        {compact && active.length > 3 && (
          <div className="positions__more">
            <Button to="/positions" variant="secondary" size="md">
              View all positions
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
