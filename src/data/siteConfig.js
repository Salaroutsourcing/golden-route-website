// ==========================================================================
// SITE CONFIG — edit company info, contact details, socials here.
// ==========================================================================

export const siteConfig = {
  companyName: 'Golden Route',
  tagline: 'Overseas Employment Promoters',
  licenseNumber: 'OP&HRD/5296/RWP/2026',
  licenseLabel: 'Licensed by Govt. of Pakistan',
  yearsActive: '6+',
  foundedYear: 2020,

  contact: {
    email: 'cv@goldenrouteoep.com',
    website: 'www.goldenroute.com',
    address: 'Main Murree Road, Bhara Kahu, Islamabad, Pakistan',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Main+Murree+Road+Bhara+Kahu+Islamabad+Pakistan',
    phones: [
      { name: 'Muhammad Asif', role: 'Managing Director', number: '+92 300 1786444' },
    ],
  },

  social: {
    facebook: '#',
    whatsapp: 'https://wa.me/923001786444',
    instagram: '#',
  },

  /** Official Google Form — applications with CV & photo uploads */
  jobPortalUrl: 'https://forms.gle/yHMuBYtunMQZdgWEA',

  /** Shared employer login (override with VITE_EMPLOYER_EMAIL / VITE_EMPLOYER_PASSWORD) */
  employerEmail: 'employers@goldenrouteoep.com',

  team: [
    {
      name: 'Muhammad Asif',
      role: 'Managing Director',
      phone: '+92 300 1786444',
    },
  ],

  gulfCountries: [
    { code: 'sa', name: 'Saudi Arabia', nameAr: 'السعودية' },
    { code: 'ae', name: 'UAE', nameAr: 'الإمارات' },
    { code: 'qa', name: 'Qatar', nameAr: 'قطر' },
    { code: 'kw', name: 'Kuwait', nameAr: 'الكويت' },
    { code: 'bh', name: 'Bahrain', nameAr: 'البحرين' },
    { code: 'om', name: 'Oman', nameAr: 'عُمان' },
  ],

  seo: {
    title: 'Golden Route | Overseas Employment Promoters | Islamabad',
    description:
      'Licensed manpower export agency placing Pakistani workers in Saudi Arabia, UAE, Qatar, Kuwait, Bahrain and Oman. License OP&HRD/5296/RWP/2026.',
  },
};
