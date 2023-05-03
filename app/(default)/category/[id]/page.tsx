import CategoryHeading from "@/components/category/CategoryHeading";
import VideoGridCard from "@/components/category/VideoGridCard";
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
      <div className="mt-20">
        <CategoryHeading name={category.name} />
      </div>
      <div className="mt-5">
        <VideoGridCard videos={videos.items} category={category} />
      </div>
    </div>
  );
}
