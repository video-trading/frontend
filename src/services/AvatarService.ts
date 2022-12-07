import axios from "axios";

export class AvatarService {
  static async generateAvatar(
    accessKey: string
  ): Promise<{ key: string; url: string }> {
    let generationEndpoint =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/avatar/generate";
    const avatar = await axios.post(
      generationEndpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      }
    );

    return avatar.data;
  }

  /**
   * Get a pre-signed avatar upload URL
   * @param accessKey
   */
  static async createPreSignedAvatarUploadUrl(
    accessKey: string
  ): Promise<{ url: string; key: string; previewUrl: string }> {
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/avatar";
    const avatar = await axios.post(
      endpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      }
    );
    return avatar.data;
  }
}
