export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  title: string;
  summary: string;
  resumePath: string;
  profilePhotoPath: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  email: string;
  phone: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: string[];
}

export interface WorkflowStep {
  step: number;
  title: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  technologies: string[];
  description: string;
  keyFeatures: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  workflowTitle: string;
  workflowSteps: WorkflowStep[];
}

export interface CertificationItem {
  name: string;
  organization: string;
  date: string;
  credentialUrl: string | null;
  category: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  gpa: string;
  period: string;
  status: string;
  location: string;
}

export interface AchievementItem {
  title: string;
  event: string;
  category: string;
  description: string;
  highlight: string;
}
