import { ProjectItem, CreativeDesignItem, PartnerBrand, SkillCategory } from '../types/portfolio';

export const USER_PROFILE = {
  name: 'Xin Yi Leong',
  phone: '+60 11-6410 6487',
  phoneRaw: '601164106487',
  tagline: 'From ideas to content, campaigns and connections.',
  positioning: 'A communication-focused marketing professional with a background in linguistics.',
  subTagline: 'Exploring how communication connects people, builds brands and creates experiences.',
  education: 'Final-year Chinese Language and Linguistics student at Universiti Malaya (UM)',
  location: 'Kuala Lumpur, Malaysia',
  email: 'leongxinyi5@gmail.com',
  linkedin: 'https://www.linkedin.com/in/xinyi-leong-a393a7195/',
  cvLink: '#',
  heroImage: '/src/assets/images/marketing_hero_portrait_1790702788774.jpg',
  aboutBio: [
    "I'm a final-year Chinese Language and Linguistics student at Universiti Malaya, with hands-on experience across Marketing, Employer Branding, Internal Communications and Human Resources.",
    "While my academic background is in linguistics, my experiences have led me to discover a strong interest in how organisations communicate with their people and audiences.",
    "During my HR internship at Mercedes-Benz Malaysia, I had the opportunity to work beyond traditional HR administration. I supported internal marketing and communications, produced employee-facing videos and podcast content, contributed to LinkedIn employer branding, and supported social media content creation.",
    "I also had the opportunity to work with external stakeholders and partners, including AirAsia, Sony, Gamuda, Sunway and Ogawa, to explore and coordinate employee perks and partnerships.",
    "What I enjoy most is being involved from idea → communication → execution → outcome."
  ],
  narrativeSteps: [
    {
      title: 'Linguistics',
      subtitle: 'Understanding language, semiotics & cultural audience nuances',
      icon: 'BookOpen'
    },
    {
      title: 'Marketing Experience',
      subtitle: 'Translating insights into compelling content & storytelling',
      icon: 'Sparkles'
    },
    {
      title: 'HR & Employer Branding',
      subtitle: 'Building internal community, employee voice & cultural pride',
      icon: 'Users'
    },
    {
      title: 'Stakeholder Management',
      subtitle: 'Coordinating external corporate partnerships & tangible perks',
      icon: 'Handshake'
    }
  ],
  whatIBring: [
    {
      icon: '🎬',
      title: 'Content Creation',
      description: 'Short-form videos, Reels, podcast production, video editing and social media content.'
    },
    {
      icon: '📣',
      title: 'Marketing & Employer Branding',
      description: 'LinkedIn content, employer branding, recruitment marketing and employee communications.'
    },
    {
      icon: '🤝',
      title: 'Stakeholder Management',
      description: 'External partnership communication, coordination and relationship management.'
    },
    {
      icon: '🔎',
      title: 'Communication & Research',
      description: 'Linguistic research, audience understanding, content development and structured communication.'
    }
  ]
};

export const HIGHLIGHT_STATS = [
  {
    value: '56K → 77K',
    label: 'LinkedIn Follower Growth',
    context: 'Contributed during Mercedes-Benz Malaysia internship period',
    metricType: 'growth'
  },
  {
    value: '30K+',
    label: 'Xiaohongshu Video Views',
    context: 'Internship recruitment social campaign post',
    metricType: 'reach'
  },
  {
    value: '5+ Brands',
    label: 'External Partnerships',
    context: 'AirAsia, Sony, Gamuda, Sunway & Ogawa employee perks',
    metricType: 'partnerships'
  },
  {
    value: 'End-to-End',
    label: 'Execution Lifecycle',
    context: 'Idea → Communication → Execution → Outcome',
    metricType: 'execution'
  }
];

