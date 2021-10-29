export interface Project {
  name: string;
  description: string;
  link?: string;
  image?: string;
  source?: string;
  sourceType?: "github" | "gitlab";
  language?: "python" | "javascript" | "java";
}

export default [
  {
    name: "Don't Trust",
    description: "Python library for form validation",
    link: "https://pypi.org/project/donttrust",
    source: "https://github.com/arnu515/donttrust",
    sourceType: "github",
    language: "python"
  },
  {
    name: "arnu515.gq",
    description: "Personal website",
    link: "https://arnu515.gq",
    source: "https://github.com/arnu515/arnu515",
    sourceType: "github",
    language: "javascript"
  },
  {
    name: "Github Tracker",
    description:
      "Github tracker that sends push notifications on new issues and PRs on tracked repos",
    source: "https://github.com/arnu515/github-tracker",
    sourceType: "github",
    language: "javascript"
  }
] as Project[];
