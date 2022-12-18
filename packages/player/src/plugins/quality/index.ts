import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { QualitySelectorButton } from "./button";
import { VideoQuality } from "./types";
import { Events } from "./events";
const Plugin = videojs.getPlugin("plugin");

export class QualitySelectorPlugin extends Plugin {
  constructor(player: VideoJsPlayer, qualities: VideoQuality[]) {
    super(player, qualities);
    this.init(qualities);
  }

  init(qualities: VideoQuality[]) {
    videojs.registerComponent("QualitySelectorButton", QualitySelectorButton);
    this.player.controlBar.addChild("QualitySelectorButton", {
      sources: qualities,
    });
  }
}
