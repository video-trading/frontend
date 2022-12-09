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
// {
//   "id": "63917736bea189c90e3ad819",
//     "createdAt": "2022-12-08T05:33:42.026Z",
//     "updatedAt": "2022-12-08T05:33:42.026Z",
//     "title": "Test Video",
//     "fileName": "test.mov",
//     "description": "My Video",
//     "thumbnail": null,
//     "views": 0,
//     "likes": 0,
//     "dislikes": 0,
//     "userId": "638cde7db45ac58fb4b0f077",
//     "playlistId": null,
//     "status": "UPLOADING"
// }
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
  SalesInfo: {
    id: string;
    price: number;
    tokenId?: string;
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
}
