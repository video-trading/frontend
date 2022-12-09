import axios from "axios";

export interface SignedUrl {
  url: string;
  key: string;
  previewUrl: string;
}

type OnProgress = (progress: number, current: number, total: number) => void;

export class StorageService {
  /**
   * Upload a file to S3
   * @param url Pre-signed URL
   * @param file File
   * @param onProgress On progress callback
   */
  static uploadUsingPreSignedUrl(
    url: SignedUrl,
    file: File,
    onProgress?: OnProgress
  ) {
    return axios.put(url.url, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          onProgress(
            progressEvent.loaded / progressEvent.total,
            progressEvent.loaded,
            progressEvent.total
          );
        }
      },
    });
  }
}
