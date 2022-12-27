import axios from "axios";

export interface TokenResponse {
  token: string;
}

export interface TransactionHistory {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  txHash: string;
  value: string;
  videoId: string | null;
  fromId: string | null;
  toId: string | null;
}

export class PaymentService {
  static async getClientToken(accessToken: string): Promise<TokenResponse> {
    let url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/payment/client_token";

    const token = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return token.data;
  }

  static async checkout(
    accessToken: string,
    nonce: string,
    videoId: string
  ): Promise<TransactionHistory> {
    let url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/payment/checkout";
    const resp = await axios.post(
      url,
      {
        nonce,
        videoId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return resp.data;
  }
}