export const WORK_PROJECTS: ProjectItem[] = [
  // 01 — SHORT-FORM & SOCIAL CONTENT
  {
    id: 'xhs-internship-recruitment',
    category: '01 — SHORT-FORM & SOCIAL CONTENT',
    categoryShort: 'Short-form & Social',
    title: 'Internship Recruitment — Xiaohongshu (小红书)',
    subtitle: 'Driving Gen-Z student talent awareness with relatable peer storytelling',
    company: 'Mercedes-Benz Malaysia',
    objective: 'Create engaging content to increase awareness of internship opportunities and showcase the authentic employee/intern experience.',
    roleList: [
      'Content ideation & viral hook structuring',
      'Copywriting & bilingual caption formulation',
      'On-camera direction & content creation',
      'Video editing with pacing, captions & sound effects',
      'Social media execution & community engagement'
    ],
    resultMetric: '30K+ Views',
    resultDescription: 'Organic student reach across university networks, generating substantial inbound candidate inquiries and elevating brand affinity.',
    heroImage: '/src/assets/images/regenerated_image_1790766184377.png',
    mediaType: 'video',
    videoDuration: '0:58',
    keyHighlights: [
      'Pitched a casual "Day in the Life of a Mercedes-Benz Intern" video format',
      'Broke down corporate intimidation into approachable office perks & mentor support',
      'Achieved viral engagement in Malaysian tertiary student communities'
    ],
    fullNarrative: [
      'Recognizing that traditional corporate recruitment ads fail to resonate with Gen-Z undergraduates, I pitched a video concept specifically tailored to Xiaohongshu (小红书) algorithms and visual pacing.',
      'I coordinated with fellow interns, scripted engaging hooks addressing common internship questions (culture, real responsibilities, stipend, daily coffee runs), and shot on-location footage across the Mercedes-Benz Malaysia office.',
      'The video surpassed 30,000 views within days of posting, driving high-intent candidate comments and resume submissions.'
    ]
  },
  {
    id: 'mysoftware-solutions-video',
    category: '01 — SHORT-FORM & SOCIAL CONTENT',
    categoryShort: 'Short-form & Social',
    title: 'Mysoftware Solutions',
    subtitle: 'Dynamic digital content and video production driving brand awareness and user engagement',
    company: 'Mysoftware Solutions',
    objective: 'Create engaging digital video and social media content to boost brand visibility, showcase software solutions, and drive audience engagement.',
    roleList: [
      'Content ideation & video pacing',
      'Video editing & visual motion design',
      'Copywriting & social caption formulation',
      'Digital distribution & audience engagement'
    ],
    resultMetric: '23K Views',
    resultDescription: 'Achieved over 23,000 views and strong organic interaction across digital media channels.',
    heroImage: '/src/assets/images/regenerated_image_1790753111160.png',
    mediaType: 'video',
    videoDuration: '1:15',
    keyHighlights: [
      'Achieved 23,000+ organic video views across social platforms',
      'Structured compelling visual hooks tailored for modern audience retention',
      'Delivered high-retention video storytelling for technology solutions'
    ],
    fullNarrative: [
      'Developed creative video content for Mysoftware Solutions, focusing on approachable storytelling and high visual impact.',
      'Handled end-to-end creative direction, video editing, on-screen motion typography, and social copy distribution.',
      'The campaign successfully accumulated over 23,000 views, significantly amplifying brand reach and client inquiries.'
    ]
  },

  // 02 — PODCAST & VIDEO PRODUCTION
  {
    id: 'podcast-episode-01',
    category: '02 — PODCAST & VIDEO PRODUCTION',
    categoryShort: 'Podcast & Video',
    title: 'Podcast Episode 01: Voices of Growth — The Intern Journey',
    subtitle: 'An intimate, studio-quality conversation on entering the automotive industry',
    company: 'Mercedes-Benz Malaysia',
    objective: 'Create an engaging conversational audio-visual medium to inspire prospective interns and build authentic internal cultural connection.',
    roleList: [
      'Video production & studio setup',
      'Video editing & audio track mastering',
      'Content coordination & interview prompt formulation',
      'Visual/audio branding assets preparation',
      'Stakeholder & speaker coordination'
    ],
    resultMetric: 'Flagship Internal Series',
    resultDescription: 'Successfully launched the inaugural internal video podcast episode with strong internal viewership and positive executive feedback.',
    heroImage: '/src/assets/images/regenerated_image_1790753251891.png',
    mediaType: 'podcast',
    episodeNumber: 'EP 01',
    videoDuration: '18:42',
    keyHighlights: [
      'Proved that internal communications can move beyond static PDFs to broadcast video podcasts',
      'Managed audio leveling, B-roll insertions, and teaser reels for social distribution',
      'Comfortably guided guest speakers through relaxed, structured conversational cues'
    ],
    fullNarrative: [
      'This project demonstrated that internal communications could feel like a top-tier podcast rather than a dry administrative memo.',
      'I managed the entire production pipeline: preparing the studio microphones, structuring discussion questions that felt natural yet goal-aligned, recording dual camera angles, and editing the final cut with clean title cards and captions in CapCut.',
      'The episode gave interns a proud piece of content to share with their networks, directly amplifying the employer brand.'
    ]
  },
  {
    id: 'podcast-episode-02',
    category: '02 — PODCAST & VIDEO PRODUCTION',
    categoryShort: 'Podcast & Video',
    title: 'Podcast Episode 02: Career Crossroads & Mentorship Dynamics',
    subtitle: 'Exploring how senior leaders mentor emerging professionals within multinational teams',
    company: 'Mercedes-Benz Malaysia',
    objective: 'Bridge communication between senior executive mentors and emerging early-career talent through relaxed storytelling.',
    roleList: [
      'End-to-end video production',
      'Multi-track audio editing & noise reduction',
      'Speaker briefing & question guideline formulation',
      'Social media teaser clip cutdowns'
    ],
    resultMetric: 'High Employee Engagement',
    resultDescription: 'Distributed across internal channels and featured in departmental all-hands meetings as a prime example of employee voice.',
    heroImage: '/src/assets/images/regenerated_image_1790753395253.png',
    mediaType: 'podcast',
    episodeNumber: 'EP 02',
    videoDuration: '22:15',
    keyHighlights: [
      'Extracted candid advice on resilience, workplace communication, and intercultural collaboration',
      'Produced 3 vertical short-form teaser reels for social sharing',
      'Established a repeatable podcast production SOP for future interns'
    ],
    fullNarrative: [
      'Following the success of Episode 01, Episode 02 tackled deeper career development questions. I worked closely with department leads to ensure questions touched on practical workplace wisdom.',
      'I coordinated filming schedules around busy leadership calendars, engineered clean audio, and created dynamic 30-second teaser cuts with bold subtitles that drove high open rates when emailed in company newsletters.'
    ]
  },

  // 03 — CAMPAIGN & PROJECT LAUNCHES
  {
    id: 'campaign-launch-activation',
    category: '03 — CAMPAIGN & PROJECT LAUNCHES',
    categoryShort: 'Campaign & Activation',
    title: 'Project Launch & Ceremony Activation Video',
    subtitle: 'Building anticipation and emotional resonance for landmark internal milestones',
    company: 'Mercedes-Benz Malaysia',
    objective: 'Developed a launch concept and supporting video content to create anticipation and engagement around the project launch.',
    roleList: [
      'Concept development & visual storyboard design',
      'Content planning & script drafting',
      'Video production & on-site camera coordination',
      'Motion graphics pacing & music synchronization',
      'Cross-departmental stakeholder coordination'
    ],
    resultMetric: 'Mainstage Activation',
    resultDescription: 'Played as the official curtain-raiser video during the ceremony, successfully capturing audience focus and energizing attendees.',
    heroImage: '/src/assets/images/regenerated_image_1790753475895.png',
    mediaType: 'campaign',
    videoDuration: '2:10',
    keyHighlights: [
      'Turned abstract operational milestones into a cinematic, inspiring story',
      'Coordinated with event organizers, technical AV crew, and leadership speakers',
      'Created behind-the-scenes teasers leading up to launch day'
    ],
    fullNarrative: [
      'Rather than relying on typical corporate PowerPoint slides, I proposed creating a dynamic, high-energy launch video to serve as the ceremony opening gimmick.',
      'I developed the storyboard, drafted a script emphasizing unity and future vision, and synced fast-paced cuts to an orchestral electronic soundtrack.',
      'The launch video established the tone for the event, receiving enthusiastic applause from department leaders and employees alike.'
    ]
  }
];

