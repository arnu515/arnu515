import React from "react";
import { GetServerSideProps } from "next";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import parseError, { ParsedError } from "../../utils/parseError";
import { Post } from "../../utils/types";
import { Image, useToasts } from "@geist-ui/react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import liquid from "../../utils/liquidify";

const ERROR_MESSAGE = "You don't have permission to access this.";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/posts/" + params.slug
  );
  const data = await res.json();
  if (res.ok) {
    const post: Post = data.data;
    const mdit = new MarkdownIt({
      highlight: (str, lang) => {
        console.log(str, lang);
        try {
          return (
            '<pre class="hljs lang-' +
            lang +
            "><code>" +
            hljs.highlightAuto(str).value +
            "</code></pre>"
          );
        } catch (e) {
          console.error(e);
        }
        return (
          '<pre class="hljs"><code>' + mdit.utils.escapeHtml(str) + "</code></pre>"
        );
      },
      html: true,
      linkify: true,
      breaks: true
    });

    const content = await liquid.parseAndRender(mdit.render(post.content));
    post.content = content;
    return { props: { post } };
  } else {
    const error = parseError(data);
    if (res.status === 404 || error.description === ERROR_MESSAGE)
      return { notFound: true };
    return { props: { error } };
  }
};

const BlogSlug: React.FC<{ post: Post; error: ParsedError }> = ({
  post,
  error: postFetchError
}) => {
  const [, toast] = useToasts();

  React.useEffect(() => {
    if (postFetchError)
      toast({
        text: (
          <p>
            <strong>An error occured while fetching the post</strong>
            <br />
            {postFetchError.name}
            <br />
            {postFetchError.description}
          </p>
        ),
        type: "error"
      });
  }, []);

  if (postFetchError) return;
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github-dark.min.css"
          integrity="sha512-rO+olRTkcf304DQBxSWxln8JXCzTHlKnIdnMUwYvQa9/Jd4cQaNkItIUj6Z4nvW1dqK0SKXLbn9h4KwZTNtAyw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Navbar />
      <main className="min-h-[100vh] min-w-[300px] max-w-[1100px] w-[50%] mx-auto px-4 py-2 bg-white text-black dark:bg-black dark:text-white">
        {post.cover_url && <Image src={post.cover_url} />}
        <h1 className="my-4">{post.title}</h1>
        <p className="my-4 text-xl">{post.description}</p>
        <hr className="border-t w-full border-black dark:border-white" />
        <div className="my-4" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </main>
    </>
  );
};

export default BlogSlug;
