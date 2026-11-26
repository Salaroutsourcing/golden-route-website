import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeUnsyncedJobs, sortJobs } from './jobsMerge.js';

const seeds = new Set(['job-driver-ksa']);

test('uploads only jobs that were created on this computer', () => {
  const remote = [
    { id: 'job-driver-ksa', title: 'Driver', createdAt: 1 },
  ];
  const local = [
    { id: 'job-driver-ksa', title: 'Driver edited locally', createdAt: 1 },
    { id: 'job-1700000000000', title: 'Cook', createdAt: 50 },
  ];

  const merged = mergeUnsyncedJobs(local, remote, seeds);
  assert.deepEqual(
    merged.map((job) => job.id),
    ['job-1700000000000', 'job-driver-ksa']
  );
  assert.equal(merged[1].title, 'Driver');
});

test('does not resurrect a shared job that was deleted', () => {
  const remote = [];
  const local = [{ id: 'job-driver-ksa', title: 'Driver', createdAt: 1 }];
  assert.deepEqual(mergeUnsyncedJobs(local, remote, seeds), []);
});

test('sorts newest jobs first', () => {
  const sorted = sortJobs([
    { id: 'a', title: 'A', createdAt: 1 },
    { id: 'b', title: 'B', createdAt: 9 },
  ]);
  assert.deepEqual(sorted.map((job) => job.id), ['b', 'a']);
});
