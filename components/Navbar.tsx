import { Moon, Sun } from "@geist-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useTheme from "../utils/hooks/useTheme";

const LINKS: { href: string; text: string }[] = [
  {
    href: "/",
    text: "Home"
  },
  {
    href: "/projects",
    text: "Projects"
  },
  {
    href: "/blog",
    text: "My blog"
  }
];

const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="px-4 py-2 flex items-center justify-between bg-white border-b border-gray-200 text-black dark:bg-[#212121] dark:border-black dark:text-white">
      <Link href="/">
        <div className="flex gap-2 items-center cursor-pointer text-black dark:text-white">
          <Image src="/avatar.png" width="24px" height="24px" />
          <span className="font-bold">arnu515</span>
        </div>
      </Link>
      <div className="flex gap-4 items-center mr-4">
        {LINKS.map((link, key) => (
          <Link href={link.href} key={key}>
            <a
              className="text-[#333333] dark:text-[#cccccc] hover:text-black dark:hover:text-white cursor-pointer"
              style={{ transition: "500ms ease color" }}
            >
              {link.text}
            </a>
          </Link>
        ))}
        <button
          className="text-[#333333] dark:text-[#cccccc] hover:text-black dark:hover:text-white cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
