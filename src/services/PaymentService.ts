import axios from "axios";
import { z } from "zod";
import { Profile } from "./AuthenticationService";
import { GetVideoResponse } from "./VideoService";

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

  From: Profile;

  To: Profile;

  Video?: GetVideoResponse;

  type: "RECEIVED" | "SENT";
}

export const VideoPurchaseSummarySchema = z.object({
  video: z.object({
    id: z.string(),
    title: z.string(),
    thumbnail: z.string().url(),
    Category: z.object({
      name: z.string(),
    }),
    User: z.object({
      name: z.string(),
    }),
    SalesInfo: z.object({
      price: z.string(),
      unit: z.string(),
    }),
    purchasable: z.boolean(),
  }),
  salesInfo: z.object({
    prices: z
      .object({
        name: z.string(),
        price: z.string(),
        unit: z.string(),
      })
      .array(),
    total: z.object({
      price: z.string(),
      unit: z.string(),
      priceInNumber: z.number().positive(),
    }),
  }),
});

export type VideoPurchaseSummary = z.infer<typeof VideoPurchaseSummarySchema>;

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

  static async checkoutWithToken(
    accessToken: string,
    videoId: string
  ): Promise<TransactionHistory> {
    let url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/payment/checkout/with_token";
    const resp = await axios.post(
      url,
      {
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

  static async getCheckoutWithTokenPaymentInfo(
    accessToken: string,
    videoId: string
  ): Promise<VideoPurchaseSummary> {
    z.string().parse(videoId);
    z.string().parse(accessToken);
    let url =
      process.env.NEXT_PUBLIC_API_ENDPOINT +
      "/payment/checkout/with_token/" +
      videoId;
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return VideoPurchaseSummarySchema.parse(resp.data);
  }

  static async getCheckoutPaymentInfo(
    accessToken: string,
    videoId: string
  ): Promise<VideoPurchaseSummary> {
    z.string().parse(videoId);
    z.string().parse(accessToken);
    let url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/payment/checkout/" + videoId;
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return VideoPurchaseSummarySchema.parse(resp.data);
  }
}
