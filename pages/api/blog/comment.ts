import { NextApiHandler } from "next";
import prisma from "../../../lib/prisma";
import joi from "joi";
import getSession from "../../../lib/session";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const session = await getSession(req, res);
  if (!session.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { error } = joi
    .object({
      slug: joi.string().required(),
      content: joi.string().required().max(500).trim()
    })
    .validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const { slug, content } = req.body;
  const comment = await prisma.postComment.create({
    data: {
      content,
      postId: slug,
      userId: session.userId
    },
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
  res.status(200).json({ comment });
};

export default handler;
