export interface Personal {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  available: boolean;
  resumeUrl: string;
  avatarUrl?: string;
  ogImage?: string;
  metrics: {
    label: string;
    value: string;
  }[];
}
