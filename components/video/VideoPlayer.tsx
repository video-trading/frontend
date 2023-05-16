"use client";
import React from "react";
import { VideoPlayer as Player } from "player";
import { GetVideoDetailResponse } from "@/src/services/VideoService";

interface Props {
  transcodings: { url: string; targetQuality: string }[];
}

export default function VideoPlayer({ transcodings }: Props) {
  return (
    <Player
      options={{
        controls: true,
        aspectRatio: "9:5",
        fluid: true,
      }}
      onReady={(player) => {}}
      transcoding={transcodings.map((t) => ({
        label: t.targetQuality,
        src: t.url,
      }))}
    />
  );
}
