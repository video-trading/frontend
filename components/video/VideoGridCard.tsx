import { GetCategoryResponse } from "@/src/services/CategoryService";
import { GetVideoResponse } from "@/src/services/VideoService";
import React from "react";
import { VideoCard, VideoCardGrid } from "./VideoCard";

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
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-10">
            <h2 className="h2 font-cabinet-grotesk text-gray-100 text-center">
              {category.name}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 px-10">
          {videos.map((v, i) => (
            <div
              className={`md:col-span-${i % 4 === 0 ? 3 : 2} col-span-12 h-60`}
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
