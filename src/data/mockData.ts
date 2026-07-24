import { Company, Project, PromptTemplate, Review } from '../types';

export const COMPANIES: Company[] = [
  {
    id: 'aempore-ai',
    name: 'Aempore AI',
    category: 'Robotics & Hardware',
    description: "Aempore AI is a leading manufacturer of cutting-edge technology. We're passionate about advancing technology and making the impossible possible.",
    phone: '0971-55319870',
    email: 'info@aemporeai.io',
    location: 'Zurich, Switzerland',
    completedProjects: 237,
    established: '2021',
    tags: ['Machine Learning', 'Computer Vision', 'Robotics', '3D Machineries'],
    bannerUrl: '/src/assets/images/hero_futuristic_sphere_1784930005400.jpg'
  },
  {
    id: 'neural-intellect',
    name: 'Neural Intellect',
    category: 'Generative Models',
    description: 'Architecting deep multi-modal transformer networks for industrial automation and autonomous robotics control.',
    phone: '0971-55829104',
    email: 'contact@neuralintellect.ai',
    location: 'London, UK',
    completedProjects: 184,
    established: '2022',
    tags: ['Transformer Networks', 'Autonomous Logic', 'DSP'],
    bannerUrl: '/src/assets/images/hero_futuristic_sphere_1784930005400.jpg'
  },
  {
    id: 'data-wizards',
    name: 'Data Wizards',
    category: 'Big Data & ML Ops',
    description: 'Pioneering ultra-fast vector indices, real-time telemetry processing, and hyper-scalable enterprise data pipelines.',
    phone: '0971-55102938',
    email: 'labs@datawizards.io',
    location: 'San Francisco, USA',
    completedProjects: 312,
    established: '2020',
    tags: ['Vector DB', 'ETL Automation', 'Real-time Telemetry'],
    bannerUrl: '/src/assets/images/hero_futuristic_sphere_1784930005400.jpg'
  },
  {
    id: 'brain-trust',
    name: 'Brain Trust',
    category: 'Cognitive Computing',
    description: 'Collaborative AI think-tank specializing in human-computer synergy, neural implants interface, and ethical AI frameworks.',
    phone: '0971-55930211',
    email: 'connect@braintrust.org',
    location: 'Berlin, Germany',
    completedProjects: 145,
    established: '2019',
    tags: ['Neuro-Sensing', 'Ethical AI', 'BCI Hardware'],
    bannerUrl: '/src/assets/images/hero_futuristic_sphere_1784930005400.jpg'
  },
  {
    id: 'ai-pioneers',
    name: 'AI Pioneers',
    category: 'Quantum Computing',
    description: 'Exploring quantum tensor fields and next-generation silicon photonics to push computation speed beyond conventional limits.',
    phone: '0971-55443322',
    email: 'research@aipioneers.net',
    location: 'Tokyo, Japan',
    completedProjects: 96,
    established: '2023',
    tags: ['Quantum Tensor', 'Photonics', 'Deep Physics'],
    bannerUrl: '/src/assets/images/hero_futuristic_sphere_1784930005400.jpg'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-03',
    number: '03',
    title: 'Futuristic Machineries',
    subtitle: "Let's Bright the future by learning",
    tagline: 'Autonomous heavy precision robotics and kinetic glass structures',
    category: 'Industrial Design',
    companyId: 'aempore-ai',
    imageUrl: '/src/assets/images/hero_futuristic_sphere_1784930005400.jpg',
    likes: 128,
    comments: 42,
    yearRange: '2022-2023',
    status: 'Completed',
    description: 'An advanced micro-precision machinery framework powered by real-time spatial vision sensors and custom acoustic feedback loops.',
    techStack: ['Spatial Vision 4.0', 'Kinetic Glass Composites', 'Neural Motion Engine', 'Rust Edge SDK']
  },
  {
    id: 'proj-04',
    number: '04',
    title: 'Customer segmentation for Ecommerce Platform',
    subtitle: 'Hyper-personalized user persona cluster model',
    tagline: 'Real-time behavior prediction and 3D product rendering pipeline',
    category: 'Machine Learning',
    companyId: 'aempore-ai',
    imageUrl: '/src/assets/images/ecommerce_segmentation_knot_1784930018671.jpg',
    likes: 47,
    comments: 29,
    yearRange: '2023-2024',
    status: 'In Progress',
    description: 'Dynamic customer segmentation model utilizing unsupervised graph neural networks to predict purchase trajectories with 98.4% accuracy.',
    techStack: ['Graph Neural Networks', 'PyTorch Distributed', 'WebGL Render Engine', 'FastAPI Proxy']
  },
  {
    id: 'proj-01',
    number: '01',
    title: 'Autonomous Vision Unit',
    subtitle: 'Zero-latency optical tracking for industrial drone swarms',
    tagline: 'Sub-millimeter depth sensing under extreme outdoor illumination',
    category: 'Computer Vision',
    companyId: 'aempore-ai',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    likes: 89,
    comments: 18,
    yearRange: '2021-2022',
    status: 'Completed',
    description: 'Optical depth array engineered for sub-millimeter positioning accuracy in complex warehouse environments.',
    techStack: ['CUDA Optics', 'Stereo Depth Mapping', 'TensorRT']
  },
  {
    id: 'proj-02',
    number: '02',
    title: 'Bio-Sensing Tactile Glove',
    subtitle: 'Haptic feedback array for remote machinery steering',
    tagline: 'Ultra-sensitive force response sensors with 0.2ms delay',
    category: 'Haptics & Robotics',
    companyId: 'aempore-ai',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    likes: 210,
    comments: 64,
    yearRange: '2022-2023',
    status: 'Completed',
    description: 'Haptic glove enabling surgeons and industrial engineers to operate remote micro-machinery with high fidelity touch feedback.',
    techStack: ['Piezoelectric Haptics', 'BLE 5.3 Low Latency', 'C++ Embedded']
  }
];

