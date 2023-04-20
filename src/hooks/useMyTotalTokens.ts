import { useInfiniteQuery, useQuery } from "react-query";
import { VideoService } from "../services/VideoService";
import { TokenService } from "../services/TokenService";

/**
 * React hook for getting list of videos
 */
export function useMyTotalToken(accessToken?: string) {
  const result = useQuery(["token", accessToken], async () => {
    if (!accessToken) return "please login";
    const totalToken = await TokenService.getTotalToken(accessToken);
    return totalToken;
  });

  return result;
}
