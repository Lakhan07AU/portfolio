export type Project = {
  id: string;
  index: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  architecture: string[];
  technologies: string[];
  capabilities: string[];
  whatBuilt: string[];
  links: {
    github: string;
    demo?: string;
    demoLabel?: string;
  };
  featured?: boolean;
};

export const expertise = [
  {
    id: "ml",
    no: "01",
    title: "Machine Learning",
    description:
      "Building supervised and unsupervised models with a focus on clean data, honest evaluation and predictive workflows.",
    capabilities: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Model Evaluation",
      "Feature Engineering",
      "Data Preprocessing",
      "Predictive Modeling",
    ],
  },
  {
    id: "dl",
    no: "02",
    title: "Deep Learning",
    description:
      "Designing and training neural networks for structured and visual data, with applied computer-vision workflows.",
    capabilities: [
      "Neural Networks",
      "CNN",
      "GANs",
      "Computer Vision",
      "Model Training",
      "Deep Learning Workflows",
    ],
  },
  {
    id: "genai",
    no: "03",
    title: "Generative AI",
    description:
      "Building applications around large language models, retrieval and multimodal systems that make AI useful.",
    capabilities: [
      "Large Language Models",
      "RAG",
      "Embeddings",
      "Vector Search",
      "Prompt Engineering",
      "Multimodal AI",
      "VLMs",
    ],
  },
  {
    id: "cv",
    no: "04",
    title: "Computer Vision",
    description:
      "Turning video and imagery into structured insight with detection, tracking and real-time processing.",
    capabilities: [
      "Object Detection",
      "YOLO",
      "Object Tracking",
      "Event Detection",
      "Image / Video Processing",
      "Real-Time Vision Pipelines",
    ],
  },
  {
    id: "aien",
    no: "05",
    title: "AI Engineering",
    description:
      "Connecting models to reliable products — APIs, queues, storage and real-time systems that ship.",
    capabilities: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "APIs",
      "WebRTC",
      "AI Inference Pipelines",
    ],
  },
] as const;

export const projects: Project[] = [
  {
    id: "forensic",
    index: "01",
    label: "Featured AI System",
    title: "AI Forensic Investigation System",
    tagline: "Real-time multimodal investigation platform",
    description:
      "A multimodal AI-powered investigation platform designed for real-time video analysis, object detection, tracking, event detection, visual observations, and investigation assistance.",
    problem:
      "Investigative workflows rely on manually reviewing hours of video to find objects, events and relevant context. This is slow and error-prone, and insights stay locked inside footage instead of becoming searchable evidence.",
    approach:
      "The system ingests live camera streams via WebRTC, processes frames through YOLO-based object detection, maintains identity through multi-object tracking, and detects meaningful events. Detected scenes are observed by a vision-language model, and the resulting observations are chained with RAG-based investigation intelligence so investigators can query findings contextually.",
    architecture: [
      "Camera",
      "WebRTC",
      "Video Processing",
      "YOLO Detection",
      "Object Tracking",
      "Event Detection",
      "VLM Observation",
      "RAG / Investigation Intelligence",
      "Investigation Dashboard",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "YOLO",
      "ByteTrack / BoT-SORT",
      "VLM",
      "Whisper",
      "RAG",
      "WebRTC",
      "PostgreSQL",
      "JWT",
      "Docker",
    ],
    capabilities: [
      "Real-time camera ingestion",
      "Object detection & multi-object tracking",
      "Event detection over live video",
      "VLM-based visual observations",
      "RAG-backed investigation intelligence",
      "Secure JWT-authenticated dashboard",
    ],
    whatBuilt: [
      "Designed the end-to-end pipeline from camera ingestion through detection, tracking and event detection to investigation output.",
      "Built FastAPI services connecting computer-vision stages with VLM observation and RAG retrieval.",
      "Integrated WebRTC-based camera connectivity for real-time workflows.",
      "Wired PostgreSQL persistence, JWT authentication and a Next.js investigation dashboard.",
      "Packaged the system for containerized deployment with Docker.",
    ],
    links: {
      github: "https://github.com/Lakhan07AU/Generative-Ai",
    },
    featured: true,
  },
  {
    id: "healthsphere",
    index: "02",
    label: "Hackathon · Health AI",
    title: "HealthSphere",
    tagline: "AI-enabled healthcare platform",
    description:
      "An AI-powered healthcare platform designed to organize health information, process medical reports, manage family health history, and support intelligent healthcare workflows.",
    problem:
      "Health information is scattered across reports, histories and providers. Patients and families struggle to organize records, understand medical summaries, and find the right specialist close to home.",
    approach:
      "HealthSphere centralizes health records and family health history, parses uploaded medical reports with AI, and surfaces AI-assisted insights. Doctor and specialist discovery uses location-based search so recommendations are practical and actionable.",
    architecture: [
      "User / Family Profiles",
      "Medical Report Upload",
      "AI Report Parsing",
      "Health Records & History",
      "AI-assisted Insights",
      "Specialist Discovery",
      "Location-based Search",
    ],
    technologies: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Celery",
      "AI/LLM Integration",
      "Storage",
    ],
    capabilities: [
      "Family health history management",
      "Medical report upload & AI parsing",
      "Doctor & specialist discovery",
      "Location-based search",
      "Persistent health records",
      "AI-assisted insights",
    ],
    whatBuilt: [
      "Built the backend with FastAPI, PostgreSQL and Redis/Celery for background processing of medical documents.",
      "Integrated LLM-based report parsing and AI-assisted insight generation.",
      "Built the Next.js front end for records, history and specialist discovery.",
      "Shipped the product as part of the iQOO Hackathon experience.",
    ],
    links: {
      github: "https://github.com/Lakhan07AU/Projects/tree/main/HealthSphere",
      demoLabel: "View Project",
    },
  },
  {
    id: "roadguard",
    index: "03",
    label: "Computer Vision · Civic Tech",
    title: "RoadGuard",
    tagline: "Pothole detection & road-safety reporting",
    description:
      "A computer vision platform for pothole detection and road-safety reporting.",
    problem:
      "Road damage is reported through informal channels with little evidence or structure, making it hard for authorities to prioritize repairs and for commuters to avoid hazards.",
    approach:
      "RoadGuard runs computer-vision models over images and video to detect potholes, attaches evidence and location context, and pushes validated reports through a backend API into a usable road-safety web portal.",
    architecture: [
      "Image / Video",
      "Computer Vision",
      "Pothole Detection",
      "Evidence / Location",
      "Backend API",
      "Road Safety Portal",
    ],
    technologies: ["Python", "Computer Vision", "YOLO", "FastAPI", "Next.js", "PostgreSQL"],
    capabilities: [
      "Pothole detection from images & video",
      "Evidence and location capture",
      "Backend API for reports",
      "Road-safety web portal",
    ],
    whatBuilt: [
      "Built a computer-vision module for pothole detection using YOLO.",
      "Designed the evidence and location capture flow feeding the backend.",
      "Created the FastAPI backend with PostgreSQL storage.",
      "Developed the Next.js road-safety portal for viewing reports.",
    ],
    links: {
      github: "https://github.com/Lakhan07AU/Projects/tree/main/RoadGuard",
      demoLabel: "View Demo",
    },
  },
];

