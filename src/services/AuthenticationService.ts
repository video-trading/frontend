import axios from "axios";

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar: string;
    Wallet: {
      id: string;
      address: string;
    };
  };
  accessToken: string;
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
}
