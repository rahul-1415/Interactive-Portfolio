export interface Personal {
  name: string
  title: string
  location: string
  email: string
  phone: string
  resume_url: string
}

export interface SocialLinks {
  github: string
  linkedin: string
  instagram: string
  twitter_x: string
  medium: string
}

export interface Stats {
  years_experience: number
  projects: number
  publications: number
  certifications: number
}

export interface Education {
  institution: string
  location: string
  degree: string
  start?: string
  end?: string
  gpa?: string
}

export interface Experience {
  company: string
  location: string
  role: string
  start: string
  end: string
  bullets: string[]
}

export interface Project {
  name: string
  tech: string[]
  start: string
  end: string
  live_url?: string
  code_url?: string
  description?: string
  bullets: string[]
}

export interface Publication {
  type: string
  title: string
  date: string
  status: string
  description: string
  venue?: string
}

export interface Certification {
  name: string
  issuer: string
  issued: string
  expires?: string
  credential_id: string
  skills?: string[]
  url: string
}

export interface Skills {
  backend: string[]
  frontend: string[]
  ai_ml: string[]
  data_engineering: string[]
  cloud_devops: string[]
  developer_workflow: string[]
}

export interface Blog {
  title: string
  tech: string[]
  description: string
  live_url: string
  medium_url: string
  code_url: string
}

export interface PortfolioData {
  personal: Personal
  social_links: SocialLinks
  summary: string
  stats: Stats
  interests: string[]
  education: Education[]
  experience: Experience[]
  projects: Project[]
  publications: Publication[]
  certifications: Certification[]
  skills: Skills
  blogs: Blog[]
}
