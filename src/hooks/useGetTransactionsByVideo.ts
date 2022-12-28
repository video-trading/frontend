import { useQuery } from "react-query";
import { TransactionService } from "../services/TransactionService";

export function useGetTransactionsByVideo(videoId: string) {
  const query = useQuery(["transactions", videoId], () => {
    return TransactionService.getTransactionsByVideoId(videoId);
  });

  return query;
}
