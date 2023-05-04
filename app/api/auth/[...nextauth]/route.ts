import { authOptions } from "@/src/authOptions";
import { AuthenticationService } from "@/src/services/AuthenticationService";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
