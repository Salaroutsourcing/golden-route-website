// ==========================================================================
// Jobs store — Firestore when configured, otherwise localStorage + seed data.
// ==========================================================================

import { seedJobs } from '../data/jobs';

const STORAGE_KEY = 'golden-route-jobs';
const EVENT_NAME = 'golden-route-jobs-updated';

function isFirebaseConfigured() {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
}

function readLocalJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedJobs));
  return [...seedJobs];
}

function writeLocalJobs(jobs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
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
  if (!isFirebaseConfigured()) {
    const emit = () => onChange(readLocalJobs());
    emit();
    window.addEventListener(EVENT_NAME, emit);
    window.addEventListener('storage', emit);
    return () => {
      window.removeEventListener(EVENT_NAME, emit);
      window.removeEventListener('storage', emit);
    };
  }

  let unsub = () => {};
  let cancelled = false;

  getFirestoreApi()
    .then(({ collection, onSnapshot, query, orderBy, db }) => {
      if (cancelled || !db) {
        onChange(readLocalJobs());
        return;
      }
      const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      unsub = onSnapshot(
        q,
        (snap) => {
          onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        },
        () => onChange(readLocalJobs())
      );
    })
    .catch(() => onChange(readLocalJobs()));

  return () => {
    cancelled = true;
    unsub();
  };
}

export async function addJob(job) {
  const payload = {
    title: job.title,
    trade: job.trade,
    country: job.country,
    countryCode: job.countryCode,
    salaryNote: job.salaryNote || '',
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
