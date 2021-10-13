import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  return (
    <nav className="px-4 py-2 flex items-center justify-between bg-white border-b border-gray-200 text-black dark:bg-[#212121] dark:border-black dark:text-white">
      <a className="flex gap-2 items-center cursor-pointer text-black dark:text-white">
        <Image src="/avatar.png" width="24px" height="24px" />
        <span className="font-bold">arnu515</span>
      </a>
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
      </div>
    </nav>
  );
};

export default Navbar;
