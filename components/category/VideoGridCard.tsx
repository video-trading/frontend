import { GetCategoryResponse } from "@/src/services/CategoryService";
import { GetVideoResponse } from "@/src/services/VideoService";
import React from "react";
import { VideoCard, VideoCardGrid } from "../video/VideoCard";

interface VideoGridCardProps {
  category: GetCategoryResponse;
  videos: GetVideoResponse[];
}

export default function VideoGridCard({
  category,
  videos,
}: VideoGridCardProps) {
  return (
    <section className="relative">
      <div className="mx-auto">
        <div className="grid grid-cols-12 gap-4 px-10">
          {videos.map((v, i) => (
            <div
              className={`md:col-span-${
                i % 4 === 0 ? 3 : 2
              } lg:col-span-2 col-span-12 h-60`}
            >
              <VideoCardGrid
                id={v.id}
                title={v.title}
                author={v.User.name}
                cover={v.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
