import { NextAuthOptions } from "next-auth";
import { AuthenticationService } from "./services/AuthenticationService";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await AuthenticationService.signIn(
          credentials!.username,
          credentials!.password
        );

        const userObj = {
          id: user.user.id,
          user: user.user,
          accessToken: user.accessToken,
        };

        console.log("userObj", userObj);

        return userObj;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
