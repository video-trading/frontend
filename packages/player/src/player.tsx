import React, { useEffect } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import { QualitySelectorPlugin } from "./plugins";
import { VideoQuality } from "./plugins/quality/types";
import "video.js/dist/video-js.css";

interface Props {
  options: videojs.PlayerOptions;
  onReady: (player: videojs.Player) => void;
  transcoding: VideoQuality[];
}

export function VideoPlayer(props: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef<videojs.Player>();
  const { options, onReady, transcoding } = props;
  useEffect(() => {
    videojs.registerPlugin("qualitySelector", QualitySelectorPlugin);
  }, []);

  React.useEffect(() => {
    let player: VideoJsPlayer;

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);
      player = playerRef.current = videojs(
        videoElement,
        { ...options, src: undefined, sources: [] },
        () => {
          // @ts-ignore
          player.qualitySelector(transcoding);
          onReady && onReady(player);
        }
      );

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      player = playerRef.current;
      if (options.autoplay) {
        player?.autoplay(options.autoplay);
      }

      if (options.sources) {
        player?.src(options.sources);
      }
    }
  }, [options, videoRef]);

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }
    const player = playerRef.current;
    player?.src(transcoding);
  }, [transcoding, playerRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = undefined;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef as any} />
    </div>
  );
}
