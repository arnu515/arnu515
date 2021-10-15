export interface Project {
  name: string;
  created_at: string;
  description: string;
  source_url?: string;
  source_type?: "github" | "gitlab";
  project_link?: string;
}

export interface Post {
  slug: string;
  status: "published";
  created_by: string;
  created_at: string;
  title: string;
  updated_at?: string;
  description: string;
  cover_url?: string;
  content: string;
}
