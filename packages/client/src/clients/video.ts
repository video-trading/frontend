import { PostgrestError } from "@supabase/supabase-js";
import { Client } from "../supabase";

export interface Video {
  id: string;
  title: string;
  description: string;
  cover: string;
  source: string;
  /**
   * Video Size in bytes
   */
  size: number;
  created_at: Date;
  updated_at: Date;
  uid: string;
  cid: string;
  views: number;
  likes: number;
}

type VideoResponse = {
  data?: Video;
  error?: PostgrestError;
};

/**
 * A client which can be used to interact with the video service.
 */
export class VideoClient extends Client {
  async createVideo(video: Video) {
    return await this.client.from("video").insert(video);
  }

  /**
   * Get a video by id.
   * @param id The id of the video.
   * @returns
   */
  async getVideo(id: string): Promise<VideoResponse> {
    // use supabase client to get video
    const { data, error } = await this.client
      .from("video")
      .select("*")
      .eq("id", id);

    if (error !== null) {
      return { data: undefined, error };
    }

    return {
      data: data[0],
      error: undefined,
    };
  }

  /**
   * List all video by pagination.
   */
  async listVideos(page: number) {
    const { from, to } = this.pagination(page);
    const { data, error, count } = await this.client
      .from<Video>("video")
      .select("*", { count: "exact" })
      .range(from, to);

    const totalPages = this.totalPages(count!);
    return { data, error, totalPages };
  }

  async listCategories() {
    const { data, error } = await this.client.from("category").select("*");
    return { data, error };
  }
}