export const PROMPTS: PromptTemplate[] = [
  {
    id: 'prompt-1',
    title: '3D Glassmorphic Object Generation',
    category: 'Neural Synthesis',
    promptText: 'A high-definition 3D render of a floating translucent glass sculpture with soft iridescent reflections, surrounded by fluid metallic rings on a minimalist off-white background, soft studio lighting --ar 4:3 --v 6.0',
    copiesCount: 1420
  },
  {
    id: 'prompt-2',
    title: 'Precision Machine Movement Trajectory',
    category: 'Machine Learning',
    promptText: 'Calculate optimal cubic spline paths for 6-DOF robotic arms operating in tight spatial constraints with obstacle avoidance cost function.',
    copiesCount: 890
  },
  {
    id: 'prompt-3',
    title: 'Optical Surface Defect Classification',
    category: 'Computer Vision',
    promptText: 'Detect micro-cracks and surface anomalies in high-gloss composite materials using zero-shot segment-anything model with thermal contrast overlay.',
    copiesCount: 654
  },
  {
    id: 'prompt-4',
    title: 'Ecommerce Behavior Cluster Model',
    category: 'Data Analytics',
    promptText: 'Segment high-value multi-category buyers using HDBSCAN dimensionality reduction and generate dynamic discount sensitivity profiles.',
    copiesCount: 1120
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Lead Creative Director',
    company: 'Qclay Agency',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Aempore AI provided us with unmatched precision machineries and neural software integrations. The attention to futuristic design and execution is phenomenal.',
    date: 'Jan 14, 2024'
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Head of Robotics',
    company: 'AeroTech Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'The 3D vision systems and real-time kinetic sensors seamlessly integrated into our assembly line. Outstanding engineering standards.',
    date: 'Dec 28, 2023'
  },
  {
    id: 'rev-3',
    author: 'Sarah Lin',
    role: 'VP of Product',
    company: 'OmniData Labs',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Working with Aempore AI felt like stepping five years into the future. Their customer segmentation models yielded immediate ROI.',
    date: 'Nov 02, 2023'
  }
];
