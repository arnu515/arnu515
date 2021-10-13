import { NextApiHandler } from "next";
import * as yup from "yup";

const handler: NextApiHandler = async (req, res) => {
  const schema = yup.object({
    email: yup.string().required().trim().email(),
    full_name: yup.string().required().trim(),
    occupation: yup.string().trim(),
    message: yup.string().required().trim()
  });
  try {
    const { email, full_name, message, occupation } = await schema.validate(req.body);
    const resp = await fetch(
      process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/contact_form_responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.DIRECTUS_API_TOKEN
        },
        body: JSON.stringify({
          email,
          full_name,
          message,
          occupation
        })
      }
    );
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (e) {
    res.status(400).json({
      error: e instanceof yup.ValidationError ? "Invalid body" : "Unexpected Error",
      error_description: e.message
    });
    return;
  }
};

export default handler;
