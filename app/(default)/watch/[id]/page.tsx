import VideoPlayer from "@/components/video/VideoPlayer";
import React from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-6 mt-20 bg-sky-100 h-full">
      <div className="col-span-4 pl-40 py-10">
        <div className="h-full w-full rounded-3xl">
          <VideoPlayer />
        </div>
      </div>
    </div>
  );
}