export const journey = [
  {
    period: "Present · 2026",
    title: "BCA — Artificial Intelligence & Machine Learning",
    place: "Alliance University, Bengaluru",
    description:
      "Building a deeper foundation in machine learning, deep learning, generative AI and practical software engineering.",
  },
  {
    period: "2026",
    title: "AI/ML Projects & Hackathons",
    place: "Learn · Ship · Iterate",
    description:
      "Developed HealthSphere, the AI Forensic Investigation System and RoadGuard across healthcare, civic technology and multimodal investigation workflows.",
  },
  {
    period: "2026",
    title: "Executive Head — Chess Club",
    place: "Alliance University",
    description:
      "Organizing chess activities, coordinating practice sessions and supporting university chess team activities with leadership and team coordination.",
  },
  {
    period: "Next",
    title: "Deeper ML + stronger deployments",
    place: "Open to internships & AI collaborations",
    description:
      "Focused on better model evaluation, MLOps fundamentals, system design and production-oriented AI projects.",
  },
];

export const achievements = [
  {
    icon: "leadership",
    title: "Chess Club Leadership",
    subtitle: "Executive Head — Chess Club · Alliance University",
    description:
      "Lead and coordinate chess-related activities within the university, including practice sessions, team preparation and competitive events.",
  },
  {
    icon: "team",
    title: "University Chess Team",
    subtitle: "Active participation",
    description:
      "Participated in university-level chess activities and team selection events.",
  },
  {
    icon: "rating",
    title: "Chess Rating Milestone",
    subtitle: "1700+ Chess.com rating milestone",
    description:
      "Reached a 1700+ Chess.com rating milestone. A snapshot of past progress rather than a current rating claim.",
  },
];

export const hackathons = [
  {
    name: "iQOO Hackathon",
    year: "2026",
    project: "HealthSphere",
    description:
      "Built an AI-enabled healthcare platform in a competitive hackathon setting, focused on health information organization, medical report understanding and specialist discovery.",
    aiComponent:
      "AI-powered medical report parsing, AI-assisted insights and LLM-backed healthcare workflows.",
    takeaways:
      "End-to-end product experience: problem framing, AI integration, backend engineering and delivering a working demo under time pressure.",
    link: "https://github.com/Lakhan07AU/Projects/tree/main/HealthSphere",
  },
];

export const focusAreas = [
  "Machine Learning",
  "Deep Learning",
  "Generative AI",
  "Computer Vision",
  "RAG",
  "LLMs",
  "VLMs",
  "Python",
] as const;