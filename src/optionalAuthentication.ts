import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { Profile } from "./services/AuthenticationService";

type Callback = (accessToken: string, user: Profile) => Promise<any>;

const secret = process.env.NEXTAUTH_SECRET;

export const optionalAuthentication = async (
  ctx: GetServerSidePropsContext<any, any>,
  cb: Callback
) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  let userSession = session as any;
  return cb(userSession?.accessToken, userSession?.user);
};
