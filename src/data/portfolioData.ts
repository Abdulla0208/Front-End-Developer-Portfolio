export interface QualityItem {
  number: string;
  title: string;
  description: string;
}

export interface EducationItem {
  number: string;
  period: string;
  degree: string;
  institution: string;
  focus: string;
  highlights: string[];
}

export type TechCategory = 'all' | 'frontend' | 'ecosystem' | 'tooling';

export interface TechItem {
  id: string;
  name: string;
  category: Exclude<TechCategory, 'all'>;
  role: string;
  summary: string;
  usedIn: string[];
}

export interface SkillGroup {
  number: string;
  title: string;
  skills: string[];
}

export type ProjectFilterCategory = 'all' | 'production' | 'web-app' | 'open-source';

export interface ProjectBlueprintNode {
  step: string;
  module: string;
  detail: string;
}

export interface ProjectEngineeringDecision {
  title: string;
  rationale: string;
}

export interface ProjectItem {
  number: string;
  slug: string;
  name: string;
  category: string;
  schematicLabel: string;
  filterTags: Exclude<ProjectFilterCategory, 'all'>[];
  year: string;
  status: string;
  role: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  impactMetrics: { label: string; value: string }[];
  highlights: string[];
  blueprintNodes: ProjectBlueprintNode[];
  engineeringDecisions: ProjectEngineeringDecision[];
  architectureNote: string;
  liveLink: string | null;
  githubLink: string;
}

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const qualities: QualityItem[] = [
  {
    number: '01',
    title: 'Curious',
    description:
      'Always dissecting how interfaces behave under the hood — from CSS layout engines to React state lifecycles.',
  },
  {
    number: '02',
    title: 'Persistent',
    description:
      'Refining edge cases, responsive breakpoints, and interaction details until every viewport feels effortless.',
  },
  {
    number: '03',
    title: 'Creative',
    description:
      'Pairing architectural typography with modern frontend engineering to craft memorable digital products.',
  },
];

export const educationMilestones: EducationItem[] = [
  {
    number: '01',
    period: '2021 — 2025',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science',
    institution: 'Computer Science & Engineering',
    focus: 'Data Structures, Web Systems, Software Architecture & UI Engineering',
    highlights: [
      'Engineered production-grade client applications using React, Next.js, and TypeScript.',
      'Focused on responsive UI architecture, semantic accessibility, and predictable state design.',
    ],
  },
  {
    number: '02',
    period: '2024 — Present',
    degree: 'Independent Frontend Engineering & Product Design',
    institution: 'Real-World Client & Open-Source Delivery',
    focus: 'Design Systems, Motion Choreography, Performance & Mobile-First Interfaces',
    highlights: [
      'Shipped live commercial web presence for Al Farah Car Wash in Dubai.',
      'Architected interactive multi-route e-commerce ordering flows with React Router and Context API.',
    ],
  },
];

