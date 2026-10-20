import type { Audience } from './types';

export const EMMA_EMAIL = 'emma@baytify.com';
export const ONE_PAGER_URL = '/emma-king-baytify-introduction.pdf';
export const SITE_URL = 'https://emmalouiseking.com';

// Set VITE_CALENDLY_URL in Vercel to switch the booking widget on.
// Until then, "Book a call" falls back to a prefilled email.
export const CALENDLY_URL: string = import.meta.env.VITE_CALENDLY_URL || '';

export interface AudienceTrack {
  id: Exclude<Audience, 'other' | 'candidate'>;
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  offers: { title: string; desc: string }[];
  interests: string[];
}

export const AUDIENCE_TRACKS: AudienceTrack[] = [
  {
    id: 'corporate',
    label: 'Corporate HR & Mobility',
    eyebrow: 'For HR, talent & mobility teams',
    title: 'Relocating people to Dubai, handled with one point of contact',
    intro:
      'When your people move to Dubai, housing is the first thing they ask about. Baytify gives your HR team one trusted contact for incoming staff and leadership, so relocations land smoothly and nobody is left navigating the market alone.',
    offers: [
      { title: 'Housing for incoming staff', desc: 'Rental search, viewings and lease support for new joiners and their families.' },
      { title: 'Leadership property advisory', desc: 'Buying and investment guidance for senior hires, including Golden Visa-eligible property.' },
      { title: 'Market briefings for HR', desc: 'Short, factual sessions on rents, communities and costs to inform packages and offers.' },
      { title: 'A single, accountable contact', desc: 'Emma coordinates with Baytify’s advisors so your team has one relationship to manage.' },
    ],
    interests: ['Housing for relocating staff', 'Leadership property advisory', 'HR market briefing', 'Something else'],
  },
  {
    id: 'developer',
    label: 'Developers',
    eyebrow: 'For developers & project teams',
    title: 'Trained, accountable sales teams for your launches',
    intro:
      'Emma has spent a decade building real estate sales desks in Dubai. Baytify brings that discipline to distributing your projects: advisors who are onboarded properly, know the product and are measured on quality as well as volume.',
    offers: [
      { title: 'Launch-ready advisors', desc: 'Project briefings and product training before your launch, not after it.' },
      { title: 'Structured performance', desc: 'Clear KPIs and pipeline reviews so you get visibility, not just promises.' },
      { title: 'Local and international reach', desc: 'Baytify’s Dubai team plus Baytify Global’s investor network.' },
      { title: 'People-first partnership', desc: 'A direct line to the person responsible for the team selling your stock.' },
    ],
    interests: ['Project distribution', 'Launch sales support', 'Advisor training on our product', 'Something else'],
  },
  {
    id: 'brokerage',
    label: 'Brokerages & Industry',
    eyebrow: 'For brokerages, recruiters & industry peers',
    title: 'Collaboration that raises the standard of the market',
    intro:
      'Emma has worked with many of Dubai’s brokerages over the years, from both sides of the hiring table. She is open to co-broking, referral arrangements and conversations about how the industry hires, trains and keeps good people.',
    offers: [
      { title: 'Co-broking & referrals', desc: 'Clear, fair arrangements on shared clients and listings.' },
      { title: 'Talent & people practice', desc: 'Exchanging ideas on onboarding, retention and broker development.' },
      { title: 'Speaking & panels', desc: 'Industry events, podcasts and panels on people and performance.' },
      { title: 'Recruitment partners', desc: 'Working with specialist recruiters on senior and specialist roles.' },
    ],
    interests: ['Co-broking / referral', 'Speaking or panel invitation', 'Recruitment partnership', 'Something else'],
  },
];

export const CANDIDATE_PROMISE = [
  { title: 'A real conversation first', desc: 'Applications come straight to Emma, not into an anonymous inbox.' },
  { title: '30-60-90 day onboarding', desc: 'A structured first three months so you are productive, not just busy.' },
  { title: 'Clear commission mechanics', desc: 'You will know exactly how you are paid before you sign anything.' },
  { title: 'Confidential by default', desc: 'If you are currently employed, your enquiry stays between you and Emma.' },
];
