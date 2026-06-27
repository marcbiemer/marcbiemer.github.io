// src/data/content.ts
import rawContent from '../../public/data/content.json';

// Type your content structure
export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  url?: string;
  tags: string[];
  heroImg?: string;
};

export type Content = {
  bio: string;
  projects: Project[];
  socials: { label: string; url: string }[];
};

// Cast and validate at import time
const content = rawContent as Content;

// Optional: basic runtime validation in development
if (process.env.NODE_ENV === 'development') {
  if (!content.bio) console.warn('content.json: missing bio');
  if (!Array.isArray(content.projects)) console.warn('content.json: projects should be an array');
}

export default content;