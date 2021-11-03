import type { AuthHandler } from "./util";
import joi from "joi";
import prisma from "../../lib/prisma";
import { storeCode, GetUser } from "./util";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export interface Metadata {
  email?: string;
  provider: "email";
}

export const getUser: GetUser<Metadata> = async (metadata, countryCode) => {
  if (metadata.provider !== "email") return { error: "Invalid code", status: 400 };
  if (typeof metadata.email !== "string") return { error: "Invalid code", status: 400 };

  let user = await prisma.user.findUnique({ where: { email: metadata.email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: metadata.email,
        avatar:
          "https://gravatar.com/avatar/" +
          crypto.createHash("md5").update(metadata.email).digest("hex") +
          ".png?d=identicon&s=64",
        countryCode
      }
    });
  }

  return { user };
};

export const handler: AuthHandler = async req => {
  const { error } = joi
    .object({
      email: joi.string().email().required()
    })
    .validate({ email: req.query.email });

  if (error) return { error: error.message, status: 400 };

  const { email } = req.query;

  const code = await storeCode(undefined, { email, provider: "email" });

  const res = await fetch(
    `https://${process.env.MAILJET_USER}:${process.env.MAILJET_PASS}@api.mailjet.com/v3.1/send`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "noreply@arnu515.gq",
              Name: "arnu515"
            },
            To: [
              {
                Email: email
              }
            ],
            Subject: "Your email code",
            TextPart: fs.readFileSync(
              path.join(process.cwd(), "content/email-templates/email-code.txt"),
              "utf8"
            ),
            HTMLPart: fs.readFileSync(
              path.join(process.cwd(), "content/email-templates/email-code.html"),
              "utf8"
            ),
            TemplateLanguage: true,
            Variables: {
              code,
              link: `https://arnu515.gq/api/auth/session?token=${code}`
            }
          }
        ]
      })
    }
  );
  if (!res.ok) {
    console.log({ emailError: await res.json() });
    return { error: "Couldn't send email", status: 500 };
  }

  return { code };
};

const email = { getUser, handler };

export default email;
