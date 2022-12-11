import { useInfiniteQuery } from "react-query";
import { VideoService } from "../services/VideoService";

/**
 * React hook for getting list of videos
 */
export function useGetVideos() {
  const result = useInfiniteQuery(
    "videos",
    async ({ pageParam }) => {
      console.log("fetching videos", pageParam);
      const videos = await VideoService.getVideos(pageParam);
      console.log(videos);
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