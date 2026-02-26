export type ExternalLink = {
  label: string
  href: string
}

export type AboutStat = {
  label: string
  value: string
}

export type AboutHero = {
  name: string
  title: string
  introParagraphs: string[]
  links: ExternalLink[]
  stats: AboutStat[]
  profileImage: {
    src: string
    alt: string
  }
}

export type ProjectFilter = 'all' | 'ai' | 'fullstack' | 'cloud'

export type MigratedProject = {
  title: string
  meta: string
  summary?: string
  bullets: string[]
  skills: string[]
  filters: Exclude<ProjectFilter, 'all'>[]
  links: ExternalLink[]
}

export type MigratedExperience = {
  company: string
  location: string
  role: string
  period: string
  bullets: string[]
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type PublicationItem = {
  title: string
  date: string
  venue: string
  summary: string
  links: ExternalLink[]
}

export type CertificationItem = {
  name: string
  issuer: string
  date: string
  credentialId?: string
  skills?: string[]
  link?: ExternalLink
}

export type EducationItem = {
  institution: string
  location: string
  degree: string
  period: string
  notes: string[]
}

export type ContactDetails = {
  heading: string
  subtitle: string
  primaryEmail: string
  fallbackEmail: string
  phone: string
  linkedIn: string
  linkedInLabel: string
  fallbackMessage: string
}

export const aboutHero: AboutHero = {
  name: 'Rahul Babu',
  title: 'Software Engineer',
  introParagraphs: [
    'Hello! I am Rahul, Software Engineer with experience in building AI agents, backend development, and cloud-native solutions. Skilled in building LLM-powered research assistants, NLP pipelines, and scalable APIs that process millions of records daily.',
    'At Hovian Inc., integrated AI and UX enhancements into an Electron + React desktop app by building reusable UI components, REST API integrations, and a Python-based LLM text-to-animated GIF generation pipeline, plus dark mode and native notifications.',
    'Previously at ASU\'s Decision Theater, built and deployed LLM + ML systems (RAG, automated eval tooling, and an opioid-risk forecasting dashboard) by automating data pipelines, integrating public datasets, and shipping interactive apps on Jetstream2 and Google Cloud Run.',
    'Core skills: Python, FastAPI, Django, Flask, React.js, LangChain, Hugging Face, Scikit-learn, PostgreSQL, MongoDB, AWS (EC2, RDS, S3, Glue, ECS), Docker, CI/CD. Certification: AWS Solutions Architect - Associate.',
    'I have 3 years of experience building AI-driven full-stack applications and analytics solutions using React, JavaScript, Python, and Java. I have also deployed containerized microservices on AWS (EC2, RDS, S3, DocumentDB) with CI/CD and monitoring through CloudWatch.'
  ],
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/rahul-1415'
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rahulb1407/'
    },
    {
      label: 'Portfolio',
      href: 'https://rahul-1415.github.io/'
    },
    {
      label: 'AWS Certification',
      href: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/ab66555f0c4d4fa69015b02bd7e4bdc5'
    }
  ],
  stats: [
    {
      label: 'Years Experience',
      value: '3'
    },
    {
      label: 'Projects',
      value: '16'
    },
    {
      label: 'Publications',
      value: '2'
    },
    {
      label: 'Certifications',
      value: '10'
    }
  ],
  profileImage: {
    src: '/assets/profile-photo.jpg',
    alt: 'Rahul Babu portrait photo'
  }
}

export const projectFilters: Array<{ id: ProjectFilter, label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'cloud', label: 'Cloud' }
]

