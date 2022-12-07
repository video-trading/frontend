import axios from "axios";

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
    } catch (e) {
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
}