export const CREATIVE_GALLERY_ITEMS: CreativeDesignItem[] = [
  {
    id: 'poster-1',
    title: 'Poster 01: Internship Recruitment & Social Callout',
    type: 'Poster Design',
    image: '/src/assets/images/xhs_recruitment_cover_1790748062108.jpg',
    dimensions: '1080 x 1350 (Portrait)',
    purpose: 'Recruitment Marketing',
    description: 'Bilingual typography combining modern aesthetics with corporate prestige to attract young university talent.'
  },
  {
    id: 'poster-2',
    title: 'Poster 02: Voices of Mobility Audio & Podcast Artwork',
    type: 'Media & Event Branding',
    image: '/src/assets/images/podcast_production_setup_1790748074103.jpg',
    dimensions: '3000 x 3000 (Square / High-Res)',
    purpose: 'Internal Media Branding',
    description: 'Clean minimalist audio branding layout with soundwave motif and corporate typography hierarchy.'
  },
  {
    id: 'poster-3',
    title: 'Poster 03: Project Launch & Event Ceremony Stage Visual',
    type: 'Ceremony Stage Visual',
    image: '/src/assets/images/campaign_launch_stage_1790748087006.jpg',
    dimensions: '1920 x 1080 (Landscape)',
    purpose: 'Event Activation',
    description: 'Dynamic gradient backdrop designed for wide-format LED stage screens with high contrast for venue lighting.'
  }
];

