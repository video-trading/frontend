import { useInfiniteQuery, useQuery } from "react-query";
import { GetMyVideoByIdDto, VideoService } from "../services/VideoService";
import { UIConfig } from "../UIConfig";

/**
 * React hook for getting list of videos
 */
export function useGetMyVideoDetail(
  videoId: string,
  accessToken?: string,
  initialData?: GetMyVideoByIdDto
) {
  const result = useQuery(
    ["myVideos", videoId, accessToken],
    async () => {
      if (!accessToken) return null;

      const video = await VideoService.getMyVideoById(accessToken, videoId);
      return video;
    },
    {
      initialData: initialData,
      refetchInterval: UIConfig.myVideoRefreshInterval,
    }
  );

  return result;
}
