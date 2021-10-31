import email from "./email";
import { AuthHandler, GetUser } from "./util";

export default { email } as Record<string, { handler: AuthHandler; getUser: GetUser }>;
