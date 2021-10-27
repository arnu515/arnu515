import type { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import joi from "joi";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { error } = joi
      .object({
        fullName: joi.string().required().max(255),
        occupation: joi.string().required().max(255),
        message: joi.string().required()
      })
      .validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }
    const resp = await prisma.contactForm.create({
      data: {
        full_name: req.body.fullName,
        message: req.body.message,
        occupation: req.body.occupation
      }
    });
    res.status(201).json(resp);
  } else res.status(405).json({ message: "Method not allowed" });
};

export default handler;
