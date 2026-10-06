// Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
// Site-wide settings. Change contact details here and every page follows.

export const SITE = {
  name: 'Bates AV',
  domain: 'batesav.com',
  url: 'https://batesav.com',
  tagline: 'Great sound in the room, and a recording worth keeping.',
  description:
    'Bates AV is a live sound, event recording and audio broadcast company in the Tri-Cities, Washington, for churches, conferences, concerts and memorials. Video, livestreaming and full event production are coming soon.',
  // batesav.com has no mailbox yet, so inquiries go to the BatesAI help inbox.
  // When a batesav.com address exists, change it here.
  email: 'help@batesai.org',
  emailSubject: 'Bates AV event inquiry',
  region: 'Tri-Cities, Washington',
  owner: 'Daniel Bates',
  company: 'Bates LLC',
  github: 'https://github.com/danielalanbates',
  // Daniel asked for "linkedin.com/danielalanbates"; profile URLs use /in/.
  linkedin: 'https://www.linkedin.com/in/danielalanbates',
  sister: { name: 'BatesAI', url: 'https://batesai.org' },
};

export const mailto = (subject = SITE.emailSubject) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
