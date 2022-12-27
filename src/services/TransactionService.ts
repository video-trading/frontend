import axios from "axios";
import { TransactionHistory } from "./PaymentService";
import { PaginationResponse } from "./VideoService";

export class TransactionService {
  static async getTransactionById(id: string): Promise<TransactionHistory> {
    let url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/transaction/by/" + id;
    const resp = await axios.get(url);
    return resp.data;
  }

  static async getTransactionsByUserId(
    userId: string
  ): Promise<PaginationResponse<TransactionHistory>> {
    let url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/transaction/user/" + userId;
    const resp = await axios.get(url);
    return resp.data;
  }
}
