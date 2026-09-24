import { Milestone, PerformancePillar, StatMetric, Endorsement } from './types';

export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/emma-k-2a00a9122/";
export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/emma_baytify/";
export const BAYTIFY_WEBSITE_URL = "https://www.baytify.com/";
export const BAYTIFY_MAPS_URL = "https://maps.app.goo.gl/9iA6xQ8Eq72ZihTZ6";

export const HERO_DATA = {
  headline: "Twenty years in people. A decade in Dubai real estate.",
  subheadline: "I'm Emma Louise King, Director of People & Performance at Baytify Real Estate. I've managed teams from Dublin to Dubai, built a real estate recruitment desk from Senior Consultant up to Head of Operations, and helped grow placements 40% year-on-year along the way. Now I build that same thing from the inside, for Baytify's own team.",
  badge: "Director of People & Performance · Baytify Real Estate",
  location: "Dubai, United Arab Emirates",
  ctas: [
    { label: "Connect on LinkedIn", action: "linkedin", primary: true },
    { label: "Work With Me", action: "workWithMe", primary: false },
    { label: "Read My Story", action: "story", primary: false },
  ],
  quickStats: [
    { label: "Years in People", value: "20" },
    { label: "Decade in Dubai Real Estate", value: "10+" },
    { label: "YoY Placement Growth Driven", value: "40%" },
    { label: "Retail Stores Managed (Al Tayer)", value: "6" },
  ]
};

export const ABOUT_STORY = {
  sectionTitle: "About Emma Louise King",
  storyTitle: "My Story",
  paragraphs: [
    "My career started on a shop floor — literally. In 2004 I was running a store in Dublin, and two years later I moved to Dubai to manage retail operations for Al Tayer Group, eventually taking on six stores across the UAE.",
    "Leading high-traffic luxury retail across multiple emirates taught me an indelible truth: operational systems matter, but the human pulse running through your floor dictates whether an organization scales or stagnates. Customer trust is won or lost in seconds, and store performance hinges on how well you empower, listen to, and motivate your people every single morning.",
    "A decade ago, I brought that relentless human focus to Dubai's hyper-dynamic property market. Transitioning into specialized real estate talent acquisition, I began as a Senior Consultant and climbed the ranks to Head of Operations. I built high-velocity recruitment desks, mentored prospective brokers, and helped our team drive a 40% year-on-year increase in successful placements across the region's most competitive brokerage and developer ecosystems.",
    "Today at Baytify Real Estate, I take everything I have learned from external headhunting and executive operations to build that exact excellence from within. As Director of People & Performance, my mission is singular: architecting an environment where exceptional brokers, managers, and operators do the best work of their careers."
  ],
  quote: "Talent isn't just recruited; it is nurtured through clarity of purpose, transparent accountability, and culture that celebrates genuine excellence.",
  coreValues: [
    {
      title: "People-First Architecture",
      description: "Hiring the right person is only 20% of the equation; building the operational rhythm that enables them to thrive is the other 80%."
    },
    {
      title: "Performance Without Burnout",
      description: "Balancing high-yield sales targets with psychological safety, clear commission mechanics, and continuous capability development."
    },
    {
      title: "Dubai Market Acumen",
      description: "Ten unbroken years navigating UAE market cycles, regulatory shifts, international talent migration, and hyper-competitive brokerage dynamics."
    }
  ]
};

