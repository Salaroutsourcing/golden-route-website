/** Pure helpers for the shared jobs list. */

export function sortJobs(jobs) {
  return [...jobs].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function isJobRecord(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.id === 'string' &&
      value.id &&
      typeof value.title === 'string' &&
      value.title.trim()
  );
}

/**
 * Jobs created on one computer before the shared list existed.
 * Seed cards are skipped so a visitor's first-run copy cannot
 * put sample roles back after they were removed.
 */
export function mergeUnsyncedJobs(localJobs, remoteJobs, seedIds) {
  const remoteIds = new Set(remoteJobs.map((job) => job.id));
  const extras = localJobs.filter(
    (job) => isJobRecord(job) && !seedIds.has(job.id) && !remoteIds.has(job.id)
  );
  return sortJobs([...extras, ...remoteJobs.filter(isJobRecord)]);
}
