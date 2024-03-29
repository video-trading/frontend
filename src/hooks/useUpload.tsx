import { useState, useCallback } from "react";
import { SignedUrl, StorageService } from "../services/StorageService";
import { VideoService } from "../services/VideoService";

export interface UploadModelInterface {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  preSignedUrl: SignedUrl | undefined;
  setPreSignedUrl: (url: SignedUrl) => void;
  upload: (
    accessToken: string,
    videoId: string,
    url: SignedUrl,
    file: File
  ) => Promise<void>;
  uploadProgress: number;
  currentUploadBytes: number;
  totalUploadBytes: number;
}

export function useUploadVideo() {
  const [file, setFile] = useState<File>();
  const [preSignedUrl, setPreSignedUrl] = useState<SignedUrl>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUploadBytes, setCurrentUploadBytes] = useState(0);
  const [totalUploadBytes, setTotalUploadBytes] = useState(0);

  const upload = useCallback(
    async (
      accessToken: string,
      videoId: string,
      url: SignedUrl,
      file: File
    ) => {
      await StorageService.uploadUsingPreSignedUrl(
        url,
        file,
        (progress, current, total) => {
          setUploadProgress(progress);
          setCurrentUploadBytes(current);
          setTotalUploadBytes(total);
        }
      );
      await VideoService.onUploaded(accessToken, videoId);
    },
    []
  );

  const value: UploadModelInterface = {
    file,
    setFile,
    upload,
    uploadProgress,
    currentUploadBytes,
    totalUploadBytes,
    setPreSignedUrl,
    preSignedUrl,
  };

  return value;
}
