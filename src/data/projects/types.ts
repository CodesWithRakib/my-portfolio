//data/projects/types.ts
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  images: string[];
  githubClient?: string;
  githubServer?: string;
  liveLink?: string;
  category: string;
  date: string;
  client: string;
  tags: string[];
  duration: string;
  teamSize: number;
  users: number;
  testimonials: Testimonial[];
  awards: Award[];
  challenges: string[];
  futureImprovements: string[];
}
