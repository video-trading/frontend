import axios from "axios";
import { PaginationResponse } from "./VideoService";

export interface TokenHistroy {
  _id: string;
  transactions: {
    _id: any;
    value: string;
    timestamp: string;
    type: string;
  }[];
}

export class TokenService {
  static async getTotalToken(accessKey: string): Promise<number> {
    let generationEndpoint =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/token/total";
    const token = await axios.get(generationEndpoint, {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    });

    return token.data;
  }

  static async listMyTokenHistory(
    accessKey: string,
    page: number
  ): Promise<PaginationResponse<TokenHistroy>> {
    let generationEndpoint =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/token/my/history?page=" + page;
    const token = await axios.get(generationEndpoint, {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    });
    return token.data;
  }
}
