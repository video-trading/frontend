import { useInfiniteQuery } from "react-query";
import { VideoService } from "../services/VideoService";

/**
 * React hook for getting list of videos
 */
export function useGetVideos(categoryId?: string) {
  const result = useInfiniteQuery(
    ["videos", categoryId],
    async ({ pageParam }) => {
      const videos = await VideoService.getVideos(pageParam, categoryId);
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
