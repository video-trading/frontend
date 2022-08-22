import { Client } from "../supabase";

/**
 * A client which can be used to interact with the auth service.
 */
export class AuthenticationClient extends Client {
  async signIn(email: string, password: string) {
    return await this.client.auth.signIn({
      email: email,
      password: password,
    });
  }

  async signUp(email: string, password: string) {
    return await this.client.auth.signUp({
      email: email,
      password: password,
    });
  }

  async signOut() {
    return await this.client.auth.signOut();
  }
}
