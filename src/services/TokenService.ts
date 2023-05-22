import axios from "axios";
import { PaginationResponse } from "./VideoService";
import { z } from "zod";

export const TokenHistorySchema = z.object({
  _id: z.string(),
  transactions: z.array(
    z.object({
      _id: z.string(),
      value: z.string(),
      timestamp: z.string(),
      type: z.string(),
      txHash: z.string().optional(),
      Video: z
        .object({
          thumbnail: z.string(),
          _id: z.string(),
          title: z.string(),
        })
        .optional(),
    })
  ),
});

export type TokenHistroy = z.infer<typeof TokenHistorySchema>;

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

  /**
   * Get my token history
   * @param accessKey access key of user
   * @param page page number
   * @returns PaginationResponse<TokenHistroy>
   */
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
    const items = TokenHistorySchema.array().parse(token.data.items);
    return {
      ...token.data,
      items,
    };
  }
}