export const migratedProjects: MigratedProject[] = [
  {
    title: 'Interactive Portfolio',
    meta: 'Next.js, TypeScript, Three.js, R3F, GraphQL, Hygraph | Dec 2025 - Current',
    bullets: [
      'Built and deployed an interactive 3D portfolio experience using Next.js and TypeScript with Three.js and React Three Fiber (Drei, Rapier) for immersive UI and animations.',
      'Integrated Hygraph (GraphCMS) using GraphQL and Apollo Client to manage portfolio content through a CMS-driven workflow.'
    ],
    skills: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'GraphQL', 'Hygraph'],
    filters: ['fullstack'],
    links: [
      {
        label: 'Live Demo',
        href: 'https://rahulbabu.netlify.app/'
      },
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Interactive-Portfolio'
      }
    ]
  },
  {
    title: 'ClimateActionPolicy RAG Application',
    meta: 'Streamlit, LangChain, ChromaDB, LLaMA 3, Transformers | July 2024 - Sept 2024',
    bullets: [
      'Deployed a Retrieval-Augmented Generation application that retrieves relevant policy documents and generates context-enriched responses for climate action recommendations.',
      'Built an interactive Streamlit chat interface with multi-session history so users can manage and review conversations.'
    ],
    skills: ['Streamlit', 'LangChain', 'ChromaDB', 'LLaMA 3', 'Transformers'],
    filters: ['ai', 'fullstack', 'cloud'],
    links: [
      {
        label: 'Live Demo',
        href: 'https://cap-rag.streamlit.app/'
      },
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/CAP-RAG'
      }
    ]
  },
  {
    title: 'Opioid Overdose Forecasting Data Visualizer',
    meta: 'React, TypeScript, FastAPI, Docker | April 2025 - May 2025',
    bullets: [
      'Developed an interactive web application to visualize Arizona opioid-risk data at the Census Block Group level using a FastAPI backend and React + TypeScript frontend.',
      'Designed backend filtering and API serving and packaged the system with a unified Dockerfile for streamlined deployment.'
    ],
    skills: ['React', 'TypeScript', 'FastAPI', 'Docker'],
    filters: ['fullstack', 'cloud'],
    links: [
      {
        label: 'Live Demo',
        href: 'https://opioid-overdose-forecasting.netlify.app/'
      },
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Opioid-Overdose-Forecasting'
      }
    ]
  },
  {
    title: 'Fake-Job-Detection',
    meta: 'Python, Machine Learning, NLP, Fraud Detection | Feb 2025 - May 2025',
    summary: 'Developed a fake job posting predictor to identify fraudulent listings that mimic legitimate roles and help improve trust and safety for job seekers and hiring platforms.',
    bullets: [
      'Built a machine learning workflow to classify job posts as real or fraudulent using textual and structured listing signals.',
      'Framed the system for real-world safety use cases, such as flagging suspicious listings before applicants share personal information or make payments.'
    ],
    skills: ['Python', 'Machine Learning', 'NLP', 'Fraud Detection', 'Classification'],
    filters: ['ai'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Fake-Job-Detection'
      }
    ]
  },
  {
    title: 'Distributed NoSQL Database System for an E-Commerce Platform',
    meta: 'Kafka, Redis, MongoDB, FastAPI | Sep 2024 - Dec 2024',
    bullets: [
      'Designed a distributed NoSQL database system using Kafka, Redis, and MongoDB, achieving 100% consistency post-recovery and under 500 ms average response time for e-commerce data operations in fault-tolerant scenarios.',
      'Optimized cross-region replication with FastAPI middleware, ensuring zero data loss during node failures and 248 ms response times during outages through Kafka-backed asynchronous recovery.'
    ],
    skills: [
      'Kafka',
      'Redis',
      'MongoDB',
      'FastAPI',
      'Distributed Systems',
      'NoSQL',
      'Fault Tolerance',
      'Cross-Region Replication'
    ],
    filters: ['fullstack', 'cloud'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Distributed-NoSQL-Database-System-for-an-E-Commerce-Platform'
      }
    ]
  },
  {
    title: 'User Identification, Authentication, and Interactions for Social Media Data Analytics using AI',
    meta: 'AI Research, Social Media Analytics, Team Leadership | Sep 2024 - Dec 2024',
    summary: 'Led a research project as the team lead for an 8-member group and documented a 60-page research paper on user identification, authentication, and interaction analysis for social media data analytics using AI.',
    bullets: [
      'Directed project planning, research coordination, and technical execution across an 8-member team.',
      'Compiled and authored a comprehensive 60-page technical research report covering system design, experimentation, and findings.'
    ],
    skills: [
      'Artificial Intelligence',
      'Social Media Analytics',
      'User Authentication',
      'Research Leadership',
      'Technical Documentation'
    ],
    filters: ['ai'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/User-Identification-Authentication-and-Interactions-for-Social-Media-Data-Analytics-using-AI'
      }
    ]
  },
  {
    title: 'Movie Review WebApp',
    meta: 'React Search UI, Elastic App Search, Node.js, npm | Aug 2024 - Sep 2024',
    summary: 'Built a configurable movie-review search experience using Elastic Search UI with App Search engine integration, designed for quick setup, customization, and static deployment.',
    bullets: [
      'Implemented engine-driven search configuration via JSON (engine.json) for fields, facets, sorting, and query suggestions without regenerating the app.',
      'Set up reproducible local development with Node 16.13.0 and npm, and enabled static asset build-and-embed workflow for production hosting.'
    ],
    skills: [
      'React',
      'Elastic Search UI',
      'Elastic App Search',
      'Node.js',
      'npm',
      'JSON Configuration',
      'Static Build',
      'Netlify Deployment'
    ],
    filters: ['fullstack', 'cloud'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Movie-Review-WebApp'
      }
    ]
  },
  {
    title: 'LLM Response Aggregation Tool',
    meta: 'Selenium IDE, Python, LLM Evaluation, Data Automation | May 2024 - Jul 2024',
    summary: 'Built a web automation and evaluation pipeline to run prompts through multiple LLMs, aggregate responses in structured sheets, and benchmark output quality with NLP metrics.',
    bullets: [
      'Automated prompt execution with Selenium IDE across ChatGPT, Gemini, Claude, Perplexity, Meta AI, and HuggingChat using a localhost prompt-reader workflow.',
      'Captured model responses in Google Forms and exported to Excel/CSV for downstream analysis and reporting.',
      'Implemented Python-based evaluation workflows (Response_Evaluation.ipynb) using BLEU, ROUGE, cosine similarity, Distinct-1/2, sentiment, response-length analysis, and word clouds.',
      'Included data-scraping support for 790 climate policy articles from c40knowledgehub.org to build evaluation and comparison datasets.'
    ],
    skills: [
      'Selenium IDE',
      'Python',
      'LLM Benchmarking',
      'BLEU',
      'ROUGE',
      'Cosine Similarity',
      'Distinct-1/2',
      'Data Automation'
    ],
    filters: ['ai', 'fullstack', 'cloud'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/LLM-AggregationTool'
      }
    ]
  },
  {
    title: 'Sentiment Analysis on Twitter Datasets (NLP)',
    meta: 'Python, Amazon SageMaker | Jan 2024 - May 2024',
    bullets: [
      'Implemented SVM, Logistic Regression, Naive Bayes, XGBoost, BiLSTM, and CNN models on 416K tweets, achieving 97% accuracy with CNN using TF-IDF/word-embedding preprocessing and stratified sampling.',
      'Identified SVM as the most robust model (94.15% accuracy) through comparative ROC and confusion matrix analysis.'
    ],
    skills: [
      'Python',
      'Amazon SageMaker',
      'NLP',
      'SVM',
      'Logistic Regression',
      'Naive Bayes',
      'XGBoost',
      'BiLSTM',
      'CNN',
      'TF-IDF'
    ],
    filters: ['ai', 'cloud'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Sentiment-Analysis-on-Twitter-Datasets'
      }
    ]
  },
  {
    title: 'IoT Device Manager using Blockchain',
    meta: 'Jan 2023 - May 2023',
    summary: 'This project focuses on establishing a robust and secure framework for the management of IoT devices, underpinned by the principles of data immutability and transparency, all facilitated by the innovative use of blockchain technology.',
    bullets: [
      'Implemented a blockchain-based solution for IoT device management.',
      'Recorded critical transactions including device registration, management, and ownership transfers.',
      'Developed a user-friendly web application using ReactJS.'
    ],
    skills: ['MetaMask', 'Truffle Framework', 'Ganache', 'Solidity', 'React.js'],
    filters: ['fullstack'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/IOTDM'
      }
    ]
  },
  {
    title: 'Forest Monitoring using Hyperspectral Imaging',
    meta: 'Nov 2022 - May 2023',
    summary: 'This project focuses on utilizing hyperspectral imaging for forest terrain monitoring, aiming to provide detailed insights into forest contents and potential risks. It utilizes the Indian Pines dataset and employs a hybrid classification method for precise forest analysis.',
    bullets: [
      'Utilized Indian Pines dataset for hyperspectral imaging.',
      'Employed hybrid classification methods combining SVM, 2D CNN, 3D CNN, M3D-CNN, SSRN, and a Hybrid model.',
      'Provided comprehensive insights including vegetation cover percentage, building presence, and hazard detection.'
    ],
    skills: [
      'Scikit-Learn',
      'Machine Learning',
      'TensorFlow',
      'Exploratory Data Analysis',
      'NumPy',
      'Data Science',
      'Data Analysis',
      'Python',
      'Pandas'
    ],
    filters: ['ai'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Forest-Monitoring'
      }
    ]
  },
  {
    title: 'Web Phishing Detection',
    meta: 'Aug 2022 - Nov 2022',
    summary: 'The Web Phishing Detection project is a Python-based solution deployed on the IBM Cloud platform, focused on the detection of phishing websites. It incorporates machine learning techniques to enhance accuracy.',
    bullets: [
      'Trained 10 machine learning models for phishing detection.',
      'Deployed the highest accuracy model on IBM Cloud.',
      'Developed a website interface for user interaction with the phishing detection system.'
    ],
    skills: [
      'Machine Learning',
      'Exploratory Data Analysis',
      'Data Science',
      'Data Analysis',
      'Python'
    ],
    filters: ['ai', 'cloud'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/IBM-Project-4998-1658745015'
      }
    ]
  },
  {
    title: 'Path Navigation using Deep Q Learning',
    meta: 'Jan 2022 - Sep 2022',
    summary: 'An application developed using Kivy and PyTorch Framework. The application simulates an autonomous vehicle navigating a map I designed, complete with manually placed obstacles.',
    bullets: [
      'Used Deep Q Networks (DQNs) with relu activation functions for navigation.',
      'Designed a reward system to improve obstacle avoidance capabilities.',
      'Received approval for publication in ADCOM Volume 133.'
    ],
    skills: ['Machine Learning', 'NumPy', 'Python'],
    filters: ['ai'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/PathNavigation/tree/main/PathNavigation'
      }
    ]
  },
  {
    title: 'Tournament Manager',
    meta: 'Jul 2021 - Nov 2021',
    summary: 'The Tournament Manager is a Java-based application designed to facilitate the efficient organization of sports tournaments.',
    bullets: [
      'Designed and configured tournaments for different divisions and sports.',
      'Streamlined team enrollment and player information updates.',
      'Developed using Java and MySQL.'
    ],
    skills: ['Java'],
    filters: ['fullstack'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Tournament-Manager/tree/main/Tournament_Manager'
      }
    ]
  },
  {
    title: 'Harmful Comments Classifier',
    meta: 'Jan 2021 - Apr 2021',
    summary: 'The Harmful Comments Classifier is a Python-based Natural Language Processing (NLP) project, executed within the Google Colab environment.',
    bullets: [
      'Developed a deep learning model for classifying comments based on toxicity.',
      'Utilized embedding techniques, bi-directional LSTM, and dense models.',
      'Executed within the Google Colab environment.'
    ],
    skills: [
      'Machine Learning',
      'Exploratory Data Analysis',
      'Data Science',
      'Data Analysis',
      'Python'
    ],
    filters: ['ai'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/Harmful-Comments-Classifier'
      }
    ]
  },
  {
    title: 'EATERIO',
    meta: 'Jan 2020 - May 2020',
    summary: 'EATERIO is a web application built using HTML, CSS, JavaScript, and MongoDB, designed to facilitate food ordering and management within organizations.',
    bullets: [
      'Streamlined the food ordering process within organizations.',
      'Developed using HTML, CSS, JavaScript, and MongoDB.',
      'Provided a user-friendly interface for placing and managing food orders.'
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
    filters: ['fullstack'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/rahul-1415/EATERIO'
      }
    ]
  }
]

