import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { mockSession } from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;
import { AuthenticationService } from "../../../src/services/AuthenticationService";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await AuthenticationService.signIn(
          credentials!.username,
          credentials!.password
        );

        const userObj = {
          id: user.user.id,
          user: user.user,
          accessToken: user.accessToken,
        };

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
};

export default NextAuth(authOptions);
