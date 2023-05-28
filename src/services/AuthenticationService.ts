import axios from "axios";
import { client } from "@passwordless-id/webauthn";
import { z } from "zod";
import { parseAuthentication } from "@passwordless-id/webauthn/dist/esm/parsers";

interface LoginResponse {
  user: Profile;
  accessToken: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: {
    url: string;
    key: string;
  };
  shortDescription: string;
  longDescription: string;
  Wallet: {
    id: string;
    address: string;
  };
}

const RegisterMfaAuthenticationParams = z.object({
  accessKey: z.string(),
  username: z.string({ description: "username" }),
});

const RegisterMfaAuthenticationReturn = z.enum([
  "registered",
  "already_registered",
  "error",
  "not_supported",
]);

type RegisterMfaAuthenticationReturn = z.infer<
  typeof RegisterMfaAuthenticationReturn
>;

const GetMfaAuthenticationResponse = z.object({
  id: z.string().optional(),
  challenge: z.string(),
  status: z.enum(["registered", "not_registered"], {
    description: "Status of the MFA device registration on the server",
  }),
});

const CreateMfaAuthenticationResponse = z.object({
  id: z.string(),
});

const VerifyMfaAuthenticationResponse = z.object({
  challenge: z.string(),
  id: z.string(),
});

export class AuthenticationService {
  static async signIn(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    const user = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/signIn",
      {
        username,
        password,
      }
    );
    return user.data;
  }

  static async signUp(
    username: string,
    password: string,
    name: string,
    email: string
  ): Promise<any> {
    try {
      const user = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/signUp",
        {
          username,
          password,
          name,
          email,
        }
      );
      return user;
    } catch (e: any) {
      if (e.response?.data?.message) {
        return {
          error: e.response.data.message,
        };
      }
      return {
        error: `${e}`,
      };
    }
  }

  static async profile(accessKey: string): Promise<Profile> {
    const profile = await axios.get(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/profile",
      {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      }
    );
    return profile.data;
  }

  /**
   * Register a new MFA device
   */
  static async mfaVerification({
    accessKey,
    username,
  }: z.infer<
    typeof RegisterMfaAuthenticationParams
  >): Promise<RegisterMfaAuthenticationReturn> {
    // Check if the browser supports WebAuthn
    if (!client.isAvailable()) {
      return "not_supported";
    }
    // access GET /auth/mfa/register to get the challenge
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/mfa/register",
      {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      }
    );

    let { challenge, status } = GetMfaAuthenticationResponse.parse(
      response.data
    );

    console.log(status);

    if (status === "not_registered") {
      await AuthenticationService.registerMfaDevice({
        username,
        challenge,
        accessKey,
      });
    }

    await AuthenticationService.verifyMfa({ accessKey });
    return "registered";
  }

  /**
   * Register a new MFA device.
   * Do not call this method directly, use `mfaVerification` instead.
   */
  static async registerMfaDevice({
    username,
    challenge,
    accessKey,
  }: {
    username: string;
    challenge: string;
    accessKey: string;
  }) {
    const encoded = await client.register(username, challenge);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/mfa/register",
        encoded,
        {
          headers: {
            Authorization: `Bearer ${accessKey}`,
          },
        }
      );
      return;
    } catch (e: any) {
      // check if the error is axios error
      if (e.response?.data?.message) {
        console.log(e.response.data);
        throw new Error(e.response.data.message);
      }
      throw e;
    }
  }

  /**
   * Do not call this method directly, use `mfaVerification` instead.
   * @param param0
   */
  static async verifyMfa({ accessKey }: { accessKey: string }) {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/mfa/authenticate",
      {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      }
    );

    const { challenge, id } = VerifyMfaAuthenticationResponse.parse(
      response.data
    );

    const authentication = await client.authenticate([id], challenge, {
      authenticatorType: "auto",
      userVerification: "required",
      timeout: 60000,
    });

    await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/mfa/authenticate",
      authentication,
      {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      }
    );
  }
}
