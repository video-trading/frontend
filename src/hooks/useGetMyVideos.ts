import { useInfiniteQuery } from "react-query";
import { VideoService } from "../services/VideoService";

/**
 * React hook for getting list of videos
 */
export function useGetMyVideos(accessToken?: string) {
  const result = useInfiniteQuery(
    ["myVideos", accessToken],
    async ({ pageParam }) => {
      if (!accessToken) {
        return {
          items: [],
          metadata: {
            page: 1,
            totalPages: 1,
            totalVideos: 0,
          },
        };
      }
      const videos = await VideoService.getMyVideos(accessToken, pageParam);
      return videos;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const pageParam =
          lastPage.metadata.page + 1 <= lastPage.metadata.totalPages
            ? lastPage.metadata.page + 1
            : undefined;

        return pageParam;
      },
    }
  );

  return result;
}
