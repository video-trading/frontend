import { Profile } from "./AuthenticationService";
import axios from "axios";

export class UserService {
  static async update(accessToken: string, user: Profile): Promise<Profile> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/profile";
    const resp = await axios.patch(url, user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return resp.data;
  }

  static async listUsers(): Promise<Profile[]> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/user";
    const resp = await axios.get(url);
    return resp.data;
  }
}
