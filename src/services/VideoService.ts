import axios from "axios";
import { SignedUrl } from "./StorageService";

export interface CreateVideoDto {
  title: string;
  fileName: string;
  description: string;
}

export interface CreateVideoResponse {
  video: {
    id: string;
    title: string;
    fileName: string;
  };
  preSignedURL: SignedUrl;
}
export interface SalesInfo {
  id: string;
  price: number;
  tokenId?: string;
}

export interface GetVideoResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  fileName: string;
  description: string;
  thumbnail: string;
  views: number;
  likes: number;
  dislikes: number;
  userId: string;
  playlistId: string;
  status: string;
  SalesInfo: SalesInfo;
}

export interface UpdateVideoDto {
  title?: string;
  description?: string;
  SalesInfo?: SalesInfo;
}

export class VideoService {
  static async createVideo(
    accessToken: string,
    video: CreateVideoDto
  ): Promise<CreateVideoResponse> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/video";
    const newVideo = await axios.post(url, video, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return newVideo.data;
  }

  static async getVideo(videoId: string): Promise<GetVideoResponse> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `/video/${videoId}`;
    const video = await axios.get(url, {});
    return video.data;
  }

  static async updateVideo(
    accessToken: string,
    videoId: string,
    data: UpdateVideoDto
  ): Promise<GetVideoResponse[]> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `/video/${videoId}`;
    const video = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return video.data;
  }
}