export const PARTNER_BRANDS: PartnerBrand[] = [
  {
    name: 'AirAsia',
    category: 'Aviation & Travel',
    benefit: 'Employee Travel Privileges & Flight Perks',
    tagline: 'Coordinated corporate travel deals and lifestyle holiday offerings for staff.'
  },
  {
    name: 'Sony',
    category: 'Consumer Electronics & Audio',
    benefit: 'Exclusive Staff Tech & Audio Device Discounts',
    tagline: 'Facilitated premium noise-canceling headphones & home audio partnership.'
  },
  {
    name: 'Gamuda',
    category: 'Infrastructure & Township Lifestyle',
    benefit: 'Residential Perks & Community Privileges',
    tagline: 'Liaised with community managers for corporate wellness and club access.'
  },
  {
    name: 'Sunway',
    category: 'Hospitality & Theme Parks',
    benefit: 'Hospitality, Resort & Lagoon Day Pass Deals',
    tagline: 'Arranged family entertainment discounts and hotel staycation rates.'
  },
  {
    name: 'Ogawa',
    category: 'Health & Wellness',
    benefit: 'Wellness Massagers & Ergonomic Relaxation Perks',
    tagline: 'Coordinated ergonomic work-from-home wellness packages and office demo units.'
  }
];

export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    category: 'MARKETING',
    skills: [
      'Content Marketing',
      'Employer Branding',
      'Social Media Marketing',
      'Campaign Support',
      'Recruitment Marketing'
    ]
  },
  {
    category: 'CONTENT',
    skills: [
      'Short-form Video',
      'Reels & TikTok Pacing',
      'Podcast Production',
      'Video Editing',
      'Copywriting',
      'Visual Content'
    ]
  },
  {
    category: 'COMMUNICATION',
    skills: [
      'Stakeholder Management',
      'External Partnerships',
      'Internal Communications',
      'Event Coordination',
      'Audience Empathy'
    ]
  },
  {
    category: 'TOOLS',
    skills: [
      'Canva',
      'CapCut',
      'PowerPoint',
      'Excel',
      'SAP',
      'Microsoft Office'
    ]
  }
];
