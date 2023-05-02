"use client";
import React from "react";
import { VideoPlayer as Player } from "player";

export default function VideoPlayer() {
  return (
    <Player
      options={{
        controls: true,
        aspectRatio: "9:5",
        fluid: true,
      }}
      onReady={(player) => {}}
      transcoding={[
        {
          label: "1080p",
          src: "https://vjs.zencdn.net/v/oceans.mp4",
        },
      ]}
    />
  );
}
