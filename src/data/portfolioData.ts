export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Applied ML & AI' | 'Computer Vision' | 'Systems & Backend' | 'Full Stack';
  date: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  architectureDetails: string[];
  featured: boolean;
  interactiveType?: 'wyvern-simulator' | 'dip-canvas' | 'architecture-view';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Proficient'; tag?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  details: string[];
}

export interface AchievementItem {
  title: string;
  event: string;
  year: string;
  description: string;
  badge: string;
  iconName: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Anish Karak",
    title: "Machine Learning Engineer & Systems Architect",
    roleTagline: "Pre-Final Year CSE @ KIIT | Top 500 Amazon ML Challenge | SIH 2026 Finalist",
    bio: "Computer Science undergraduate specializing in high-throughput machine learning pipelines, edge computer vision, and scalable distributed backend systems. Experienced in resolving multi-million record entity matching challenges, sub-50ms quantized neural vision microservices, and high-performance algorithms.",
    location: "Bhubaneswar & Durgapur, India",
    phone: "+91 9832305709",
    email: "anishkarak4@gmail.com",
    github: "https://github.com/anishkarak4-ux",
    githubUsername: "anishkarak4-ux",
    linkedin: "https://linkedin.com/in/anish-karak-182661336",
    resumeUrl: "./assets/ANISH_RESUME.pdf",
    avatarUrl: "./assets/anish_karak.jpg",
    signatureUrl: "./assets/signature.jpg",
    statusBadge: "Open for Pre-Final Year Internships (Summer 2027) & Research",
    currentCGPA: "9.24 / 10.0",
    cohort: "B.Tech CSE (2024 – 2028), 3rd Year / 5th Sem",
  },

  stats: [
    { label: "Entity Records Resolved", value: "1.73M", subtitle: "Amazon ML Challenge" },
    { label: "Search Space Reduction", value: ">99.99%", subtitle: "8-Rule Inverted Blocking" },
    { label: "Mean Tracking FPS", value: "35.88", subtitle: "DIP & YOLOv8 Telemetry" },
    { label: "Academic CGPA", value: "9.24", subtitle: "KIIT B.Tech CSE" },
    { label: "Macro F0.5 Score", value: "0.805", subtitle: "Wyvern XGBoost Model" },
    { label: "Test Suite Coverage", value: "18 / 18", subtitle: "TensorEdge Production Tests" },
  ],

  projects: [
    {
      id: "wyvern",
      title: "Wyvern – Multilingual Entity Resolution Engine",
      subtitle: "Amazon ML Challenge 2026 • Top 500 Placement (72-Hour Sprint)",
      category: "Applied ML & AI",
      date: "Sep 2026",
      summary: "Large-scale entity resolution pipeline built to deduplicate and link 1.73M noisy multi-lingual commercial records across 336.9M candidate pairs under strict memory and execution constraints.",
      highlights: [
        "Engineered an 8-rule inverted-index blocking engine achieving a >99.99% search space reduction, narrowing 336.9M possible pairs to high-probability candidate sets.",
        "Engineered 46 dense pairwise similarity features covering lexical token overlap, phonetic Soundex, and address token matching.",
        "Trained a 1,000-tree XGBoost classifier with dynamic relative-gap pruning, achieving an authoritative 0.805 Macro F0.5 validation score.",
        "Guaranteed zero data leakage via strict isolated entity-cluster validation partitioning, securing a Top 500 placement among thousands of competing teams on Unstop."
      ],
      metrics: [
        { label: "Candidate Pairs", value: "336.9M" },
        { label: "Space Reduction", value: ">99.99%" },
        { label: "Pairwise Features", value: "46 Dense" },
        { label: "Validation F0.5", value: "0.805" }
      ],
      tags: ["Python", "XGBoost", "Scikit-Learn", "Pandas", "Inverted Index", "Entity Resolution", "High-Throughput"],
      githubUrl: "https://github.com/anishkarak4-ux/Wyvern",
      featured: true,
      interactiveType: "wyvern-simulator",
      architectureDetails: [
        "Stage 1: Multi-field text normalization and Unicode NFKD folding across multilingual titles and addresses.",
        "Stage 2: 8 inverted-index blocking rules spanning exact token, token prefixes, phone numbers, and zip codes.",
        "Stage 3: 46 dense pairwise metric calculations combining Levenshtein, Jaro-Winkler, Jaccard, Soundex, and length ratios.",
        "Stage 4: 1,000-tree gradient boosted decision tree with tuned precision-oriented F0.5 objective and relative gap thresholding."
      ]
    },
    {
      id: "tensoredge",
      title: "TensorEdge-Vision – Edge Anomaly Segmentation Engine",
      subtitle: "High-Throughput Deep Learning Visual Inspection & Quantized Serving",
      category: "Computer Vision",
      date: "Oct 2026",
      summary: "End-to-end edge-deployable deep learning visual defect and anomaly segmentation engine engineered for high-throughput automated industrial quality inspection.",
      highlights: [
        "Architected a dual-backbone segmentation and anomaly localization architecture trained on high-resolution industrial surface datasets.",
        "Exported full INT8 post-training quantized TFLite and ONNX models running sub-20ms inferences on resource-constrained edge hardware.",
        "Integrated Grad-CAM visual heatmaps and dynamic thresholding to deliver explainable spatial defect diagnosis in real time.",
        "Built a containerized FastAPI serving microservice with 18/18 verified PyTests and automated CI/CD pipeline."
      ],
      metrics: [
        { label: "Inference Latency", value: "<18ms" },
        { label: "Edge Quantization", value: "TFLite INT8" },
        { label: "Explainability", value: "Grad-CAM Heatmaps" },
        { label: "Automated Tests", value: "18 / 18 Passing" }
      ],
      tags: ["TensorFlow 2.16+", "TFLite INT8", "FastAPI", "OpenCV", "Grad-CAM", "Docker", "PyTest"],
      githubUrl: "https://github.com/anishkarak4-ux/portfolio_work",
      featured: true,
      interactiveType: "architecture-view",
      architectureDetails: [
        "Edge-First Design: Model optimized with quantization-aware calibration and full INT8 integer arithmetic.",
        "Explainable AI: Real-time gradient-weighted class activation mapping (Grad-CAM) overlaid directly onto raw video frames.",
        "Production Serving: Asynchronous FastAPI worker pools with Prometheus-compatible telemetry and Docker packaging."
      ]
    },
    {
      id: "karigarsaathi",
      title: "KarigarSaathi – AI-Driven Artisan Market Linkage",
      subtitle: "Smart India Hackathon (SIH) 2026 Finalist • Team SYNAPSE",
      category: "Computer Vision",
      date: "Aug 2026",
      summary: "Computer vision and speech AI microservice platform empowering rural Indian artisans with automated craft digitization, multilingual catalog generation, and tamper-proof provenance.",
      highlights: [
        "Engineered the core computer-vision microservice in FastAPI using ONNX-quantized u2netp and OpenCV CLAHE, providing automated background segmentation under a strict 512MB RAM constraint.",
        "Integrated Sarvam AI Indic speech-to-text models with prompt-grounded fact extraction, transforming regional voice descriptions across 5 Indic languages into structured bilingual catalog attributes.",
        "Architected an offline-first React/TypeScript PWA with tamper-proof QR Craft Passports and standardized ONDC export schemas.",
        "Selected as a national finalist for Smart India Hackathon (SIH) 2026 representing KIIT University."
      ],
      metrics: [
        { label: "RAM Ceiling", value: "<512 MB" },
        { label: "Indic Languages", value: "5 Supported" },
        { label: "Segmentation", value: "ONNX u2netp" },
        { label: "Export Standard", value: "ONDC Schemas" }
      ],
      tags: ["FastAPI", "ONNX Runtime", "OpenCV", "React", "TypeScript", "Sarvam AI", "ONDC", "PWA"],
      githubUrl: "https://github.com/anishkarak4-ux/karigarsaathi",
      featured: true,
      interactiveType: "architecture-view",
      architectureDetails: [
        "Quantized Vision Core: Stripped u2netp weights running ONNX Runtime CPU with CLAHE pre-processing.",
        "Multilingual Audio Pipeline: Streaming regional Indic voice capture -> Sarvam ASR -> Schema extraction.",
        "Decentralized Provenance: Tamper-proof craft passport generation encoded into verifiable QR tokens."
      ]
    },
    {
      id: "ipa-tracking",
      title: "Real-Time Object Tracking & Modal DIP Inspection Suite",
      subtitle: "Digital Image Processing Benchmarking & Freeze-Frame Diagnostics",
      category: "Computer Vision",
      date: "Aug 2026",
      summary: "Comprehensive computer vision system benchmarking classical correlation filters against modern deep learning trackers, paired with an interactive 8-stage image processing diagnostic canvas.",
      highlights: [
        "Architected a modular tracking system benchmarking classical filters (CSRT, KCF, MOSSE) against YOLOv8n with BoT-SORT and ByteTrack.",
        "Engineered target ROI selection, real-time spatial trajectory telemetry, and automatic template-matching recovery upon occlusion.",
        "Engineered a freeze-frame diagnostic canvas executing 8-stage image processing: CLAHE, 256-bin histograms, Sobel/Laplacian spatial gradients, and morphological kernels.",
        "Benchmarked CSRT across 200 high-noise frames with 100% tracking success at 35.88 mean FPS."
      ],
      metrics: [
        { label: "Tracking Success", value: "100%" },
        { label: "Mean Processing", value: "35.88 FPS" },
        { label: "Filter Stages", value: "8-Stage Pipeline" },
        { label: "Tracking Algorithms", value: "CSRT, KCF, YOLOv8" }
      ],
      tags: ["Python", "OpenCV", "YOLOv8", "NumPy", "BoT-SORT", "ByteTrack", "Digital Image Processing"],
      githubUrl: "https://github.com/anishkarak4-ux/IPA_GIG",
      featured: true,
      interactiveType: "dip-canvas",
      architectureDetails: [
        "Telemetry Loop: Multi-threaded frame grabber with OpenCV highgui HUD displaying coordinate history.",
        "Occlusion Handling: Normalized Cross-Correlation (NCC) template fallback when confidence drops below 0.35.",
        "Diagnostic Canvas: Modular matrix operations executing CLAHE, adaptive thresholding, and gradient maps."
      ]
    },
    {
      id: "wasabi",
      title: "Wasabi – Autonomous Web Intelligence & Executive Briefs",
      subtitle: "LabAI Hackathon • Real-Time Market Signal Synthesis",
      category: "Systems & Backend",
      date: "Jun 2026",
      summary: "Enterprise competitive intelligence platform that autonomously ingests live web market signals and synthesizes executive briefs using Llama 3 on Groq LPUs.",
      highlights: [
        "Built automated real-time web scrapers leveraging Bright Data proxies to aggregate competitive market intelligence.",
        "Integrated Groq LPUs running Llama 3 for sub-second structured summarization and competitive delta reports.",
        "Designed an in-memory caching and state synchronization store in FastAPI, decoupling real-time UI dashboards from scraping latency.",
        "Engineered a responsive Next.js/Tailwind analytics frontend with real-time insight streaming."
      ],
      metrics: [
        { label: "Synthesis Engine", value: "Groq LPU (Llama 3)" },
        { label: "Scraping Throughput", value: "Distributed Proxies" },
        { label: "API Response", value: "Sub-Second" },
        { label: "Architecture", value: "Decoupled Async" }
      ],
      tags: ["Next.js", "FastAPI", "Python", "Groq LPU", "Llama 3", "Bright Data", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/anishkarak4-ux/wasabi",
      featured: false,
      architectureDetails: [
        "Signal Ingestion: Distributed web worker jobs capturing competitor pricing, releases, and changelogs.",
        "LLM Synthesis: Prompt-engineered Llama 3 pipeline generating structured markdown intelligence memos.",
        "State Layer: FastAPI in-memory TTL caching with WebSockets pushing updates to the Next.js client."
      ]
    },
    {
      id: "wellbore-geology",
      title: "Rogii Wellbore Geology Lithology Classification",
      subtitle: "Kaggle ML Competition • Subsurface Petrophysical Prediction",
      category: "Applied ML & AI",
      date: "Jul 2026",
      summary: "Machine learning solution predicting subsurface geological stratigraphy and rock formations from multi-sensor wellbore petrophysical log sequences.",
      highlights: [
        "Engineered feature transformations on gamma-ray, resistivity, and sonic logs including rolling statistical windows and gradient differentials.",
        "Trained gradient boosted ensembles (LightGBM & XGBoost) with stratified well-grouped cross-validation to prevent depth-leakage.",
        "Evaluated micro/macro F1 across imbalanced lithological classes, achieving robust generalization across unseen geological basins."
      ],
      metrics: [
        { label: "Cross-Validation", value: "Stratified Well-Group" },
        { label: "Algorithms", value: "XGBoost, LightGBM" },
        { label: "Domain", value: "Petrophysical ML" },
        { label: "Metric", value: "Macro F1" }
      ],
      tags: ["Python", "Kaggle", "Scikit-Learn", "LightGBM", "XGBoost", "Pandas", "Feature Engineering"],
      githubUrl: "https://github.com/anishkarak4-ux/wellbore-geology-prediction-kaggle-ml",
      featured: false,
      architectureDetails: [
        "Log Preprocessing: Median filtering, baseline shift removal, and quantile normalization.",
        "Ensemble Stacking: Blended probabilities from tree models with depth-sequence Markov smoothing."
      ]
    },
    {
      id: "musico",
      title: "MUSICO – Modern Web Audio Player Architecture",
      subtitle: "Spotube-Inspired Frontend Engineering & Web Audio Synthesis",
      category: "Full Stack",
      date: "May 2026",
      summary: "Modern web music player delivering a Spotify/Spotube-inspired dark aesthetic, playlist state synchronization, and low-latency audio manipulation.",
      highlights: [
        "Designed a glassmorphic, responsive interface with customized CSS custom properties and silky smooth transitions.",
        "Implemented custom audio playback queue controllers with shuffle, repeat, and persistent local storage state.",
        "Hooked into the browser Web Audio API for dynamic spectrum rendering and playback gain control."
      ],
      metrics: [
        { label: "Performance", value: "60 FPS UI" },
        { label: "Web Audio", value: "Low-Latency" },
        { label: "Theme", value: "Dark Glassmorphic" }
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "Web Audio API", "LocalStorage", "Responsive UI"],
      githubUrl: "https://github.com/anishkarak4-ux/MUSICO",
      featured: false,
      architectureDetails: [
        "State Engine: Event-driven pub/sub bus managing track changes, queue mutations, and volume curves.",
        "Audio Node Graph: SourceNode -> GainNode -> AnalyserNode -> Destination."
      ]
    },
    {
      id: "dsa-journey",
      title: "Algorithmic Problem Solving & System DSA",
      subtitle: "CodeSprint 3.0 Top 12 Finalist • Active LeetCode Implementations",
      category: "Systems & Backend",
      date: "Ongoing",
      summary: "Comprehensive repository of optimized algorithms, data structure designs, and competitive programming solutions spanning graphs, dynamic programming, and trees.",
      highlights: [
        "Ranked among the Top 12 finalists in KIIT USC CodeSprint 3.0 coding competition with 100% test case consistency.",
        "Implemented classical and advanced algorithms in C++ and Python: Dijkstra, Floyd-Warshall, Segment Trees, Trie, Union-Find.",
        "Maintained rigorous complexity analysis focusing on optimal memory usage and cache-friendly data layouts."
      ],
      metrics: [
        { label: "CodeSprint KIIT", value: "Top 12 Finalist" },
        { label: "Core Language", value: "C++ / Python" },
        { label: "Consistency", value: "100% Passes" }
      ],
      tags: ["C++", "Python", "Data Structures", "Algorithms", "Dynamic Programming", "Graph Theory"],
      githubUrl: "https://github.com/anishkarak4-ux/dsa-journey",
      featured: false,
      architectureDetails: [
        "Graph Algorithms: Custom adjacency list representations and bidirectional search routines.",
        "Tree Structures: Self-balancing AVL logic, Fenwick/Binary Indexed Trees, and lazy propagation."
      ]
    }
  ] as Project[],

  skills: [
    {
      title: "Core Languages",
      description: "Primary programming languages for systems, ML, and scalable web services.",
      skills: [
        { name: "Python", level: "Expert", tag: "Primary ML / Backend" },
        { name: "C++", level: "Advanced", tag: "DSA / Performance" },
        { name: "TypeScript", level: "Advanced", tag: "Full-Stack Frontend" },
        { name: "SQL (PostgreSQL)", level: "Advanced", tag: "Relational Queries" },
        { name: "JavaScript", level: "Advanced", tag: "Web Applications" },
        { name: "C", level: "Proficient", tag: "Systems Programming" },
        { name: "HTML5 / CSS3", level: "Expert", tag: "Modern Responsive" },
      ]
    },
    {
      title: "AI, ML & Computer Vision",
      description: "Frameworks and libraries for deep learning, vision models, and tabular intelligence.",
      skills: [
        { name: "FastAPI", level: "Expert", tag: "High-Throughput APIs" },
        { name: "OpenCV", level: "Expert", tag: "Vision Processing / Telemetry" },
        { name: "YOLOv8", level: "Advanced", tag: "Real-Time Object Detection" },
        { name: "ONNX Runtime", level: "Advanced", tag: "Quantized Inference" },
        { name: "TensorFlow / TFLite", level: "Advanced", tag: "Edge Model Deployment" },
        { name: "XGBoost & Scikit-Learn", level: "Expert", tag: "Gradient Boosting & ML" },
        { name: "NumPy & Pandas", level: "Expert", tag: "High-Dimensional Vectorization" },
        { name: "Entity Resolution", level: "Expert", tag: "Blocking & Pairwise Scoring" },
      ]
    },
    {
      title: "Frontend & Full Stack",
      description: "Modern component-driven web frameworks and UI design systems.",
      skills: [
        { name: "React", level: "Advanced", tag: "Component Architecture" },
        { name: "Next.js", level: "Advanced", tag: "Full-Stack SSR / SSG" },
        { name: "Tailwind CSS", level: "Expert", tag: "Responsive Design" },
        { name: "Vite", level: "Advanced", tag: "Modern Toolchain" },
        { name: "PWA & Offline First", level: "Advanced", tag: "Service Workers" },
      ]
    },
    {
      title: "Databases, Cloud & DevOps",
      description: "Data persistence, containerization, and developer tooling.",
      skills: [
        { name: "PostgreSQL", level: "Advanced", tag: "Relational DBMS" },
        { name: "SQLite & SQLAlchemy", level: "Advanced", tag: "ORM & Local Stores" },
        { name: "Docker", level: "Proficient", tag: "Containerized Services" },
        { name: "Git & GitHub", level: "Expert", tag: "Version Control / Actions" },
        { name: "Linux / Unix", level: "Advanced", tag: "CLI & Bash Tooling" },
        { name: "Firebase & Cloudinary", level: "Proficient", tag: "Cloud Storage / BaaS" },
        { name: "Postman", level: "Advanced", tag: "API Testing & Specs" },
      ]
    },
    {
      title: "Computer Science Fundamentals",
      description: "Theoretical grounding and rigorous computational problem-solving principles.",
      skills: [
        { name: "Data Structures & Algorithms", level: "Expert", tag: "Graphs / DP / Trees" },
        { name: "Object-Oriented Programming (OOP)", level: "Expert", tag: "Design Patterns" },
        { name: "Database Management Systems (DBMS)", level: "Advanced", tag: "ACID / Indexing" },
        { name: "Operating Systems (OS)", level: "Advanced", tag: "Processes / Concurrency" },
        { name: "Computer Networks", level: "Advanced", tag: "TCP/IP / HTTP Protocols" },
        { name: "Digital Image Processing (DIP)", level: "Advanced", tag: "Spatial Filters / FFT" },
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Kalinga Institute of Industrial Technology (KIIT)",
      location: "Bhubaneswar, Odisha, India",
      period: "Aug 2024 – May 2028 (Currently 3rd Year / 5th Semester)",
      grade: "Current CGPA: 9.24 / 10.0",
      details: [
        "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems, Computer Networks, Machine Learning, Digital Image Processing.",
        "Consistently maintained high academic standing in the top tier of the CSE cohort.",
        "Active member of university technical and coding societies."
      ]
    },
    {
      degree: "Senior Secondary (CBSE Class XII)",
      institution: "Purv International School",
      location: "Durgapur, West Bengal, India",
      period: "Apr 2022 – May 2024",
      grade: "CBSE Senior Secondary",
      details: [
        "Focus on Physics, Chemistry, Mathematics, and Computer Science.",
        "Built strong mathematical, analytical, and computational foundations."
      ]
    },
    {
      degree: "Secondary Education (ICSE Class X)",
      institution: "St. Xavier’s School",
      location: "Durgapur, West Bengal, India",
      period: "Apr 2011 – May 2022",
      grade: "Grade: 95.0%",
      details: [
        "Graduated with distinction and 95.0% aggregate score.",
        "Awarded academic honors for mathematics and science performance."
      ]
    }
  ] as EducationItem[],

  achievements: [
    {
      title: "Top 500 Placement (Unstop)",
      event: "Amazon ML Challenge 2026",
      year: "2026",
      description: "Secured Top 500 ranking out of thousands of nationwide engineering teams in the 72-hour Amazon ML Challenge. Engineered 8-rule inverted index blocking and 46 dense pairwise features to resolve 1.73M records.",
      badge: "National Top 500",
      iconName: "Award"
    },
    {
      title: "Finalist Selection",
      event: "Smart India Hackathon (SIH) 2026",
      year: "2026",
      description: "Selected as national finalist representing KIIT University with KarigarSaathi (Team SYNAPSE). Engineered a low-memory (512MB RAM) ONNX vision microservice and Sarvam AI Indic voice cataloging engine.",
      badge: "SIH Finalist",
      iconName: "Zap"
    },
    {
      title: "Top 12 Finalist",
      event: "CodeSprint 3.0 (USC.KIIT)",
      year: "2026",
      description: "Ranked among the Top 12 finalists in university-wide competitive programming tournament featuring complex graph theory, dynamic programming, and data structures challenges with 100% test case consistency.",
      badge: "Top 12 Finalist",
      iconName: "Code2"
    },
    {
      title: "Hackathon Participant",
      event: "LabAI Hackathon 2026",
      year: "2026",
      description: "Co-built Wasabi, an autonomous real-time market intelligence engine using Bright Data web proxies and Groq LPUs running Llama 3 with sub-second executive memo synthesis.",
      badge: "LabAI Participant",
      iconName: "Brain"
    },
    {
      title: "Competitor & Solver",
      event: "Kaggle Wellbore Geology & LeetCode",
      year: "Ongoing",
      description: "Active ML competitor on Kaggle (Rogii Wellbore Lithology challenge) and frequent algorithmic problem solver on LeetCode.",
      badge: "Active Competitor",
      iconName: "Activity"
    },
    {
      title: "Strategic Pursuits & Endurance",
      event: "Chess & Athletics",
      year: "Active",
      description: "Competitive chess enthusiast with ~1500 rating on Chess.com, applying tactical planning and rapid pattern recognition; regular distance endurance runner.",
      badge: "~1500 Chess.com",
      iconName: "Compass"
    }
  ] as AchievementItem[]
};
