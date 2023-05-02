import VideoGridCard from "@/components/video/VideoGridCard";
import { CategoryService } from "@/src/services/CategoryService";
import { VideoService } from "@/src/services/VideoService";
import React from "react";

export default async function Home({ params }: any) {
  const [category, videos] = await Promise.all([
    CategoryService.getCategoryById(params.id),
    VideoService.getVideos(1, params.id),
  ]);

  return (
    <div>
      <VideoGridCard videos={videos.items} category={category} />
    </div>
  );
}
