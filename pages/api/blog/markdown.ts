import { NextApiHandler } from "next";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import tag from "html-tag";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { content } = req.body;

  const mdit = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return tag(
            "pre",
            { class: "hljs lang-" + lang },
            tag("code", hljs.highlight(lang, str, true).value)
          );
        } catch (__) {}
      }
      return ""; // use external default escaping
    }
  });
  mdit.use(require("markdown-it-anchor"));
  mdit.use(require("markdown-it-attrs"));

  res.status(200).json({ content: mdit.render(content) });
};

export default handler;