export const migratedExperiences: MigratedExperience[] = [
  {
    company: 'Hovian Inc.',
    location: 'Cucamanga, California, USA',
    role: 'Software Engineer',
    period: 'July 2025 - Dec 2025',
    bullets: [
      'Built and maintained an Electron + React single-page desktop application using React, JavaScript/TypeScript, HTML5, and CSS3, supporting multiple interactive UI views for notification and workflow management.',
      'Designed and shipped 20+ modular, reusable React components (chat UI, prompt inputs, settings panels, toggles) to support dynamic features such as AI chat, theme switching, and workflow navigation.',
      'Managed client-side state and UI transitions (component-level state + shared app state), reducing UI-related bugs and improving interaction responsiveness and UX consistency.',
      'Integrated frontend modules with backend services via RESTful APIs, implementing reliable data fetching, loading states, and error handling for daily user workflows.',
      'Developed Python-based image processing utilities to power an AI Animated GIF feature (sprite sheet slicing, pixelation with PIL, GIF assembly with imageio), delivering animated outputs from text prompts.',
      'Implemented dark mode with persisted user preferences and OS theme sync, and integrated native desktop notifications via Electron APIs to ensure alerts triggered reliably even when the app was minimized.',
      'Implemented a hybrid backend communication layer using Node.js with REST (HTTP) APIs and WebSockets to stream real-time Outlook notifications and support AI-generated responses.',
      'Built and maintained an Electron + Node.js desktop app with tabbed and multi-view navigation using JavaScript, HTML5, and CSS3 to support notification and workflow management.'
    ]
  },
  {
    company: 'ASU Decision Theater',
    location: 'Tempe, Arizona, USA',
    role: 'Software Engineer',
    period: 'May 2024 - May 2025',
    bullets: [
      'Designed and implemented a machine learning pipeline using Python and R to analyze 50K+ census and public health datasets for regional risk prediction.',
      'Trained and evaluated predictive models using XGBoost and ensemble techniques, focusing on accuracy and interpretability.',
      'Built a real-time interactive risk dashboard using React and TypeScript, supporting 10+ dynamic visual components and deployed with FastAPI and Docker on Google Cloud Run.',
      'Developed backend API services using FastAPI to serve dashboard data, enabling low-latency access for real-time filtering and visualization.',
      'Automated large-scale data collection using Python and Selenium, gathering 1,000+ healthcare survey responses and 795 climate policy documents, followed by structured analysis and evaluation to measure LLM resilience on heat and healthcare prompts.',
      'Deployed a RAG-based chatbot using Llama 3, LangChain, and Chroma on Jetstream2 HPC to summarize 100+ interview transcripts for the Maricopa Association of Governments and support ASU\'s LLM resilience research with climate policy recommendations.',
      'Performed geospatial opioid risk analysis using PostGIS by writing spatial SQL queries (proximity and region joins, hotspot-style aggregations) to map overdose patterns and generate region-level insights for the dashboard.'
    ]
  },
  {
    company: 'InnoHat Systems',
    location: 'Chennai, TN, India',
    role: 'Software Developer',
    period: 'Jan 2022 - July 2023',
    bullets: [
      'Designed hybrid storage using PostgreSQL for transactions and MongoDB for product metadata and user reviews, reducing schema-change overhead while keeping financial data ACID-compliant.',
      'Built Flask REST APIs for checkout, refunds, and shipment events, with 200+ test cases in pytest to reach 85% coverage and reduce regression bugs.',
      'Orchestrated ETL pipelines in Python (pandas, SQLAlchemy, and PyMongo) to merge order history with review sentiment data, optimizing runtime by 40% on 20M+ rows and 5M+ documents.',
      'Containerized services with Docker and deployed on AWS (EC2, RDS, S3, DocumentDB) with CloudWatch monitoring to maintain stability during seasonal traffic spikes.',
      'Developed a Django admin panel for managing promotions, vendors, and warehouse sync, replacing manual spreadsheet workflows and reducing operations effort by 12 hours per week.',
      'Created a React.js customer portal for browsing catalogs and personalized deals, integrating cache and lazy loading to reduce page load time by 35%.',
      'Trained a scikit-learn recommendation engine using transactional PostgreSQL and behavioral MongoDB data, improving upsell conversion by 11% in pilot rollout.'
    ]
  }
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend and Data',
    items: [
      'Python (Pandas, NumPy, Async Programming)',
      'Django',
      'Flask',
      'FastAPI',
      'Java',
      'RESTful API Development',
      'Microservices',
      'Scalability',
      'Database Management (SQL, PostgreSQL, MySQL)',
      'Node.js & Express',
      'GraphQL',
      'API Integration'
    ]
  },
  {
    title: 'Frontend',
    items: [
      'Angular',
      'React',
      'TypeScript',
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'State Management',
      'Component Architecture',
      'Lazy Loading',
      'Responsive UI Design',
      'Webpack'
    ]
  },
  {
    title: 'AI and Machine Learning',
    items: [
      'LLM Development (GPT-4, LLaMA)',
      'LangChain',
      'RAG Frameworks',
      'Prompt Engineering & Optimization',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'XGBoost',
      'Hugging Face Transformers',
      'spaCy (NLP)'
    ]
  },
  {
    title: 'Cloud and Delivery',
    items: [
      'AWS',
      'Data Pipelines (ETL, Ingestion, Validation, Warehousing, Transformation)',
      'Data Lake',
      'Data Governance & Quality',
      'Git/GitHub/GitLab'
    ]
  }
]

