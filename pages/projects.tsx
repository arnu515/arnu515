import React from "react";
import { motion } from "framer-motion";
import projects, { Project } from "../content/projects";

const ProjectCardLanguageIcon: React.FC<{ language: Project["language"] }> = ({
  language
}) => {
  switch (language) {
    case "python":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ msFilter: "" }}
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.617H5.92s-2.927-.332-2.927 4.282 2.555 4.45 2.555 4.45h1.524v-2.141s-.083-2.554 2.513-2.554zm-.056-5.74a.784.784 0 110-1.57.784.784 0 110 1.57z"></path>
          <path d="M18.452 7.532h-1.524v2.141s.083 2.554-2.513 2.554h-4.328s-2.432-.04-2.432 2.35v3.951s-.369 2.391 4.409 2.391c4.573 0 4.288-1.983 4.288-1.983l-.006-2.054h-4.363v-.617h6.097s2.927.332 2.927-4.282-2.555-4.451-2.555-4.451zm-3.981 10.436a.784.784 0 110 1.57.784.784 0 110-1.57z"></path>
        </svg>
      );
    case "javascript":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ msFilter: "" }}
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"></path>
        </svg>
      );
    case "java":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ msFilter: "" }}
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M5 2h2v3H5zm4 0h2v3H9zm4 0h2v3h-2zm6 7h-2V7H3v11c0 1.654 1.346 3 3 3h8c1.654 0 3-1.346 3-3h2c1.103 0 2-.897 2-2v-5c0-1.103-.897-2-2-2zm-4 9a1 1 0 01-1 1H6a1 1 0 01-1-1V9h10v9zm2-2v-5h2l.002 5H17z"></path>
        </svg>
      );
  }
};

const ProjectCard: React.FC<{ project: Project; delay: number }> = ({
  project,
  delay
}) => {
  return (
    <motion.article
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: delay }}
      className="px-4 py-2 rounded border border-gray-300 bg-white text-black dark:border-gray-700 dark:bg-[#333333] dark:text-white"
    >
      <motion.h3
        className="text-2xl font-bold"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.5 }}
      >
        {project.name}
      </motion.h3>
      <motion.p
        className="text-opacity-80"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.55 }}
      >
        {project.description}
      </motion.p>
      <div className="flex items-center justify-end gap-4 px-4 py-2">
        {project.language && (
          <span className="mr-auto">
            <ProjectCardLanguageIcon language={project.language} />
          </span>
        )}
        {project.link && (
          <a href={project.link} className="text-blue-500 hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </a>
        )}
        {project.source && (
          <a href={project.source} className="text-blue-500 hover:text-blue-600">
            {project.sourceType === "github" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="rgba(59, 130, 246, 1)"
              >
                <path
                  fillRule="evenodd"
                  d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 012.496-.336 9.554 9.554 0 012.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
            {project.sourceType === "gitlab" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="rgba(59, 130, 246, 1)"
              >
                <path d="M20.892 9.889a.664.664 0 00-.025-.087l-2.104-6.479a.84.84 0 00-.8-.57.822.822 0 00-.789.575l-2.006 6.175H8.834L6.826 3.327a.823.823 0 00-.786-.575h-.006a.837.837 0 00-.795.575L3.133 9.815c0 .005-.005.01-.007.016l-1.067 3.281a1.195 1.195 0 00.435 1.34l9.227 6.706c.167.121.393.12.558-.003l9.229-6.703a1.2 1.2 0 00.435-1.34l-1.051-3.223zM17.97 3.936l1.809 5.566H16.16l1.81-5.566zm-11.94 0l1.812 5.566H4.228L6.03 3.936zm-2.982 9.752a.253.253 0 01-.093-.284l.793-2.437 5.817 7.456-6.517-4.735zm1.499-3.239h3.601l2.573 7.916-6.174-7.916zm7.452 8.794l-2.856-8.798h5.718l-1.792 5.515-1.07 3.283zm1.282-.877l2.467-7.588.106-.329h3.604l-5.586 7.156-.591.761zm7.671-4.678l-6.519 4.733.022-.029 5.794-7.425.792 2.436a.25.25 0 01-.089.285z"></path>
              </svg>
            )}
          </a>
        )}
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  return (
    <main className="bg-gray-200 text-black dark:bg-gray-900 dark:text-white p-8 min-h-screen">
      <motion.h1
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center my-6 text-5xl"
      >
        My projects
      </motion.h1>
      <div className="mt-8 flex flex-col gap-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} delay={index / 4} />
        ))}
      </div>
    </main>
  );
};

export default Projects;