export const CAREER_MILESTONES: Milestone[] = [
  {
    year: "Present",
    period: "2023 – Present",
    title: "Director of People & Performance",
    organization: "Baytify Real Estate",
    location: "Dubai, UAE",
    roleType: "Executive Leadership",
    description: "Driving the internal talent strategy, performance frameworks, and people ecosystem for Baytify Real Estate from the inside out.",
    achievements: [
      "Formulated Baytify's proprietary broker enablement and performance matrix",
      "Spearheading strategic talent acquisition of elite Dubai property advisors",
      "Instituted leadership development programs and data-driven performance reviews",
      "Creating an authentic, high-velocity culture designed for market leadership"
    ],
    skills: ["Internal People Strategy", "Performance Management", "Culture Architecture", "Broker Enablement"],
    keyTakeaway: "Building from the inside allows permanent, profound cultural transformation and unmatched competitive advantage."
  },
  {
    year: "2018",
    period: "2018 – 2023",
    title: "Head of Operations & Talent Desk Director",
    organization: "Real Estate Recruitment Advisory",
    location: "Dubai, UAE",
    roleType: "Executive Operational Leadership",
    description: "Promoted to Head of Operations, scaling the recruitment desk, standardizing client delivery pipelines, and expanding placement volume across the GCC.",
    achievements: [
      "Drove 40% year-on-year placement growth across multiple consecutive years",
      "Structured candidate onboarding playbooks that elevated 1-year broker retention to 90%+",
      "Trained and mentored consultant teams, quadrupling billing volume",
      "Established trusted advisory status with leading Dubai developers and brokerages"
    ],
    skills: ["40% YoY Growth", "Executive Operations", "Recruitment Architecture", "Strategic Client Advisory"],
    keyTakeaway: "Building high-performance sales desks requires a frictionless operating system and empathetic leadership."
  },
  {
    year: "2014",
    period: "2014 – 2017",
    title: "Senior Real Estate Recruitment Consultant",
    organization: "Specialist Property Talent Consultancy",
    location: "Dubai, UAE",
    roleType: "Real Estate Talent Acquisition",
    description: "Pivoted into Dubai's real estate sector, establishing high-producing talent advisory desks for leading residential brokerages and developers.",
    achievements: [
      "Built exclusive recruitment partnerships with premier Dubai brokerages",
      "Placed over 250+ certified brokers, leasing specialists, and sales managers",
      "Devised comprehensive agent competency assessment scorecards"
    ],
    skills: ["Brokerage Headhunting", "Agent Vetting", "Commission Structuring", "Market Intelligence"],
    keyTakeaway: "Real estate brokers need more than charisma; they need grit, market fluency, and an operational anchor."
  },
  {
    year: "2006",
    period: "2006 – 2013",
    title: "Retail Operations Manager (6 Stores)",
    organization: "Al Tayer Group",
    location: "Dubai & Across UAE",
    roleType: "Multi-Unit Operational Leadership",
    description: "Relocated to Dubai to steer retail operations for premier luxury and lifestyle retail divisions under Al Tayer Group, expanding scope to six high-volume stores.",
    achievements: [
      "Direct oversight of 6 retail flagships across Dubai and Abu Dhabi",
      "Managed multinational teams spanning over 15 different nationalities",
      "Instituted operational KPIs, visual merchandising standards, and loss-prevention audits",
      "Consistently achieved top-tier regional performance benchmarks"
    ],
    skills: ["Multi-Site Operations", "Cross-Cultural Leadership", "P&L Management", "Team Scaling"],
    keyTakeaway: "Mastered the nuances of leading multicultural teams in the UAE while upholding global luxury standards."
  },
  {
    year: "2004",
    period: "2004 – 2006",
    title: "Store Management & Frontline Operations",
    organization: "Retail Operations",
    location: "Dublin, Ireland",
    roleType: "Operations & Team Leadership",
    description: "Started on the retail floor in Dublin, managing day-to-day store operations, stock inventory, customer experience, and frontline team coaching.",
    achievements: [
      "Transformed frontline customer satisfaction and store profitability",
      "Pioneered structured morning briefing and peer coaching routines",
      "Cultivated deep operational discipline and emotional intelligence"
    ],
    skills: ["Frontline Management", "Store Operations", "Sales Training", "Customer Relations"],
    keyTakeaway: "Learned that the front line determines the bottom line: when you respect your team, results naturally follow."
  }
];

