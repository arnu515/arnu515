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
    link: "https://donttrust.gq",
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
  },
  {
    name: "Twitter Clone",
    description: "My first project! Twitter clone with Flask and React",
    source: "https://github.com/arnu515/twitter-clone",
    sourceType: "github",
    language: ["python", "javascript"]
  },
  {
    name: "Instagram clone",
    description: "Instagram clone with Svelte and Strapi",
    source: "https://github.com/arnu515/quickstagram",
    sourceType: "github",
    language: "javascript"
  },
  {
    name: "Serverless Chat",
    description: "A chat application built with serverless technologies only",
    source: "https://github.com/arnu515/serverless-chat",
    sourceType: "github",
    language: "javascript"
  }
] as Project[];
