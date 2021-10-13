import { Link, Spacer, Text } from "@geist-ui/react";
import { Github, Gitlab, Globe } from "@geist-ui/react-icons";
import React from "react";
import Navbar from "../components/Navbar";
import { Project } from "../utils/types";

const Card: React.FC = ({ children }) => {
  return (
    <div className="bg-[#efefef] dark:bg-[#212121] text-black dark:text-white border border-gray-100 dark:border-gray-800 p-4 rounded-lg">
      {children}
    </div>
  );
};

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[100vh] bg-white dark:bg-black text-black dark:text-white p-8">
        <Text h1 className="text-center m-4">
          My projects
        </Text>
        <Text p className="text-center !text-xl m-4">
          Checkout my <a href="https://github.com/arnu515">Github</a> for more!
        </Text>
        <Spacer h={3} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
          {projects.map((project, key) => (
            <Card key={key}>
              <h3 className="text-2xl my-2">{project.name}</h3>
              <p className="text-xl mt-2">{project.description}</p>
              <div className="flex gap-4 justify-end items-center">
                {project.source_url && (
                  <Link color href={project.source_url}>
                    {{ github: <Github />, gitlab: <Gitlab /> }[project.source_type]}
                  </Link>
                )}
                {project.project_link && (
                  <Link color href={project.project_link}>
                    <Globe />
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/projects");
  const data: { data: Project[] } = await res.json();

  return { props: { projects: data.data } };
}

export default Projects;
