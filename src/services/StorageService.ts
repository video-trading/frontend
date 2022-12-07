import axios from "axios";

export class StorageService {
  /**
   * Upload a file to S3
   * @param url Pre-signed URL
   * @param file File
   */
  static uploadUsingPreSignedUrl(url: string, file: File) {
    console.log(file);
    return axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  }
}
