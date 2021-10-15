import { Button, Image, Text } from "@geist-ui/react";
import { Mail, PenTool, Twitter } from "@geist-ui/react-icons";
import React from "react";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";

const Header: React.FC = () => {
  return (
    <div
      id="header"
      className="min-h-[100vh] bg-white text-black dark:bg-black dark:text-white flex items-center"
    >
      <section className="mx-auto">
        <Image src="/avatar.png" width="256px" height="256px" />
        <div className="text-center">
          <Text h1 style={{ margin: "0.5rem" }}>
            Aarnav Pai
          </Text>
          <Text p style={{ color: "gray", margin: "0.5rem", fontSize: "24px" }}>
            @arnu515
          </Text>
          <Text
            p
            small
            className="uppercase opacity-80 cursor-pointer hover:bg-[#efefef] dark:hover:bg-gray-900 px-4 py-2"
            style={{ transition: "500ms background ease" }}
          >
            <a
              href="#about-me"
              className="text-black dark:text-white"
              onClick={e => {
                e.preventDefault();
                document
                  .getElementById("about-me")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Scroll down
            </a>
          </Text>
        </div>
      </section>
    </div>
  );
};

const AboutMe: React.FC = () => {
  return (
    <div
      id="about-me"
      className="min-h-[100vh] bg-[#eeeeee] text-black dark:bg-gray-900 dark:text-white flex items-center"
    >
      <section className="mx-auto">
        <div className="text-center">
          <Text h1 style={{ margin: "0.5rem" }}>
            About Me
          </Text>
          <Text p style={{ color: "gray", margin: "0.5rem", fontSize: "24px" }}>
            I am Aarnav Pai,{" "}
            {["a", "e", "i", "o", "u"].includes(
              process.env.NEXT_PUBLIC_AGE?.charAt?.(0)
            )
              ? "an"
              : "a"}{" "}
            {process.env.NEXT_PUBLIC_AGE} year old self-taught Web and App developer
            from 🇮🇳 India.
          </Text>
          <Text
            p
            small
            className="uppercase opacity-80 cursor-pointer hover:bg-white dark:hover:bg-black px-4 py-2"
            style={{ transition: "500ms background ease" }}
          >
            <a
              href="#my-projects"
              className="text-black dark:text-white"
              onClick={e => {
                e.preventDefault();
                document
                  .getElementById("my-projects")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Scroll down
            </a>
          </Text>
        </div>
      </section>
    </div>
  );
};

const MyProjects: React.FC = () => {
  return (
    <div
      id="my-projects"
      className="min-h-[100vh] bg-[#dddddd] text-black dark:bg-gray-800 dark:text-white flex items-center"
    >
      <section className="mx-auto">
        <div className="text-center">
          <Text h1 style={{ margin: "0.5rem" }}>
            My Projects
          </Text>
          <Text p style={{ color: "gray", margin: "0.5rem", fontSize: "24px" }}>
            To see a list of projects I'm working on, will work on, or have finished,{" "}
            <a href="/projects">click here</a>.
          </Text>
          <Text
            p
            small
            className="uppercase opacity-80 cursor-pointer hover:bg-[#eeeeee] dark:hover:bg-gray-900 px-4 py-2"
            style={{ transition: "500ms background ease" }}
          >
            <a
              href="#contact-me"
              className="text-black dark:text-white"
              onClick={e => {
                e.preventDefault();
                document
                  .getElementById("contact-me")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Scroll down
            </a>
          </Text>
        </div>
      </section>
    </div>
  );
};

const ContactMe: React.FC<{ openContactForm: () => void }> = ({
  openContactForm: openModal
}) => {
  return (
    <div
      id="contact-me"
      className="min-h-[100vh] bg-[#eeeeee] text-black dark:bg-gray-900 dark:text-white flex items-center"
    >
      <section className="mx-auto">
        <div className="text-center">
          <Text h1 style={{ margin: "0.5rem" }}>
            Contact Me
          </Text>
          <Text p style={{ color: "gray", margin: "0.5rem", fontSize: "24px" }}>
            You can contact me by email, twitter, or by just filling{" "}
            <span
              role="button"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              this form
            </span>
            .
          </Text>
          <p className="text-center">
            <Button
              type="success-light"
              className="!mr-2"
              onClick={() => (window.location.href = "https://twitter.com/arnu5152")}
              icon={<Twitter />}
            >
              Twitter
            </Button>
            <Button
              type="secondary-light"
              className="!mr-2"
              onClick={() => (window.location.href = "mailto:arnu515@protonmail.com")}
              icon={<Mail />}
            >
              Email
            </Button>
            <Button type="warning-light" icon={<PenTool />} onClick={openModal}>
              Open Form
            </Button>
          </p>
          <Text
            p
            small
            className="uppercase opacity-80 cursor-pointer hover:bg-white dark:hover:bg-black px-4 py-2"
            style={{ transition: "500ms background ease" }}
          >
            <a
              href="#header"
              className="text-black dark:text-white"
              onClick={e => {
                e.preventDefault();
                document
                  .getElementById("header")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Back to top
            </a>
          </Text>
        </div>
      </section>
    </div>
  );
};

const Index: React.FC = () => {
  const [contactFormVisible, setContactFormVisible] = React.useState(false);

  return (
    <>
      <Navbar />
      <Header />
      <AboutMe />
      <MyProjects />
      <ContactMe openContactForm={() => setContactFormVisible(true)} />

      <ContactForm
        visible={contactFormVisible}
        onClose={() => setContactFormVisible(false)}
      />
    </>
  );
};

export default Index;
