import axios from "axios";
import { TransactionHistory } from "./PaymentService";
import { PaginationResponse } from "./VideoService";

export interface TransactionByUserDto {
  /**
   * Date time
   */
  id: string;

  transactions: TransactionHistory[];
}

export class TransactionService {
  static async getTransactionById(id: string): Promise<TransactionHistory> {
    let url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/transaction/by/" + id;
    const resp = await axios.get(url);
    return resp.data;
  }

  static async getTransactionsByUserId(
    userId: string
  ): Promise<PaginationResponse<TransactionByUserDto>> {
    let url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/transaction/user/" + userId;
    const resp = await axios.get(url);
    return resp.data;
  }

  static async listMyTransactions(
    accessToken: string,
    page: number
  ): Promise<PaginationResponse<TransactionByUserDto>> {
    let url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/transaction/my?page=" + page;
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return resp.data;
  }

  static async getTransactionsByVideoId(
    videoId: string
  ): Promise<PaginationResponse<TransactionHistory>> {
    let url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/transaction/video/" + videoId;
    const resp = await axios.get(url);
    return resp.data;
  }
}