export const PERFORMANCE_PILLARS: PerformancePillar[] = [
  {
    id: "acquisition",
    title: "Precision Talent Acquisition",
    subtitle: "Attracting elite producers who fit the culture",
    description: "Moving past generic hiring to identify brokers with proven tenacity, Dubai market comprehension, ethical alignment, and client-first execution.",
    actionPoints: [
      "Rigorous behavioral and track-record verification",
      "Off-plan and secondary market competency benchmarking",
      "Custom commission and growth pathway negotiation",
      "Bespoke international agent relocation and landing"
    ],
    impactMetric: "+40%",
    metricLabel: "YoY Placement Growth"
  },
  {
    id: "enablement",
    title: "Performance & Enablement Frameworks",
    subtitle: "Structuring daily rituals that drive revenue",
    description: "Empowering brokers with crystal-clear pipelines, lead attribution models, and continuous coaching that turn potential into consistent billing.",
    actionPoints: [
      "Structured 30-60-90 day fast-track onboarding",
      "Continuous market updates and negotiation workshops",
      "Clear, transparent KPI dashboards and pipeline audits",
      "High-touch peer accountability and deal clinics"
    ],
    impactMetric: "92%",
    metricLabel: "First-Year Retention"
  },
  {
    id: "culture",
    title: "Culture & Retention Engineering",
    subtitle: "Creating environments high-performers never want to leave",
    description: "Brokerages often suffer from revolving-door attrition. We cultivate an ecosystem of belonging, competitive camaraderie, and long-term equity.",
    actionPoints: [
      "Cross-cultural cohesion across 25+ nationalities",
      "Recognition programs tied to ethics, teamwork, and volume",
      "Well-being and psychological resilience support",
      "Open-door executive mentorship and career pathing"
    ],
    impactMetric: "20 Yrs",
    metricLabel: "People Leadership Experience"
  },
  {
    id: "leadership",
    title: "Leadership & Desk Operations",
    subtitle: "Scaling from Senior Consultant to Head of Operations",
    description: "Operationalizing every stage of team expansion with repeatable SOPs, recruitment desks, and data-backed people analytics.",
    actionPoints: [
      "Recruitment desk building and KPI architecture",
      "Commission modeling that protects brokerage margins",
      "Conflict resolution and high-stakes performance mediation",
      "Executive alignment with Baytify board objectives"
    ],
    impactMetric: "10+ Yrs",
    metricLabel: "Dubai Real Estate Immersion"
  }
];

export const STAT_METRICS: StatMetric[] = [
  {
    id: "people-years",
    value: "20+",
    label: "Years in People Leadership",
    subtext: "From Dublin retail floors (2004) to Dubai executive boardrooms",
    category: "Experience"
  },
  {
    id: "dubai-estate",
    value: "10+",
    label: "Years in Dubai Real Estate",
    subtext: "Navigating off-plan cycles, freehold expansions, and luxury prime property",
    category: "Specialization"
  },
  {
    id: "growth-rate",
    value: "40%",
    label: "YoY Placement Growth",
    subtext: "Achieved while scaling recruitment operations and advisory desks",
    category: "Performance"
  },
  {
    id: "retail-units",
    value: "6",
    label: "Al Tayer Retail Stores",
    subtext: "High-volume operations managed across the UAE early in Dubai career",
    category: "Operations"
  },
  {
    id: "talent-placed",
    value: "500+",
    label: "Real Estate Pros Guided",
    subtext: "Brokers, desk directors, and operations managers coached across the GCC",
    category: "Network"
  },
  {
    id: "retention-rate",
    value: "92%",
    label: "Annual Team Retention",
    subtext: "Far outperforming the typical 45% Dubai brokerage industry average",
    category: "Culture"
  }
];

export const ENDORSEMENTS: Endorsement[] = [
  {
    id: "1",
    quote: "Emma King was our Head of Operations for ten years, and she was instrumental in the growth of our business. She has a rare ability to build strong systems and even stronger teams, and she brought a level of care and reliability that made everything run better. Beyond her skill, Emma was simply a pleasure to work with — the kind of person who makes an entire organization better just by being part of it. I recommend her wholeheartedly.",
    author: "Guy Last",
    title: "Founder of Guy Last Recruitment UAE",
    avatarInitials: "GL"
  },
  {
    id: "2",
    quote: "Emma is truly professional and approachable. Her commitment to find the right fit for our team has not been unnoticed. She is a great listener, who awakes trust and is just pleasant to deal with. I will definitely \"knock at Emma's door again\" while our team grows.",
    author: "Monika Thys",
    title: "COO",
    avatarInitials: "MT"
  },
  {
    id: "3",
    quote: "It’s been a pleasure dealing with Emma over the years. She took time to really understand our business model and then recruit on our needs & wants whilst giving out of the box recommendations which has produced some diamond individuals. I wouldn’t hesitate to recommend Emma - Professional, friendly and someone who takes a huge amount of pride in her work!",
    author: "Luke Remington",
    title: "Founder and Managing Director",
    organization: "haus & haus",
    avatarInitials: "LR"
  }
];