export const techStack: TechItem[] = [
  {
    id: 'react',
    name: 'React',
    category: 'ecosystem',
    role: 'Component Architecture',
    summary:
      'Building modular, composable interfaces with custom hooks, clean state boundaries, and responsive rendering.',
    usedIn: ['Al Farah Car Wash', 'Pizzeria Ordering App'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'ecosystem',
    role: 'Production Web Framework',
    summary:
      'Delivering fast, SEO-ready commercial websites with optimized image delivery and structured App Router pages.',
    usedIn: ['Al Farah Car Wash'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    role: 'Type-Safe Engineering',
    summary:
      'Enforcing strict component contracts and predictable data shapes across UI components and state stores.',
    usedIn: ['Al Farah Car Wash', 'Portfolio'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    role: 'Core Web Runtime (ES6+)',
    summary:
      'Asynchronous data handling, DOM mastery, functional array pipelines, and clean modular business logic.',
    usedIn: ['Pizzeria Ordering App', 'Al Farah Car Wash'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    role: 'Design Token Styling',
    summary:
      'Crafting responsive mobile-first layouts, dual-theme systems, and precision spacing scales without CSS bloat.',
    usedIn: ['Al Farah Car Wash', 'Portfolio'],
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    role: 'Semantic Markup',
    summary:
      'Accessible landmarks, clean document outlines, and search-engine friendly structural hierarchy.',
    usedIn: ['Al Farah Car Wash', 'Pizzeria Ordering App'],
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    role: 'Layout & Visual Craft',
    summary:
      'Fluid clamp typography, CSS Grid compositions, custom properties, and GPU-composited transitions.',
    usedIn: ['Pizzeria Ordering App', 'Portfolio'],
  },
  {
    id: 'router',
    name: 'React Router',
    category: 'ecosystem',
    role: 'Client Navigation',
    summary:
      'Seamless multi-view SPA routing, dynamic menu navigation, and structured checkout journeys.',
    usedIn: ['Pizzeria Ordering App'],
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'tooling',
    role: 'Next-Gen Build Tooling',
    summary:
      'Instant dev feedback loops, lean ES module bundling, and fast production asset pipelines.',
    usedIn: ['Portfolio', 'Pizzeria Ordering App'],
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tooling',
    role: 'Version Control & Shipping',
    summary:
      'Clean commit history, feature branching, and collaborative open-source repository management.',
    usedIn: ['All Projects'],
  },
  {
    id: 'rest',
    name: 'REST APIs',
    category: 'ecosystem',
    role: 'Data & Integration',
    summary:
      'Fetch pipelines, loading/error resilience, and clean separation between API responses and UI models.',
    usedIn: ['Pizzeria Ordering App'],
  },
  {
    id: 'python',
    name: 'Python & Java',
    category: 'tooling',
    role: 'B.Tech CS Foundations',
    summary:
      'Strong algorithmic thinking, object-oriented design patterns, and problem-solving fundamentals.',
    usedIn: ['Computer Science Core'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    number: '01',
    title: 'Frontend Development',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'],
  },
  {
    number: '02',
    title: 'React Ecosystem',
    skills: ['React.js', 'Next.js', 'React Hooks', 'React Router', 'Context API'],
  },
  {
    number: '03',
    title: 'Styling & Motion',
    skills: ['Tailwind CSS', 'Framer Motion', 'Responsive Grid', 'Bootstrap'],
  },
  {
    number: '04',
    title: 'API & State',
    skills: ['Fetch API', 'REST APIs', 'Client State Architecture'],
  },
  {
    number: '05',
    title: 'Tooling & Foundations',
    skills: ['Git', 'GitHub', 'Vite', 'Python', 'Java'],
  },
];

export const projects: ProjectItem[] = [
  {
    number: '01',
    slug: 'al-farah-car-wash',
    name: 'Al Farah Car Wash',
    category: 'Commercial Web Platform',
    schematicLabel: 'Next.js Web Architecture',
    filterTags: ['production', 'web-app'],
    year: '2025',
    status: 'Live Production',
    role: 'Sole Frontend Engineer & UI Designer',
    summary:
      'Commercial mobile car-detailing platform engineered for rapid customer booking across Dubai.',
    description:
      'Independently designed and developed a responsive commercial web application for Al Farah Car Wash in Dubai, presenting mobile detailing packages, bilingual messaging, and instant booking touchpoints.',
    challenge:
      'On-the-go vehicle owners in Dubai browse almost exclusively on mobile networks and need transparent pricing tiers, Arabic and English trust cues, and a booking trigger within two taps without navigating slow multi-step forms.',
    solution:
      'Built a lean Next.js App Router storefront organized around clear visual hierarchy, bilingual hero lockups, strictly typed service tiers, and direct WhatsApp and phone dispatch links optimized for sub-second mobile load.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    impactMetrics: [
      { label: 'Deployment', value: 'Live Commercial' },
      { label: 'Localization', value: 'EN + AR' },
      { label: 'Layout Target', value: 'Mobile-First' },
    ],
    highlights: [
      'Architected a mobile-first service showcase tailored for on-the-go Dubai customers.',
      'Integrated bilingual English and Arabic hero messaging with direct call and booking actions.',
      'Engineered modular TypeScript service tier components with responsive image optimization.',
    ],
    blueprintNodes: [
      {
        step: '01 · Entry',
        module: 'Next.js App Router',
        detail: 'Static-optimized landing routes with fast mobile hydration and clean SEO metadata.',
      },
      {
        step: '02 · Hero',
        module: 'Bilingual Presentation',
        detail: 'Paired English & Arabic value proposition with immediate booking call-to-action.',
      },
      {
        step: '03 · Catalog',
        module: 'Typed Service Matrix',
        detail: 'Structured Deluxe, Super, and Normal wash tiers via strict TypeScript interfaces.',
      },
      {
        step: '04 · Conversion',
        module: 'Direct Booking Dispatch',
        detail: 'Zero-friction WhatsApp & phone booking triggers tuned for Dubai mobile users.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Strict Package Data Modeling',
        rationale:
          'Modeled Deluxe, Super, and Normal wash tiers as immutable TypeScript records so service updates propagate across comparison cards and CTAs without layout drift.',
      },
      {
        title: 'Direct Messaging Over Heavy Booking Backend',
        rationale:
          'Connected pre-filled WhatsApp and direct-dial dispatch triggers instead of forcing account registration, matching how regional mobile service customers actually convert.',
      },
      {
        title: 'Static Generation & Minimal JS Payload',
        rationale:
          'Kept marketing routes statically rendered via Next.js App Router with Tailwind CSS utilities to guarantee responsive first-paint performance over cellular connections.',
      },
    ],
    architectureNote:
      'Built with Next.js App Router, strict TypeScript interfaces for service packages, and utility-first Tailwind tokens for crisp sub-second rendering across mobile connections.',
    liveLink: 'https://www.alfarahcarwash.ae/',
    githubLink: 'https://github.com/Abdulla0208/al-farah-car-wash',
  },
  {
    number: '02',
    slug: 'pizzeria',
    name: 'Pizzeria Ordering App',
    category: 'Interactive E-Commerce App',
    schematicLabel: 'SPA Commerce Pipeline',
    filterTags: ['web-app', 'open-source'],
    year: '2024',
    status: 'Open Source',
    role: 'Frontend Architect & State Engineer',
    summary:
      'State-driven food ordering interface with real-time pizza customization, cart management, and checkout.',
    description:
      'Developed an interactive food ordering web application where users browse artisan pizzas, customize bases and toppings dynamically, manage quantities in a live cart drawer, and complete checkout.',
    challenge:
      'Customizable food ordering introduces complex client state: identical menu items diverge once crusts and toppings are modified, while cart counts, subtotals, and delivery summaries must remain synchronized across routes.',
    solution:
      'Designed a deterministic reducer-backed React Context store keyed by item configuration signatures, paired with React Router views that keep browsing, topping customization, and checkout validation cohesive.',
    technologies: ['React.js', 'JavaScript', 'React Router', 'Context API', 'CSS3'],
    impactMetrics: [
      { label: 'State Engine', value: 'Context API' },
      { label: 'Routing', value: 'Multi-View SPA' },
      { label: 'Customization', value: 'Live Pricing' },
    ],
    highlights: [
      'Designed dynamic topping customization with real-time subtotal and delivery calculation.',
      'Implemented centralized cart and order state using React Context API and reducer patterns.',
      'Structured seamless multi-page catalog, customization, and checkout flows via React Router.',
    ],
    blueprintNodes: [
      {
        step: '01 · Routing',
        module: 'React Router Views',
        detail: 'Seamless client navigation across menu catalog, customization, and order checkout.',
      },
      {
        step: '02 · Builder',
        module: 'Topping Customizer',
        detail: 'Interactive base, cheese, and topping toggles with deterministic live price updates.',
      },
      {
        step: '03 · Store',
        module: 'Context API Cart',
        detail: 'Centralized cart state synchronized across persistent sidebar and checkout summary.',
      },
      {
        step: '04 · Checkout',
        module: 'Order Validation',
        detail: 'Address, payment method, and real-time subtotal/delivery total computation.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Centralized Context + Reducer Cart Engine',
        rationale:
          'Consolidated add, remove, quantity mutation, and topping price calculations in one pure reducer layer to prevent desynchronized totals between catalog and checkout.',
      },
      {
        title: 'Route-Scoped UI Transitions',
        rationale:
          'Separated catalog filtering, item builder controls, and checkout form validation into dedicated React Router views while sharing persistent cart state.',
      },
      {
        title: 'Derived Pricing Computation',
        rationale:
          'Computed subtotals, taxes, and delivery thresholds directly from cart items on render rather than duplicating mutable total state.',
      },
    ],
    architectureNote:
      'Decoupled product catalog, cart state transitions, and route views so pricing calculations and item mutations stay deterministic across every step of checkout.',
    liveLink: null,
    githubLink: 'https://github.com/Abdulla0208/PizzeriaApp',
  },
];

export const contactInfo = {
  email: 'abdullashaik0208@gmail.com',
  github: 'https://github.com/Abdulla0208',
  linkedin: 'https://www.linkedin.com/in/shaikabdulla26/',
  instagram: 'https://www.instagram.com/abdulla.shaik26/',
  location: 'Available Worldwide · Remote & On-Site',
};
