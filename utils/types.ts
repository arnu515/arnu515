export interface Project {
  name: string;
  created_at: string;
  description: string;
  source_url?: string;
  source_type?: "github" | "gitlab";
  project_link?: string;
}
