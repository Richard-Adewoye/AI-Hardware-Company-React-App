export interface Company {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  completedProjects: number;
  established: string;
  tags: string[];
  bannerUrl: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  companyId: string;
  imageUrl: string;
  likes: number;
  comments: number;
  yearRange: string;
  status: 'Completed' | 'In Progress' | 'Beta Testing';
  description: string;
  techStack: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Machine Learning' | 'Computer Vision' | 'Neural Synthesis' | 'Data Analytics';
  promptText: string;
  copiesCount: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}
