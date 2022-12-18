/**
 * A video quality selector component for video.js
 */

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { Events } from "./events";
import { css } from "@emotion/css";
import { VideoQuality } from "./types";

const MenuButton = videojs.getComponent("MenuButton");
const MenuItem = videojs.getComponent("MenuItem");

interface ExtendedVideoJsOptions extends VideoJsPlayerOptions {
  sources: VideoQuality[];
}

export class QualitySelectorButton extends MenuButton {
  selected: QualitySelectorMenuItem | undefined;

  constructor(player: VideoJsPlayer, options: ExtendedVideoJsOptions) {
    super(player, options);

    /**
     * Handle the request when the user clicks on the button
     */
    player.on(
      Events.QUALITY_CHANGE,
      async (event, data: QualitySelectorMenuItem) => {
        await this.setSelected(data);
        this.update();
      }
    );

    /**
     * Update the source when quality is changed
     */
    player.on(
      Events.QUALITY_REQUESTED,
      async (event, data: QualitySelectorMenuItem) => {
        await this.changeSource(data);
      }
    );

    player.on("ready", async () => {
      const currentSource = player.src();
      for (const source of options.sources) {
        if (source.src === currentSource) {
          this.updateSourceLabel(source);
        }
      }
      this.update();
    });
  }

  updateSourceLabel(src: VideoQuality) {
    this.el().childNodes[0].textContent = src.label;
  }

  async changeSource(src: VideoQuality) {
    // saved current timestamp
    const currentTime = this.player_.currentTime();
    this.player().src(src.src);

    await this.player().play();
    this.player().currentTime(currentTime);
    this.updateSourceLabel(src);
  }

  async setSelected(selectedItem: VideoQuality) {
    //@ts-ignore
    const items: QualitySelectorMenuItem[] = this.items;
    if (items && items.length > 0) {
      for (const item of items) {
        if (selectedItem.src === item.src) {
          item.selected(selectedItem.src === item.src);
          this.selected = item;
          this.player().trigger(Events.QUALITY_REQUESTED, selectedItem);
        }
      }
    }
  }

  createEl(): Element {
    const className = css`
      &.vjs-menu-button {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    return videojs.dom.createEl("button", {
      className: `${className} ${super.buildWrapperCSSClass()}`,
      textContent: this.selected ? this.selected.label : "Quality",
    });
  }

  buildWrapperCSSClass() {
    return `${super.buildWrapperCSSClass()}`;
  }

  createItems() {
    const items: QualitySelectorMenuItem[] = [];
    const options = this.options_ as ExtendedVideoJsOptions;
    const sources = options.sources;
    if (sources && sources.length >= 0) {
      sources.forEach((source) => {
        items.push(
          new QualitySelectorMenuItem(this.player_, {
            label: source.label,
            src: source.src,
          })
        );
      });
    }

    return items;
  }
}

// QualitySelectorMenuItem
interface ExtendedVideoJsMenuItemOptions {
  src: string;
  label: string;
}

export class QualitySelectorMenuItem extends MenuItem {
  src: string;
  label: string;

  constructor(player: VideoJsPlayer, options: ExtendedVideoJsMenuItemOptions) {
    super(player, options);
    this.src = options.src;
    this.label = options.label;
  }

  handleClick() {
    this.player().trigger(Events.QUALITY_CHANGE, {
      src: this.src,
      label: this.label,
    });
  }
}
