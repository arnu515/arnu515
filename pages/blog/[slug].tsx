import React from "react";
import day from "dayjs";
import fs from "fs";
import path from "path";
import styles from "../blog.module.css";
import type { GetServerSideProps } from "next";
import type { Post, User, Profile } from "@prisma/client";
import type Prisma from "../../lib/prisma";

interface IBlogPost extends Post {
  user: {
    id: User["id"];
    avatar: User["avatar"];
    profile: {
      full_name: Profile["full_name"];
    };
  };
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  if (typeof slug !== "string") return { notFound: true };
  const prisma: typeof Prisma = require("../../lib/prisma").default;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          profile: {
            select: {
              full_name: true
            }
          }
        }
      }
    }
  });
  if (!post)
    return {
      notFound: true
    };
  // Read the corresponding HTML file in content/blog-posts
  const filePath = path.join(process.cwd(), "content/blog-posts", `${slug}.html`);
  if (!fs.existsSync(filePath))
    return {
      notFound: true
    };
  const content = fs.readFileSync(filePath, "utf8");
  return {
    props: { post: JSON.parse(JSON.stringify(post)), content }
  };
};

const BlogSlug: React.FC<{ post: IBlogPost; content: string }> = ({
  post,
  content
}) => {
  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen">
      <img
        src={post.cover}
        alt={`Cover of ${post.title}`}
        className="my-4 rounded-lg w-full h-[300px] border border-black dark:border-white"
      />
      <h1 className="text-5xl font-bold my-6">{post.title}</h1>
      <p className="my-4">
        {(post.tags || "").split(",").map((tag, key) => (
          <span key={key} className="text-gray-600 dark:text-gray-300 mr-2">
            <span className="text-gray-400 dark:text-gray-600 mr-1">#</span>
            {tag.trim()}
          </span>
        ))}
      </p>
      <p className="text-gray-600 dark:text-gray-300 my-4">
        {day(post.createdAt).format("YYYY, MMMM DD")}{" "}
        <span className="text-black dark:text-white">at</span>{" "}
        {day(post.createdAt).format("hh:mm A")}
      </p>
      <p className="flex gap-2 items-center my-2">
        <img
          src={post.user.avatar}
          alt={post.user.profile.full_name}
          className="w-8 h-8 rounded-full mr-2 border border-black dark:border-white"
        />
        <span className="text-gray-600 dark:text-gray-300">
          {post.user.profile.full_name}
        </span>
      </p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </main>
  );
};

export default BlogSlug;
