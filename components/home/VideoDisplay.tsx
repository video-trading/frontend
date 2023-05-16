import { VideoService } from "@/src/services/VideoService";
import React, { Suspense } from "react";
import { CircularProgressBar } from "../shared/Placeholders";
import Inspiration from "./inspiration";

export default async function VideoDisplay() {
  const videos = await VideoService.getVideos(1);
  return (
    <Suspense fallback={<CircularProgressBar />}>
      <Inspiration videos={videos.items} />
    </Suspense>
  );
}
