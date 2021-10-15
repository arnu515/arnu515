import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { GetServerSideProps } from "next";
import parseError, { ParsedError } from "../../utils/parseError";
import { Post } from "../../utils/types";
import { Button, Card, Image, useToasts } from "@geist-ui/react";
import Link from "next/link";

const ERROR_MESSAGE = "You don't have permission to access this.";
const PER_PAGE = 10;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let { limit, offset } = query;
  if (typeof limit !== "string" || isNaN(+limit)) limit = PER_PAGE + "";
  if (typeof offset !== "string" || isNaN(+offset)) offset = "0";
  console.log(limit, offset);

  const res = await fetch(
    process.env.NEXT_PUBLIC_DIRECTUS_URL +
      `/items/posts?limit=${limit}&offset=${offset}`
  );
  const data = await res.json();
  if (res.ok) {
    return { props: { posts: data.data, limit, offset } };
  } else {
    return { props: { error: parseError(data) } };
  }
};

const BlogIndex: React.FC<{
  posts?: Post[];
  limit?: string;
  offset?: string;
  error?: ParsedError;
}> = ({
  posts: postsFromServer,
  error: postFetchError,
  limit,
  offset: offsetFromQ
}) => {
  const [, toast] = useToasts();
  const [offset, setOffset] = useState(offsetFromQ ? +offsetFromQ : 0);
  const [posts, setPosts] = useState(postsFromServer);
  const [isMorePosts, setMorePosts] = useState(!!postsFromServer.length);
  const [isLoadingMorePosts, setLoadingMorePosts] = useState(false);
  useEffect(() => {
    if (postFetchError)
      toast({
        text: (
          <p>
            <strong>An error occured while fetching posts</strong>
            <br />
            {postFetchError.name}
            <br />
            {postFetchError.description}
          </p>
        ),
        type: "error"
      });
  }, []);

  if (postFetchError) return null;

  async function getPosts(
    // Having to pass the offset directly instead of via state
    // because react is garbage and the state updates are asynchronous.
    offset: number
  ) {
    setLoadingMorePosts(true);
    const res = await fetch(
      process.env.NEXT_PUBLIC_DIRECTUS_URL +
        `/items/posts?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();
    setLoadingMorePosts(false);
    if (res.ok) {
      const newPosts = data.data;
      if (!Array.isArray(newPosts) || newPosts.length === 0) {
        toast({
          text: "No more posts to fetch."
        });
        setMorePosts(false);
      } else setPosts(posts => [...posts, ...newPosts]);
    } else {
      const error = parseError(data);
      if (res.status === 403 && error.description === ERROR_MESSAGE) {
        toast({
          text: "No more posts to fetch."
        });
        setMorePosts(false);
      } else
        toast({
          text: (
            <p>
              <strong>An error occured while fetching posts</strong>
              <br />
              {error.name}
              <br />
              {error.description}
            </p>
          ),
          type: "error"
        });
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[100vh] bg-white text-black dark:bg-black dark:text-white px-6 py-4">
        <h1 className="text-center m-4">Blog posts</h1>
        <p className="text-center text-xl">
          View more posts on <a href="https://dev.to/arnu515">DEV.to</a>
        </p>
        <section
          id="posts"
          className="min-w-[350px] max-w-[800px] w-[50%] flex flex-col justify-center gap-2 mx-auto"
        >
          {posts?.length ? (
            posts.map((post, key) => (
              <Link href={`/blog/${post.slug}`} key={key}>
                <Card hoverable className="cursor-pointer">
                  {post.cover_url && <Image src={post.cover_url} />}
                  <h3 className="m-0 mb-1 p-0">{post.title}</h3>
                  <p className="p-0 m-0">{post.description}</p>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center m-4">No posts yet</p>
          )}
        </section>
        <p className="text-center">
          {isMorePosts && (
            <Button
              loading={isLoadingMorePosts}
              type="success-light"
              onClick={() => {
                const newOffset = offset + PER_PAGE;
                setOffset(newOffset);
                getPosts(newOffset);
              }}
            >
              Load more posts
            </Button>
          )}
        </p>
      </main>
    </>
  );
};

export default BlogIndex;
