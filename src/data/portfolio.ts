import {
  PersonalInfo,
  SocialLinks,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  EducationItem,
  AchievementItem
} from '../types.ts';

export const personalInfo: PersonalInfo = {
  name: "Singireddy Avanthika Reddy",
  location: "Hyderabad, Telangana, India",
  phone: "+91 7569642382",
  email: "singireddyavanthikareddy@gmail.com",
  title: "Full-Stack & AI Software Engineer",
  summary: "Computer Science undergraduate skilled in Java, DSA, OOP, DBMS, and Full-Stack Development. Hands-on experience building AI-powered and real-time applications using React, Node.js, Supabase, and Gemini API.",
  resumePath: "/resume.pdf",
  profilePhotoPath: "/profile.jpg"
};

export const socialLinks: SocialLinks = {
  linkedin: "https://www.linkedin.com/in/singireddyavanthikareddy",
  github: "https://github.com/singireddyavanthikareddy",
  email: "mailto:singireddyavanthikareddy@gmail.com",
  phone: "tel:+917569642382"
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    iconName: "Code2",
    description: "Core programming and algorithmic languages",
    skills: ["Java", "Python", "C", "JavaScript", "TypeScript"]
  },
  {
    category: "Core Subjects",
    iconName: "Binary",
    description: "Fundamental computer science principles",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "OS", "CN"]
  },
  {
    category: "Frontend",
    iconName: "Layout",
    description: "Modern, reactive, and responsive user interfaces",
    skills: ["HTML", "CSS", "React.js", "Vite"]
  },
  {
    category: "Backend",
    iconName: "Server",
    description: "Server architecture and API development",
    skills: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    category: "Databases",
    iconName: "Database",
    description: "Relational persistence and cloud backends",
    skills: ["SQL", "PostgreSQL", "Supabase"]
  },
  {
    category: "Tools & Platforms",
    iconName: "Terminal",
    description: "Development environments and engineering workflows",
    skills: ["VS Code", "Git", "GitHub", "Canva", "Agile Development", "SDLC"]
  }
];

export const projects: ProjectItem[] = [
  {
    id: "productpilot",
    name: "ProductPilot",
    subtitle: "AI-Driven Product Recommendation & Discovery Platform",
    date: "Mar 2026 – Present",
    technologies: [
      "React.js",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "Gemini API"
    ],
    description:
      "Developed an AI-powered product recommendation platform that analyzes user requirements and generates personalized product suggestions.",
    keyFeatures: [
      "Developed an AI-powered product recommendation platform that analyzes user requirements and generates personalized product suggestions.",
      "Integrated AI-driven recommendation logic to improve product matching, comparison, and user decision-making.",
      "Built a responsive and interactive frontend using React.js and TypeScript, implementing reusable components and user-friendly product discovery workflows."
    ],
    githubUrl: "https://github.com/singireddyavanthikareddy/ProductPilot",
    liveUrl: null, // As requested: omit or show inactive state if not in resume
    workflowTitle: "Product Recommendation Engine Architecture",
    workflowSteps: [
      { step: 1, title: "User Requirements", desc: "User inputs requirements, preferences, and purchase intent parameters." },
      { step: 2, title: "AI Recommendation", desc: "Gemini API decodes semantic context and evaluates ideal criteria." },
      { step: 3, title: "Product Matching", desc: "Correlates attributes with high-dimensional catalog data in Supabase & PostgreSQL." },
      { step: 4, title: "Product Comparison", desc: "Scores trade-offs, features, and price-to-performance metrics." },
      { step: 5, title: "Personalized Suggestions", desc: "Renders curated interactive suggestions with transparent rationale." }
    ]
  },
  {
    id: "agentos",
    name: "AgentOS",
    subtitle: "Agentic AI Platform for B2B Prospect Intelligence",
    date: "Sep 2026",
    technologies: [
      "React.js",
      "TypeScript",
      "Vite",
      "Python",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Gemini API"
    ],
    description:
      "Built a multi-agent AI platform for automated B2B prospect research, lead qualification, buyer-persona identification, contact discovery, and executive reporting.",
    keyFeatures: [
      "Built a multi-agent AI platform for automated B2B prospect research, lead qualification, buyer-persona identification, contact discovery, and executive reporting.",
      "Developed a dynamic agent orchestration system using Python/FastAPI with a Planner Agent, specialized AI agents, shared typed memory, and fault-tolerant workflow execution.",
      "Built a React dashboard with Human-in-the-Loop approval, real-time workflow monitoring, company intelligence, and AI-generated prospect insights."
    ],
    githubUrl: "https://github.com/singireddyavanthikareddy/AgentOS",
    liveUrl: null,
    workflowTitle: "Agentic AI Multi-Agent Orchestration Workflow",
    workflowSteps: [
      { step: 1, title: "User Request", desc: "User defines target ICP, domain criteria, and research guidelines." },
      { step: 2, title: "Planner Agent", desc: "Orchestrator breaks complex prospect objectives into autonomous sub-tasks." },
      { step: 3, title: "Specialized Agents", desc: "Dedicated research agents crawl intelligence, analyze personas, and identify contacts." },
      { step: 4, title: "Shared Typed Memory", desc: "Synchronized state bus allows collaborative multi-agent cross-referencing." },
      { step: 5, title: "Workflow Execution", desc: "Fault-tolerant pipeline monitors task completion and reconciles findings." },
      { step: 6, title: "Human Approval", desc: "Human-in-the-Loop review gate ensures verified high-confidence outcomes." },
      { step: 7, title: "Executive Report", desc: "Synthesizes final comprehensive prospect intelligence briefing for leadership." }
    ]
  }
];