export const publications: PublicationItem[] = [
  {
    title: 'Performance within the Foundation Paradox',
    date: 'Feb 2026',
    venue: 'The Case for Small, Qualitative Evaluations (SQEs) for Grading LLM Chat Responses for Extreme Heat Adaptation and Other Less-Bonded Fields - Submitted (In Progress)',
    summary: 'Co-authored a research study introducing the Desert Language Model Evaluation Framework (DLEF) to assess LLM performance in extreme heat adaptation and show domain-specific strengths and limitations that large-scale benchmarks can miss.',
    links: []
  },
  {
    title: 'An Automatic Path Navigation for Visually Challenged People using Deep Q Learning',
    date: 'Jan 2023',
    venue: 'Advances in Computers, Elsevier, Volume 132 (2024), Pages 205-218',
    summary: 'Published a study on autonomous navigation that uses a Deep Q-Learning model with a reward-penalty mechanism to train an agent in a generated environment for real-world obstacle avoidance.',
    links: []
  }
]

export const certifications: CertificationItem[] = [
  {
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Issued May 2025 - Expires May 2028',
    link: {
      label: 'Show Credential',
      href: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/ab66555f0c4d4fa69015b02bd7e4bdc5'
    }
  },
  {
    name: 'AIG - Actuarial Analyst',
    issuer: 'Forage',
    date: 'Issued Sep 2025',
    credentialId: '6D2BARv5wgwb9AqEx',
    skills: ['Data Analysis', 'Visual Analytics'],
    link: {
      label: 'Show Credential',
      href: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/4nAmAbTbHbnGMNSyo/b7MfbG9W4iCNGnd23_4nAmAbTbHbnGMNSyo_68c0c162a8bab8f37499f4fe_1757464209554_completion_certificate.pdf'
    }
  },
  {
    name: 'COEBC - Code of Ethical Business Conduct Training',
    issuer: 'CITI Program',
    date: 'Issued Jun 2024',
    credentialId: '60593265',
    link: {
      label: 'Show Credential',
      href: 'https://www.citiprogram.org/verify/?wcbcd3d78-36dc-436e-9a18-03b7a65d2667-60593265'
    }
  },
  {
    name: 'RCR - Graduate Student and Postdoctoral Researcher Responsible Conduct of Research',
    issuer: 'CITI Program',
    date: 'Issued Jun 2024',
    credentialId: '63090511',
    link: {
      label: 'Show Credential',
      href: 'https://www.citiprogram.org/verify/?w58a49120-ed91-4173-a64b-7f0f572872e9-63090511'
    }
  },
  {
    name: 'IRB - Social & Behavioral Research (Group 2)',
    issuer: 'CITI Program',
    date: 'Issued Jan 2024 - Expires Jan 2028',
    credentialId: '60593339',
    link: {
      label: 'Show Credential',
      href: 'https://www.citiprogram.org/verify/?w71f8c2ca-2167-4717-9208-d58cdf528614-60593339'
    }
  },
  {
    name: 'Computer Architecture and Computer Organization Masterclass',
    issuer: 'Udemy',
    date: 'Issued Feb 2024',
    credentialId: 'UC-4a6796d5-5009-4e25-af33-bcd88d61649b',
    skills: ['Computer Architecture'],
    link: {
      label: 'Show Credential',
      href: 'https://www.udemy.com/certificate/UC-4a6796d5-5009-4e25-af33-bcd88d61649b/'
    }
  },
  {
    name: 'Applied Data Science Capstone',
    issuer: 'Coursera',
    date: 'Issued Aug 2023',
    credentialId: '4LQXS9ZN4373',
    skills: ['Exploratory Data Analysis', 'Visual Analytics', 'Data Science', 'Data Analysis'],
    link: {
      label: 'Show Credential',
      href: 'https://www.coursera.org/verify/4LQXS9ZN4373'
    }
  },
  {
    name: 'Foundations of User Experience (UX) Design',
    issuer: 'Coursera',
    date: 'Issued Aug 2023',
    credentialId: 'LMHXK6GDTHZ9',
    skills: ['User Experience (UX)', 'Wireframing'],
    link: {
      label: 'Show Credential',
      href: 'https://www.coursera.org/verify/LMHXK6GDTHZ9'
    }
  },
  {
    name: 'DevOps Beginners to Advanced with Projects - 2023',
    issuer: 'Udemy',
    date: 'Issued Aug 2023',
    credentialId: 'UC-09351ca5-91b3-4cda-8beb-b87d7e80a6d9',
    skills: ['Scripting', 'Docker', 'Linux', 'Kubernetes', 'Amazon Web Services (AWS)'],
    link: {
      label: 'Show Credential',
      href: 'https://www.udemy.com/certificate/UC-09351ca5-91b3-4cda-8beb-b87d7e80a6d9/'
    }
  },
  {
    name: 'Angular - The Complete Guide (2023 Edition)',
    issuer: 'Udemy',
    date: 'Issued Jun 2023',
    credentialId: 'UC-1bc4bd69-2022-4696-a861-135f3688bb57',
    skills: ['AngularJS', 'Microsoft Visual Studio Code', 'Angular'],
    link: {
      label: 'Show Credential',
      href: 'https://www.udemy.com/certificate/UC-1bc4bd69-2022-4696-a861-135f3688bb57/'
    }
  }
]

export const education: EducationItem[] = [
  {
    institution: 'Arizona State University',
    location: 'Tempe, AZ, USA',
    degree: 'Master of Science in Computer Science',
    period: 'Aug 2023 - May 2025',
    notes: ['CGPA: 3.83/4']
  },
  {
    institution: 'Madras Institute of Technology, Anna University',
    location: 'Chennai, TN, India',
    degree: 'Bachelor of Engineering in Computer Science',
    period: 'July 2019 - June 2023',
    notes: ['CGPA: 8.69/10']
  }
]

export const contactDetails: ContactDetails = {
  heading: 'Open to Roles and Collaboration',
  subtitle: 'Share your project context and timeline. I will respond with practical next steps.',
  primaryEmail: 'rahulbabu1407@gmail.com',
  fallbackEmail: 'rahulb1407@gmail.com',
  phone: '+1 (602) 517-1962',
  linkedIn: 'https://www.linkedin.com/in/rahulb1407/',
  linkedInLabel: 'linkedin.com/in/rahulb1407/',
  fallbackMessage: 'Unable to send right now. Please email rahulbabu1407@gmail.com.'
}
