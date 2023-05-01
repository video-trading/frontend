import { CategoryService } from "@/src/services/CategoryService";
import { VideoService } from "@/src/services/VideoService";
import React from "react";

export default async function Home({ params }: any) {
  const [category, videos] = await Promise.all([
    CategoryService.getCategoryById(params.id),
    VideoService.getVideos(1, params.id),
  ]);

  console.log(videos);

  return (
    <div>
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
          {videos.items.map((v) => (
            <div>{v.id}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