export const certifications: CertificationItem[] = [
  {
    name: "Generative AI (GenAI) Literacy",
    organization: "NASSCOM",
    date: "Mar 2026",
    credentialUrl: null,
    category: "Artificial Intelligence"
  },
  {
    name: "Introduction to Data Science",
    organization: "Cisco Networking Academy",
    date: "Jan 2026",
    credentialUrl: null,
    category: "Data Science"
  },
  {
    name: "Introduction to Modern AI",
    organization: "Cisco Networking Academy",
    date: "Jan 2026",
    category: "Artificial Intelligence",
    credentialUrl: null
  },
  {
    name: "Smart Interviews DSA Training Certification",
    organization: "Smart Interviews",
    date: "Jan 2026",
    credentialUrl: null,
    category: "Data Structures & Algorithms"
  }
];

export const education: EducationItem[] = [
  {
    institution: "CMR College of Engineering and Technology",
    degree: "B.Tech Computer Science Engineering (Data Science)",
    gpa: "8.72",
    period: "Sep 2023 – Jun 2027",
    status: "In Progress",
    location: "Hyderabad, Telangana"
  },
  {
    institution: "Sri Chaitanya Junior Kalasala",
    degree: "Intermediate (MPC)",
    gpa: "9.76",
    period: "Jun 2021 – Mar 2023",
    status: "Completed",
    location: "Telangana, India"
  }
];

export const achievements: AchievementItem[] = [
  {
    title: "Top 8 Position",
    event: "Global Codeverse 2026",
    category: "Healthcare Wellness Domain",
    description:
      "Secured a Top 8 position at Global Codeverse 2026, a 24-hour national-level hackathon, competing in the Healthcare Wellness domain.",
    highlight: "24-Hour National Hackathon"
  },
  {
    title: "Top 5 Position",
    event: "B2B Project Competition",
    category: "Innovative Project Solution",
    description:
      "Secured Top 5 position at B2B, recognized among the leading teams for an innovative project solution, demonstrating technical expertise, problem-solving, teamwork, and practical implementation.",
    highlight: "Recognized Leading Team"
  }
];
