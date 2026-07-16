// ==========================================================================
// SAMPLE / FALLBACK OPEN POSITIONS — used when Firebase is not configured.
// Employer portal can also persist edits to localStorage.
// ==========================================================================

export const seedJobs = [
  {
    id: 'job-driver-ksa',
    title: 'Heavy Vehicle Driver',
    trade: 'Transportation',
    country: 'Saudi Arabia',
    countryCode: 'sa',
    salaryNote: 'Competitive Gulf package + accommodation',
    active: true,
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'job-welder-uae',
    title: 'Structural Welder (6G)',
    trade: 'Welding',
    country: 'UAE',
    countryCode: 'ae',
    salaryNote: 'Tax-free salary · overtime available',
    active: true,
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'job-mason-qa',
    title: 'Mason / Block Layer',
    trade: 'Construction',
    country: 'Qatar',
    countryCode: 'qa',
    salaryNote: 'Project-based · food & lodging',
    active: true,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'job-rig-oman',
    title: 'Oilfield Roustabout',
    trade: 'Oil & Gas',
    country: 'Oman',
    countryCode: 'om',
    salaryNote: 'Rotational roster · HSE certified preferred',
    active: true,
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'job-elec-kw',
    title: 'Industrial Electrician',
    trade: 'Electrical',
    country: 'Kuwait',
    countryCode: 'kw',
    salaryNote: 'Plant maintenance · overtime',
    active: true,
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'job-cook-bh',
    title: 'Hotel Kitchen Staff',
    trade: 'Hospitality',
    country: 'Bahrain',
    countryCode: 'bh',
    salaryNote: 'Staff accommodation included',
    active: true,
    createdAt: Date.now() - 86400000 * 4,
  },
];
