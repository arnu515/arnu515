import email from "./email";
import discord from "./discord";
import { AuthHandler, GetUser } from "./util";

export default { email, discord } as Record<
  string,
  { handler: AuthHandler; getUser: GetUser }
>;
