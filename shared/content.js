/**
 * HornaAI content source.
 *
 * - The frontend uses this as fallback content when the API is unreachable.
 * - The backend seed script (`npm run seed`) loads it into MongoDB.
 * - After seeding, edit content from the Admin dashboard; the site reads it from the API.
 *
 * IMPORTANT: Everything flagged `isPlaceholder` / `isSample` is example content.
 * Replace it with real, verified information before launch. Do not present it as fact.
 */

export const site = {
  name: 'HornaAI',
  tagline: 'Building digital solutions and empowering the next generation of technology professionals.',
  email: 'hello@hornaai.com',
  phone: '+252 XXX XXX XXX',
  location: 'Somalia',
  socials: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    x: '#',
    youtube: '#',
  },
};

export const stats = [
  { key: 'projects', label: 'Projects Delivered', value: 25, suffix: '+', order: 1, isPlaceholder: true },
  { key: 'students', label: 'Students Trained', value: 500, suffix: '+', order: 2, isPlaceholder: true },
  { key: 'programs', label: 'Training Programs', value: 10, suffix: '+', order: 3, isPlaceholder: true },
  { key: 'solutions', label: 'Technology Solutions', value: 15, suffix: '+', order: 4, isPlaceholder: true },
];

export const services = [
  {
    slug: 'software-development',
    title: 'Software Development',
    icon: 'Code2',
    short: 'Custom web and software applications designed around organizational needs.',
    description:
      'We design and engineer custom software that fits the way your organization actually works — from internal tools and management systems to customer-facing platforms. Every build starts with understanding your processes, then shipping in small, testable increments.',
    benefits: [
      'Software shaped around your workflows, not the other way round',
      'Scalable architecture that grows with your organization',
      'Clean, documented code you own',
      'Ongoing support and iteration after launch',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Docker'],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    icon: 'Globe',
    short: 'Modern, responsive websites and web platforms for businesses and organizations.',
    description:
      'Fast, accessible, search-friendly websites and web platforms that represent your organization well on every device — with content management built in so your team can keep them current.',
    benefits: [
      'Mobile-first, responsive design',
      'SEO and performance best practices from day one',
      'Easy content management for non-technical teams',
      'Accessible to more of your audience',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Headless CMS', 'Vercel'],
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Applications',
    icon: 'Smartphone',
    short: 'User-friendly mobile experiences for Android and iOS platforms.',
    description:
      'Cross-platform mobile apps for Android and iOS, designed for real-world conditions — including low bandwidth, offline use and a wide range of devices.',
    benefits: [
      'One codebase for Android and iOS',
      'Offline-friendly and data-light experiences',
      'Push notifications and device integrations',
      'App store publishing support',
    ],
    technologies: ['React Native', 'Expo', 'Flutter', 'Firebase', 'REST & GraphQL APIs'],
  },
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    icon: 'BrainCircuit',
    short: 'Intelligent automation and AI-powered solutions that improve workflows and productivity.',
    description:
      'We help organizations apply AI where it genuinely helps: automating repetitive work, making information easier to find, and supporting better decisions — with humans kept in the loop.',
    benefits: [
      'Less time on repetitive, manual tasks',
      'Assistants and search over your own documents',
      'Practical, measurable use cases before large investments',
      'Responsible AI practices and data privacy',
    ],
    technologies: ['Python', 'LLM APIs', 'LangChain', 'Vector databases', 'n8n', 'FastAPI'],
  },
  {
    slug: 'ict-consulting',
    title: 'ICT Consulting',
    icon: 'Lightbulb',
    short: 'Technology strategy, system planning, digital transformation, and technical guidance.',
    description:
      'Independent technical guidance to help you make sound technology decisions — from choosing systems and vendors to planning infrastructure, security and team capability.',
    benefits: [
      'Clear technology roadmaps tied to your goals',
      'Vendor and system evaluation',
      'Security and infrastructure reviews',
      'Capacity building for your internal team',
    ],
    technologies: ['Cloud (AWS, Azure, GCP)', 'Networking', 'Security frameworks', 'Systems analysis'],
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Systems',
    icon: 'Layers',
    short: 'Secure platforms for managing organizational processes, information, users, and services.',
    description:
      'We move paper-based and fragmented processes into secure, connected digital systems — records management, service delivery portals, dashboards and reporting — so your organization can serve people better.',
    benefits: [
      'Replace paper and spreadsheets with reliable systems',
      'Role-based access and secure data handling',
      'Real-time dashboards and reporting',
      'Training and change management for staff',
    ],
    technologies: ['Node.js', 'MongoDB', 'PostgreSQL', 'Role-based access control', 'Cloud hosting'],
  },
];

export const serviceProcess = [
  { title: 'Discover', text: 'We learn your goals, users and constraints, and define what success looks like.' },
  { title: 'Design', text: 'We map workflows, design the experience and agree on a clear scope and plan.' },
  { title: 'Build', text: 'We develop in short iterations with regular demos so you see progress early.' },
  { title: 'Launch & Support', text: 'We deploy, train your team and keep improving the system after launch.' },
];

export const instructors = [
  {
    key: 'web',
    name: 'Instructor to be announced',
    title: 'Senior Full-Stack Engineer',
    bio: 'Program instructors are practicing engineers and designers. Instructor profiles will be published here.',
    isPlaceholder: true,
  },
];

export const programs = [
  {
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    icon: 'Code2',
    category: 'Development',
    level: 'Beginner',
    duration: '16 weeks',
    format: 'Hybrid',
    featured: true,
    order: 1,
    shortDescription: 'Learn HTML, CSS, JavaScript, modern frameworks, APIs, databases, and deployment.',
    description:
      'Go from your first line of code to deploying full-stack web applications. You will learn the MERN stack — MongoDB, Express, React and Node.js — by building real projects, working in teams and getting feedback from mentors.',
    outcomes: [
      'Build responsive interfaces with HTML, CSS and Tailwind CSS',
      'Write modern JavaScript confidently',
      'Create single-page applications with React',
      'Design REST APIs with Node.js and Express',
      'Model and query data with MongoDB',
      'Deploy applications to the cloud and use Git professionally',
    ],
    curriculum: [
      { title: 'Web Foundations', lessons: ['How the web works', 'HTML semantics', 'CSS layout: Flexbox & Grid', 'Responsive design'] },
      { title: 'JavaScript', lessons: ['Core syntax & data types', 'Functions and scope', 'DOM & events', 'Async JS & fetch'] },
      { title: 'React', lessons: ['Components & props', 'State and hooks', 'Routing', 'Working with APIs'] },
      { title: 'Backend with Node & Express', lessons: ['Node fundamentals', 'Building REST APIs', 'Authentication with JWT', 'Validation & error handling'] },
      { title: 'Databases', lessons: ['MongoDB & Mongoose', 'Data modelling', 'Aggregation basics'] },
      { title: 'Capstone', lessons: ['Team project planning', 'Build sprint', 'Deployment', 'Demo day'] },
    ],
    requirements: ['A laptop (4GB RAM minimum, 8GB recommended)', 'Reliable internet access', 'No prior coding experience required'],
    certificate: 'Certificate of completion awarded after finishing the capstone project and meeting attendance requirements.',
    faqs: [
      { question: 'Do I need to know how to code?', answer: 'No. This program starts from the fundamentals.' },
      { question: 'How many hours per week?', answer: 'Plan for roughly 10–15 hours per week including classes and practice.' },
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    icon: 'Smartphone',
    category: 'Development',
    level: 'Intermediate',
    duration: '12 weeks',
    format: 'Hybrid',
    featured: true,
    order: 2,
    shortDescription: 'Learn how to design and build modern mobile applications.',
    description:
      'Build cross-platform mobile apps for Android and iOS with React Native. Learn navigation, state management, device features, offline data and how to publish to app stores.',
    outcomes: [
      'Build cross-platform apps with React Native & Expo',
      'Design mobile-first interfaces',
      'Work with device features: camera, location, notifications',
      'Store data offline and sync with APIs',
      'Prepare apps for store release',
    ],
    curriculum: [
      { title: 'Mobile Foundations', lessons: ['Mobile UX principles', 'React Native setup', 'Core components'] },
      { title: 'Navigation & State', lessons: ['Stack & tab navigation', 'Context and state management', 'Forms'] },
      { title: 'Data & APIs', lessons: ['Consuming REST APIs', 'Offline storage', 'Authentication'] },
      { title: 'Device Features', lessons: ['Camera & media', 'Location', 'Push notifications'] },
      { title: 'Release', lessons: ['Testing on devices', 'Builds & store publishing', 'Capstone demo'] },
    ],
    requirements: ['Working knowledge of JavaScript', 'A laptop and an Android or iOS phone for testing'],
    certificate: 'Certificate of completion awarded after the capstone app is reviewed.',
    faqs: [{ question: 'Is JavaScript required?', answer: 'Yes, basic JavaScript knowledge is expected before starting.' }],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    icon: 'PenTool',
    category: 'Design',
    level: 'Beginner',
    duration: '10 weeks',
    format: 'Online',
    featured: true,
    order: 3,
    shortDescription: 'Learn user research, wireframing, prototyping, design systems, and product design.',
    description:
      'Learn to design digital products people love to use. Practice user research, information architecture, wireframing, visual design and prototyping in Figma — and leave with portfolio-ready case studies.',
    outcomes: [
      'Plan and run basic user research',
      'Create wireframes and user flows',
      'Design polished interfaces in Figma',
      'Build and use design systems',
      'Present design case studies',
    ],
    curriculum: [
      { title: 'Design Thinking', lessons: ['What UX really is', 'User research methods', 'Personas & journeys'] },
      { title: 'Structure', lessons: ['Information architecture', 'User flows', 'Wireframing'] },
      { title: 'Visual Design', lessons: ['Typography & colour', 'Layout & grids', 'Accessibility'] },
      { title: 'Prototyping', lessons: ['Interactive prototypes in Figma', 'Usability testing'] },
      { title: 'Portfolio', lessons: ['Design systems', 'Writing a case study', 'Final presentation'] },
    ],
    requirements: ['A laptop with a modern browser', 'A free Figma account'],
    certificate: 'Certificate of completion awarded after submitting two portfolio case studies.',
    faqs: [{ question: 'Do I need to be good at drawing?', answer: 'No. UX design is about problem solving, not illustration.' }],
  },
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    icon: 'BrainCircuit',
    category: 'AI',
    level: 'Intermediate',
    duration: '12 weeks',
    format: 'Hybrid',
    featured: true,
    order: 4,
    shortDescription: 'Learn AI concepts, machine learning fundamentals, automation, and practical AI applications.',
    description:
      'Understand how modern AI works and how to apply it responsibly. Cover Python for data, machine learning fundamentals, working with large language model APIs, and building practical AI-powered tools.',
    outcomes: [
      'Use Python for data and AI work',
      'Understand core machine learning concepts',
      'Train and evaluate simple models',
      'Build applications with LLM APIs',
      'Automate workflows with AI responsibly',
    ],
    curriculum: [
      { title: 'Python for AI', lessons: ['Python refresher', 'NumPy & pandas', 'Visualising data'] },
      { title: 'Machine Learning', lessons: ['Supervised learning', 'Model evaluation', 'Overfitting and bias'] },
      { title: 'Generative AI', lessons: ['How LLMs work', 'Prompt design', 'Retrieval-augmented generation'] },
      { title: 'AI Automation', lessons: ['Workflow automation', 'Building AI assistants', 'Responsible AI & privacy'] },
      { title: 'Capstone', lessons: ['Problem selection', 'Build & evaluate', 'Demo day'] },
    ],
    requirements: ['Basic programming experience (any language)', 'Comfort with high-school level maths'],
    certificate: 'Certificate of completion awarded after the capstone project.',
    faqs: [{ question: 'Is advanced maths required?', answer: 'No. We focus on intuition and practical application.' }],
  },
  {
    slug: 'data-analytics',
    title: 'Data & Analytics',
    icon: 'BarChart3',
    category: 'Data',
    level: 'Beginner',
    duration: '10 weeks',
    format: 'Online',
    featured: true,
    order: 5,
    shortDescription: 'Learn data analysis, visualization, databases, and turning information into insights.',
    description:
      'Learn to collect, clean, analyse and visualise data to support decisions. Work with spreadsheets, SQL, Python and dashboard tools using realistic datasets.',
    outcomes: [
      'Clean and prepare messy data',
      'Query databases with SQL',
      'Analyse data with Python',
      'Build clear dashboards',
      'Communicate findings to decision makers',
    ],
    curriculum: [
      { title: 'Data Foundations', lessons: ['Spreadsheets for analysis', 'Data types & quality'] },
      { title: 'SQL', lessons: ['Querying data', 'Joins & aggregation', 'Database design basics'] },
      { title: 'Python for Analysis', lessons: ['pandas essentials', 'Exploratory analysis'] },
      { title: 'Visualisation', lessons: ['Choosing the right chart', 'Dashboards with Power BI / Looker Studio'] },
      { title: 'Capstone', lessons: ['End-to-end analysis project', 'Presenting insights'] },
    ],
    requirements: ['A laptop', 'Comfort with basic arithmetic'],
    certificate: 'Certificate of completion awarded after presenting the capstone analysis.',
    faqs: [{ question: 'Which tools will I use?', answer: 'Spreadsheets, SQL, Python and a dashboard tool.' }],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    icon: 'ShieldCheck',
    category: 'Security',
    level: 'Beginner',
    duration: '10 weeks',
    format: 'In person',
    featured: true,
    order: 6,
    shortDescription: 'Learn security fundamentals, secure development practices, networks, and cyber awareness.',
    description:
      'Build a strong foundation in cybersecurity: how networks and systems work, common threats, defensive practices and secure development — with hands-on labs in a safe environment.',
    outcomes: [
      'Understand networking fundamentals',
      'Recognise common threats and attacks',
      'Apply defensive security practices',
      'Write more secure code',
      'Build a security-aware culture',
    ],
    curriculum: [
      { title: 'Foundations', lessons: ['Security principles', 'Operating systems basics', 'Networking basics'] },
      { title: 'Threats', lessons: ['Social engineering', 'Malware', 'Web vulnerabilities (OWASP Top 10)'] },
      { title: 'Defence', lessons: ['Access control', 'Encryption basics', 'Monitoring & incident response'] },
      { title: 'Secure Development', lessons: ['Secure coding practices', 'Dependency & secrets management'] },
      { title: 'Capstone', lessons: ['Security assessment lab', 'Report & presentation'] },
    ],
    requirements: ['A laptop capable of running a virtual machine (8GB RAM recommended)'],
    certificate: 'Certificate of completion awarded after the final lab assessment.',
    faqs: [{ question: 'Is this program about hacking?', answer: 'It focuses on defence and ethical, authorised practice only.' }],
  },
];

export const projects = [
  {
    slug: 'school-management-platform',
    title: 'School Management Platform',
    category: 'Education',
    summary: 'A concept platform for enrolment, attendance, grading and parent communication in one place.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    isSample: true,
    featured: true,
  },
  {
    slug: 'clinic-records-system',
    title: 'Clinic Records System',
    category: 'Healthcare',
    summary: 'A concept system for patient registration, appointments and secure digital records.',
    technologies: ['React', 'Express', 'PostgreSQL'],
    isSample: true,
    featured: true,
  },
  {
    slug: 'sme-inventory-pos',
    title: 'SME Inventory & POS',
    category: 'Business',
    summary: 'A concept inventory and point-of-sale tool with mobile money–ready reporting for small businesses.',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    isSample: true,
    featured: true,
  },
  {
    slug: 'citizen-services-portal',
    title: 'Citizen Services Portal',
    category: 'Government',
    summary: 'A concept portal for online applications, tracking and service delivery for public institutions.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
    isSample: true,
    featured: true,
  },
  {
    slug: 'microfinance-loan-tracker',
    title: 'Microfinance Loan Tracker',
    category: 'Finance',
    summary: 'A concept system for managing loan applications, repayments and portfolio dashboards.',
    technologies: ['React', 'Express', 'MongoDB'],
    isSample: true,
    featured: true,
  },
  {
    slug: 'community-volunteer-hub',
    title: 'Community Volunteer Hub',
    category: 'Community',
    summary: 'A concept platform connecting NGOs with volunteers, events and impact reporting.',
    technologies: ['React', 'Node.js', 'AI matching'],
    isSample: true,
    featured: true,
  },
];

export const posts = [
  {
    slug: 'how-to-start-a-career-in-tech',
    title: 'How to Start a Career in Tech — Even Without a Degree',
    category: 'Careers',
    excerpt: 'A practical roadmap for choosing a path, building skills and creating a portfolio that gets noticed.',
    readTime: '6 min read',
    publishedAt: '2026-09-10',
  },
  {
    slug: 'practical-ai-for-small-organizations',
    title: 'Practical AI for Small Organizations',
    category: 'AI',
    excerpt: 'Where AI can genuinely save time — and where it cannot. A grounded guide for teams getting started.',
    readTime: '7 min read',
    publishedAt: '2026-08-28',
  },
  {
    slug: 'why-project-based-learning-works',
    title: 'Why Project-Based Learning Works',
    category: 'Education',
    excerpt: 'Moving from tutorials to building real things is where developers are made. Here is why.',
    readTime: '5 min read',
    publishedAt: '2026-08-14',
  },
  {
    slug: 'digitizing-paper-processes',
    title: 'Digitizing Paper Processes: A Step-by-Step Approach',
    category: 'Digital Transformation',
    excerpt: 'How organizations can move from paper and spreadsheets to reliable digital systems without disruption.',
    readTime: '8 min read',
    publishedAt: '2026-07-30',
  },
  {
    slug: 'choosing-a-tech-stack',
    title: 'Choosing a Tech Stack for Your First Product',
    category: 'Software Development',
    excerpt: 'The trade-offs that matter when choosing frameworks, databases and hosting for a new product.',
    readTime: '6 min read',
    publishedAt: '2026-07-16',
  },
  {
    slug: 'the-african-digital-economy',
    title: 'Opportunities in the African Digital Economy',
    category: 'Technology',
    excerpt: 'Mobile-first innovation, a young population and growing connectivity are creating new opportunities.',
    readTime: '5 min read',
    publishedAt: '2026-07-02',
  },
];

const postBody = (title) =>
  `This is placeholder article content for "${title}".\n\nReplace it from the Admin dashboard with the full article. Articles support multiple paragraphs — separate them with a blank line.\n\nHornaAI Insights share practical knowledge on technology, education and digital transformation for students, professionals and organizations.`;
posts.forEach((p) => {
  p.content = postBody(p.title);
  p.author = 'HornaAI Team';
});

export const testimonials = [
  {
    name: 'Student Name',
    program: 'Full-Stack Web Development',
    quote:
      'Placeholder testimonial — replace with a real quote from a student describing their experience and what they built.',
    isPlaceholder: true,
  },
  {
    name: 'Student Name',
    program: 'UI/UX Design',
    quote:
      'Placeholder testimonial — replace with a real quote about mentorship, practical projects and portfolio growth.',
    isPlaceholder: true,
  },
  {
    name: 'Partner Name',
    program: 'Organization Partner',
    quote:
      'Placeholder testimonial — replace with a real quote from an organization HornaAI has worked with, once approved.',
    isPlaceholder: true,
  },
];

export const partners = Array.from({ length: 6 }, (_, i) => ({
  name: `Partner ${i + 1}`,
  isPlaceholder: true,
  order: i,
}));

export const faqs = [
  {
    question: 'Who can join HornaAI training programs?',
    answer:
      'Our programs are open to students, university graduates, young professionals and anyone motivated to build technology skills. Each program page lists any specific requirements.',
  },
  {
    question: 'Do I need previous programming experience?',
    answer:
      'Not for our beginner programs — they start from the fundamentals. Intermediate programs such as Mobile App Development or AI expect some prior programming knowledge.',
  },
  {
    question: 'Are the programs online or in person?',
    answer:
      'We offer online, in-person and hybrid formats. The delivery method for each program is shown on its card and program page.',
  },
  {
    question: 'Do students receive certificates?',
    answer:
      'Yes. Students who complete the program requirements, including the final project, receive a HornaAI certificate of completion.',
  },
  {
    question: 'Can organizations request custom training?',
    answer:
      'Yes. We design tailored training for teams, schools and institutions. Contact us with your goals and we will propose a program.',
  },
  {
    question: 'Does HornaAI build custom software?',
    answer:
      'Yes. We build custom web platforms, mobile apps, AI and automation tools, and digital systems for organizations.',
  },
  {
    question: 'How can my organization work with HornaAI?',
    answer:
      'Start a project request or send us a message. We will schedule a consultation to understand your needs and recommend next steps.',
  },
];

export const values = [
  { title: 'Practical', icon: 'Wrench', text: 'Focus on solutions and skills that can be applied in real situations.' },
  { title: 'Innovative', icon: 'Sparkles', text: 'Explore modern technologies and emerging digital opportunities.' },
  { title: 'Accessible', icon: 'Users', text: 'Create learning opportunities for students and aspiring technology professionals.' },
  { title: 'Impact Driven', icon: 'Target', text: 'Use technology to solve meaningful problems and create opportunities.' },
];

export const blogCategories = ['Technology', 'AI', 'Software Development', 'Education', 'Careers', 'Digital Transformation'];
export const projectCategories = ['Education', 'Healthcare', 'Business', 'Government', 'Finance', 'Community'];
