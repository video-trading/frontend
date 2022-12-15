import axios from "axios";
import { SignedUrl } from "./StorageService";
import { Profile } from "./AuthenticationService";
import { GetCategoryResponse } from "./CategoryService";

export enum VideoStatus {
  UPLOADING = "UPLOADING",
  UPLOADED = "UPLOADED",
  PUBLISHED = "PUBLISHED",
  ANALYZING = "ANALYZING",
  TRANSCODING = "TRANSCODING",
  READY = "READY",
  FAILED = "FAILED",
}
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

export interface PaginationResponse<T> {
  items: T[];
  metadata: {
    total: number;
    per: number;
    page: number;
    totalPages: number;
  };
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
  status: VideoStatus;
  SalesInfo: SalesInfo;
  categoryId: string;
  User: Profile;
  Category: GetCategoryResponse;
  progress: number;
}

export interface PublishVideoDto {
  title: string;
  description: string;
  SalesInfo?: SalesInfo;
  categoryId: string;
}

export interface GetMyVideoDto {
  _id: string;
  videos: GetVideoResponse[];
}

export interface GetMyVideoByIdDto extends GetVideoResponse {
  transcodings: {
    id: string;
    targetQuality: string;
    status: string;
  }[];
  analyzingResult?: {
    id: string;
    status: string;
    quality: string;
    length: number;
    frameRate: string;
  };
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

  static async getVideos(
    page: number,
    categoryId?: string
  ): Promise<PaginationResponse<GetVideoResponse>> {
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT +
      `/video?page=${page ?? 1}&category=${categoryId}`;
    const videos = await axios.get(url, {});
    return videos.data;
  }

  static async updateVideo(
    accessToken: string,
    videoId: string,
    data: PublishVideoDto
  ): Promise<GetVideoResponse> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `/video/${videoId}`;
    const video = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return video.data;
  }

  static async onUploaded(
    accessToken: string,
    videoId: string
  ): Promise<GetVideoResponse> {
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/video/${videoId}/uploaded`;
    const video = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return video.data;
  }

  static async publishVideo(
    accessToken: string,
    videoId: string,
    data: PublishVideoDto
  ): Promise<any> {
    await VideoService.updateVideo(accessToken, videoId, data);
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/video/${videoId}/publish`;
    const video = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return video.data;
  }

  static async getMyVideos(
    accessToken: string,
    page?: number
  ): Promise<PaginationResponse<GetMyVideoDto>> {
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT +
      `/video/my/videos?page=${page ?? ""}`;
    console.log(url);
    const videos = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return videos.data;
  }

  static async getMyVideoById(
    accessToken: string,
    videoId: string
  ): Promise<GetMyVideoByIdDto> {
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/video/my/videos/${videoId}`;
    const video = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return video.data;
  }
}
