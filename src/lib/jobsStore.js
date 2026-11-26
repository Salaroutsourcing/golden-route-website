// ==========================================================================
// Jobs store — one shared list for every visitor.
// Firebase is used when configured. Otherwise the public jobs document is
// the source of truth (not this browser's localStorage).
// ==========================================================================

import { seedJobs } from '../data/jobs';
import { isJobRecord, mergeUnsyncedJobs, sortJobs } from './jobsMerge';

const STORAGE_KEY = 'golden-route-jobs';
const SYNCED_KEY = 'golden-route-jobs-synced';
const JOBS_API_URL = 'https://api.npoint.io/2737838316f7b1f77c22';

const listeners = new Set();
const seedIds = new Set(seedJobs.map((job) => job.id));

let writeQueue = Promise.resolve();

function enqueue(task) {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(
    () => {},
    () => {}
  );
  return run;
}

function isFirebaseConfigured() {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
}

function readStoredJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isJobRecord) : [];
  } catch {
    return [];
  }
}

function cacheJobs(jobs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch {
    /* private mode / full storage */
  }
}

function notifyAll(jobs) {
  const sorted = sortJobs(jobs);
  listeners.forEach((fn) => {
    try {
      fn(sorted);
    } catch {
      /* ignore subscriber errors */
    }
  });
}

function fallbackJobs() {
  const stored = readStoredJobs();
  return stored.length > 0 ? sortJobs(stored) : sortJobs(seedJobs.map((job) => ({ ...job })));
}

async function getFirestoreApi() {
  const [
    { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy },
    { db },
  ] = await Promise.all([import('firebase/firestore'), import('./firebase')]);
  return { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, db };
}

async function fetchSharedJobs() {
  const response = await fetch(`${JOBS_API_URL}?t=${Date.now()}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) {
    throw new Error('Could not load jobs');
  }
  const data = await response.json();
  if (!data || !Array.isArray(data.jobs)) {
    throw new Error('Jobs list was unreadable');
  }
  return sortJobs(data.jobs.filter(isJobRecord));
}

async function saveSharedJobs(jobs) {
  const response = await fetch(JOBS_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jobs: sortJobs(jobs) }),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) {
    throw new Error('Could not publish jobs');
  }
  const data = await response.json().catch(() => null);
  const saved = data && Array.isArray(data.jobs) ? sortJobs(data.jobs.filter(isJobRecord)) : sortJobs(jobs);
  cacheJobs(saved);
  notifyAll(saved);
  return saved;
}

/** Push openings that exist only in this browser onto the public list, once. */
async function publishUnsyncedLocal(remoteJobs) {
  let alreadySynced = false;
  try {
    alreadySynced = localStorage.getItem(SYNCED_KEY) === '1';
  } catch {
    return remoteJobs;
  }
  if (alreadySynced) return remoteJobs;

  const extras = mergeUnsyncedJobs(readStoredJobs(), remoteJobs, seedIds);
  const changed = extras.length !== remoteJobs.length;
  const saved = changed ? await saveSharedJobs(extras) : remoteJobs;
  try {
    localStorage.setItem(SYNCED_KEY, '1');
  } catch {
    /* ignore */
  }
  return saved;
}

function subscribeShared(onChange) {
  let cancelled = false;

  let refreshing = false;

  const refresh = async () => {
    if (refreshing) return;
    refreshing = true;
    try {
      const jobs = await enqueue(async () => {
        const remote = await fetchSharedJobs();
        return publishUnsyncedLocal(remote);
      });
      if (cancelled) return;
      cacheJobs(jobs);
      notifyAll(jobs);
    } catch {
      if (!cancelled) onChange(fallbackJobs());
    } finally {
      refreshing = false;
    }
  };

  refresh();

  const onVisible = () => {
    if (document.visibilityState === 'visible') refresh();
  };
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY) onChange(fallbackJobs());
  };
  document.addEventListener('visibilitychange', onVisible);
  window.addEventListener('storage', onStorage);
  const timer = window.setInterval(() => {
    if (document.visibilityState === 'visible') refresh();
  }, 20000);

  return () => {
    cancelled = true;
    listeners.delete(onChange);
    document.removeEventListener('visibilitychange', onVisible);
    window.removeEventListener('storage', onStorage);
    window.clearInterval(timer);
  };
}

/** Subscribe to jobs. Returns unsubscribe fn. */
export function subscribeJobs(onChange) {
  listeners.add(onChange);

  if (!isFirebaseConfigured()) {
    onChange(fallbackJobs());
    const stop = subscribeShared(onChange);
    return () => {
      listeners.delete(onChange);
      stop();
    };
  }

  let unsubFs = () => {};
  let cancelled = false;

  getFirestoreApi()
    .then(({ collection, onSnapshot, query, orderBy, db }) => {
      if (cancelled || !db) {
        onChange(fallbackJobs());
        return;
      }
      const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      unsubFs = onSnapshot(
        q,
        (snap) => {
          const jobs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          notifyAll(jobs);
        },
        () => onChange(fallbackJobs())
      );
    })
    .catch(() => onChange(fallbackJobs()));

  return () => {
    cancelled = true;
    listeners.delete(onChange);
    unsubFs();
  };
}

function jobPayload(job) {
  return {
    title: job.title.trim(),
    trade: job.trade,
    country: job.country,
    countryCode: job.countryCode,
    salaryNote: (job.salaryNote || '').trim(),
    requirements: (job.requirements || '').trim(),
    benefits: (job.benefits || '').trim(),
    details: (job.details || '').trim(),
    active: true,
    createdAt: Date.now(),
  };
}

export async function addJob(job) {
  const payload = jobPayload(job);

  if (isFirebaseConfigured()) {
    try {
      const { collection, addDoc, db } = await getFirestoreApi();
      if (db) {
        const ref = await addDoc(collection(db, 'jobs'), payload);
        return { id: ref.id, ...payload };
      }
    } catch {
      /* use the shared list */
    }
  }

  const created = { id: `job-${Date.now()}`, ...payload };
  await enqueue(async () => {
    const current = await fetchSharedJobs();
    await saveSharedJobs([created, ...current.filter((item) => item.id !== created.id)]);
  });
  try {
    localStorage.setItem(SYNCED_KEY, '1');
  } catch {
    /* ignore */
  }
  return created;
}

export async function removeJob(id) {
  if (isFirebaseConfigured()) {
    try {
      const { doc, deleteDoc, db } = await getFirestoreApi();
      if (db) {
        await deleteDoc(doc(db, 'jobs', id));
        return;
      }
    } catch {
      /* use the shared list */
    }
  }

  await enqueue(async () => {
    const current = await fetchSharedJobs();
    await saveSharedJobs(current.filter((job) => job.id !== id));
  });
}

export async function setJobActive(id, active) {
  if (isFirebaseConfigured()) {
    try {
      const { doc, updateDoc, db } = await getFirestoreApi();
      if (db) {
        await updateDoc(doc(db, 'jobs', id), { active });
        return;
      }
    } catch {
      /* use the shared list */
    }
  }

  await enqueue(async () => {
    const current = await fetchSharedJobs();
    await saveSharedJobs(current.map((job) => (job.id === id ? { ...job, active } : job)));
  });
}

export function getEmployerPassword() {
  return import.meta.env.VITE_EMPLOYER_PASSWORD || 'Salaaroutsourcing@00';
}

export function getEmployerEmail() {
  return import.meta.env.VITE_EMPLOYER_EMAIL || 'employers@goldenrouteoep.com';
}

export { isFirebaseConfigured };
