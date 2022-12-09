import { createContext, useCallback, useState } from "react";
import { SignedUrl, StorageService } from "../services/StorageService";
import { Sign } from "crypto";
import { GetVideoResponse } from "../services/VideoService";

export interface UploadModelInterface {
  file: File | undefined;
  setFile: (file: File) => void;
  preSignedUrl: SignedUrl | undefined;
  setPreSignedUrl: (url: SignedUrl) => void;
  upload: (url: SignedUrl, file: File) => void;
  uploadProgress: number;
  currentUploadBytes: number;
  totalUploadBytes: number;
}

export const UploadContext = createContext<UploadModelInterface>(
  {} as UploadModelInterface
);

export function UploadContextProvider(props: any) {
  const [file, setFile] = useState<File>();
  const [preSignedUrl, setPreSignedUrl] = useState<SignedUrl>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUploadBytes, setCurrentUploadBytes] = useState(0);
  const [totalUploadBytes, setTotalUploadBytes] = useState(0);

  const upload = useCallback(async (url: SignedUrl, file: File) => {
    await StorageService.uploadUsingPreSignedUrl(
      url,
      file,
      (progress, current, total) => {
        setUploadProgress(progress);
        setCurrentUploadBytes(current);
        setTotalUploadBytes(total);
      }
    );
  }, []);

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

  return (
    <UploadContext.Provider value={value}>
      {props.children}
    </UploadContext.Provider>
  );
}
