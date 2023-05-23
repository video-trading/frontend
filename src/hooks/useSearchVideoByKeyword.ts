import { useQuery } from "react-query";
import { TransactionService } from "../services/TransactionService";
import { VideoService } from "../services/VideoService";

export function useSearchVideoByKeyword(key: string) {
  const query = useQuery(["video", key], () => {
    return VideoService.searchVideo(key);
  });

  return query;
}
