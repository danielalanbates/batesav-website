// Copyright (c) 2026 Daniel Bates / Bates LLC. All rights reserved.
// Site-wide settings. Change contact details here and every page follows.

export const SITE = {
  name: 'Bates AV',
  domain: 'batesav.com',
  url: 'https://batesav.com',
  tagline: 'Live sound, video and presentation systems that just work on Sunday morning.',
  description:
    'Bates AV helps churches and small venues run live sound, livestreams, lighting and ProPresenter with confidence — system planning, setup, troubleshooting and volunteer training.',
  // batesav.com has no mailbox yet, so inquiries go to the BatesAI help inbox.
  // When a batesav.com address exists, change it here.
  email: 'help@batesai.org',
  emailSubject: 'Bates AV inquiry',
  region: 'Tri-Cities, Washington',
  owner: 'Daniel Bates',
  company: 'Bates LLC',
  github: 'https://github.com/danielalanbates',
  sister: { name: 'BatesAI', url: 'https://batesai.org' },
};

export const mailto = (subject = SITE.emailSubject) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
