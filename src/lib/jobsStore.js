// ==========================================================================
// Jobs store — shared in-memory listeners + localStorage (Firebase optional).
// ==========================================================================

import { seedJobs } from '../data/jobs';

const STORAGE_KEY = 'golden-route-jobs';
const listeners = new Set();

function isFirebaseConfigured() {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
}

function readLocalJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* ignore */
  }
  const seeded = seedJobs.map((j) => ({ ...j }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function notifyAll(jobs) {
  listeners.forEach((fn) => {
    try {
      fn(jobs);
    } catch {
      /* ignore subscriber errors */
    }
  });
}

function writeLocalJobs(jobs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  notifyAll(jobs);
}

async function getFirestoreApi() {
  const [
    { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy },
    { db },
  ] = await Promise.all([import('firebase/firestore'), import('./firebase')]);
  return { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, db };
}

/** Subscribe to jobs. Returns unsubscribe fn. */
export function subscribeJobs(onChange) {
  listeners.add(onChange);

  if (!isFirebaseConfigured()) {
    onChange(readLocalJobs());
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY || e.key === null) onChange(readLocalJobs());
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener('storage', onStorage);
    };
  }

  let unsubFs = () => {};
  let cancelled = false;

  getFirestoreApi()
    .then(({ collection, onSnapshot, query, orderBy, db }) => {
      if (cancelled || !db) {
        onChange(readLocalJobs());
        return;
      }
      const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      unsubFs = onSnapshot(
        q,
        (snap) => {
          const jobs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          notifyAll(jobs);
        },
        () => onChange(readLocalJobs())
      );
    })
    .catch(() => onChange(readLocalJobs()));

  return () => {
    cancelled = true;
    listeners.delete(onChange);
    unsubFs();
  };
}

export async function addJob(job) {
  const payload = {
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

  if (isFirebaseConfigured()) {
    try {
      const { collection, addDoc, db } = await getFirestoreApi();
      if (db) {
        const ref = await addDoc(collection(db, 'jobs'), payload);
        return { id: ref.id, ...payload };
      }
    } catch {
      /* fall through to local */
    }
  }

  const next = { id: `job-${Date.now()}`, ...payload };
  writeLocalJobs([next, ...readLocalJobs()]);
  return next;
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
      /* fall through */
    }
  }
  writeLocalJobs(readLocalJobs().filter((j) => j.id !== id));
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
      /* fall through */
    }
  }
  writeLocalJobs(
    readLocalJobs().map((j) => (j.id === id ? { ...j, active } : j))
  );
}

export function getEmployerPassword() {
  return import.meta.env.VITE_EMPLOYER_PASSWORD || 'Salaaroutsourcing@00';
}

export function getEmployerEmail() {
  return import.meta.env.VITE_EMPLOYER_EMAIL || 'employers@goldenrouteoep.com';
}

export { isFirebaseConfigured };
