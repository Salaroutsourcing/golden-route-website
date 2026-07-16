import { useEffect, useState } from 'react';
import './EmployerPortal.css';
import Button from '../ui/Button';
import { siteConfig } from '../../data/siteConfig';
import {
  subscribeJobs,
  addJob,
  removeJob,
  setJobActive,
  getEmployerPassword,
  getEmployerEmail,
  isFirebaseConfigured,
} from '../../lib/jobsStore';

const EMPTY_JOB = {
  title: '',
  trade: 'Construction',
  country: 'Saudi Arabia',
  countryCode: 'sa',
  salaryNote: '',
  requirements: '',
  benefits: '',
  details: '',
};

const TRADE_OPTIONS = [
  'Transportation',
  'Construction',
  'Oil & Gas',
  'Electrical',
  'Welding',
  'Hospitality',
  'Other',
];

export default function EmployerPortal() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [draft, setDraft] = useState(EMPTY_JOB);
  const [busy, setBusy] = useState(false);
  const [postedMsg, setPostedMsg] = useState('');

  useEffect(() => subscribeJobs(setJobs), []);

  useEffect(() => {
    if (sessionStorage.getItem('gr-employer') === '1') setAuthed(true);
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured()) return undefined;
    let unsub = () => {};
    import('../../lib/firebase').then(async ({ auth }) => {
      if (!auth) return;
      const { onAuthStateChanged } = await import('firebase/auth');
      unsub = onAuthStateChanged(auth, (user) => {
        if (user) setAuthed(true);
      });
    });
    return () => unsub();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (isFirebaseConfigured()) {
        const { auth } = await import('../../lib/firebase');
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        if (auth) {
          await signInWithEmailAndPassword(auth, getEmployerEmail(), password);
          setAuthed(true);
          setBusy(false);
          return;
        }
      }
      if (password === getEmployerPassword()) {
        setAuthed(true);
        sessionStorage.setItem('gr-employer', '1');
      } else {
        setError('Incorrect password. Try again.');
      }
    } catch {
      if (password === getEmployerPassword()) {
        setAuthed(true);
        sessionStorage.setItem('gr-employer', '1');
      } else {
        setError('Login failed. Check password or Firebase Auth setup.');
      }
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('gr-employer');
    setAuthed(false);
    setPassword('');
    if (isFirebaseConfigured()) {
      try {
        const { auth } = await import('../../lib/firebase');
        const { signOut } = await import('firebase/auth');
        if (auth) await signOut(auth);
      } catch {
        /* ignore */
      }
    }
  };

  const onCountryChange = (e) => {
    const country = e.target.value;
    const match = siteConfig.gulfCountries.find((c) => c.name === country);
    setDraft((d) => ({
      ...d,
      country,
      countryCode: match?.code || 'sa',
    }));
  };

  const createJob = async (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    setBusy(true);
    setPostedMsg('');
    try {
      const created = await addJob(draft);
      setDraft(EMPTY_JOB);
      setPostedMsg(
        `"${created.title}" is live on Open Positions. Candidates can see requirements and benefits now.`
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="employer section" id="employer-portal">
      <div className="container employer__inner">
        <header className="employer__header">
          <div>
            <p className="employer__eyebrow">Employer desk</p>
            <h2 className="employer__title">Post & manage job openings</h2>
            <p className="employer__sub">
              Shared client login — add a role with requirements and benefits, then delete or mark
              complete when filled.
            </p>
          </div>
          {authed && (
            <Button type="button" variant="secondary" size="sm" onClick={logout}>
              Sign out
            </Button>
          )}
        </header>

        {!authed ? (
          <form className="employer__login" onSubmit={login}>
            <label className="employer__field">
              <span>Client password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Password provided by Golden Route"
              />
            </label>
            {error && <p className="employer__error">{error}</p>}
            <Button type="submit" variant="primary" size="md" disabled={busy}>
              {busy ? 'Signing in…' : 'Enter employer portal'}
            </Button>
            <p className="employer__hint">
              {isFirebaseConfigured()
                ? 'Connected to Firebase when credentials are configured.'
                : 'Jobs save in this browser and appear on Open Positions immediately. For sharing across phones/PCs, connect Firebase (see EMPLOYER_PORTAL.md).'}
            </p>
          </form>
        ) : (
          <div className="employer__workspace">
            <form className="employer__create" onSubmit={createJob}>
              <h3>Add a job</h3>
              <div className="employer__grid">
                <label className="employer__field">
                  <span>Job title</span>
                  <input
                    value={draft.title}
                    onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                    required
                    placeholder="e.g. Heavy Vehicle Driver"
                  />
                </label>
                <label className="employer__field">
                  <span>Trade</span>
                  <select
                    value={draft.trade}
                    onChange={(e) => setDraft((d) => ({ ...d, trade: e.target.value }))}
                  >
                    {TRADE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="employer__field">
                  <span>Country</span>
                  <select value={draft.country} onChange={onCountryChange}>
                    {siteConfig.gulfCountries.map((c) => (
                      <option key={c.code} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="employer__field">
                  <span>Salary / package note</span>
                  <input
                    value={draft.salaryNote}
                    onChange={(e) => setDraft((d) => ({ ...d, salaryNote: e.target.value }))}
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label className="employer__field employer__field--full">
                <span>About this role</span>
                <textarea
                  rows={2}
                  value={draft.details}
                  onChange={(e) => setDraft((d) => ({ ...d, details: e.target.value }))}
                  placeholder="Short summary of the job for candidates"
                />
              </label>

              <div className="employer__grid">
                <label className="employer__field">
                  <span>Requirements</span>
                  <textarea
                    rows={4}
                    value={draft.requirements}
                    onChange={(e) => setDraft((d) => ({ ...d, requirements: e.target.value }))}
                    placeholder={'One per line, e.g.\nValid licence\n3+ years experience\nAge 25–45'}
                    required
                  />
                </label>
                <label className="employer__field">
                  <span>Benefits for candidate</span>
                  <textarea
                    rows={4}
                    value={draft.benefits}
                    onChange={(e) => setDraft((d) => ({ ...d, benefits: e.target.value }))}
                    placeholder={'One per line, e.g.\nAccommodation\nFood\nOvertime'}
                    required
                  />
                </label>
              </div>

              <Button type="submit" variant="primary" size="md" disabled={busy}>
                Post job
              </Button>
              {postedMsg && (
                <p className="employer__success" role="status">
                  {postedMsg}{' '}
                  <Button to="/positions" variant="text" size="sm">
                    View positions
                  </Button>
                </p>
              )}
            </form>

            <div className="employer__list">
              <h3>Posted jobs ({jobs.length})</h3>
              {jobs.length === 0 ? (
                <p className="employer__empty">No jobs yet. Post your first opening above.</p>
              ) : (
                <ul>
                  {jobs.map((job) => (
                    <li key={job.id} className="employer__job">
                      <div>
                        <p className="employer__job-title">
                          {job.title}
                          {job.active === false && (
                            <span className="employer__badge">Completed</span>
                          )}
                        </p>
                        <p className="employer__job-meta">
                          {job.trade} · {job.country}
                        </p>
                      </div>
                      <div className="employer__job-actions">
                        {job.active !== false ? (
                          <button type="button" onClick={() => setJobActive(job.id, false)}>
                            Mark complete
                          </button>
                        ) : (
                          <button type="button" onClick={() => setJobActive(job.id, true)}>
                            Reopen
                          </button>
                        )}
                        <button
                          type="button"
                          className="employer__danger"
                          onClick={() => removeJob(job.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
