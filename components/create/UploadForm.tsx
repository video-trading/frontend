"use client";

import { useUploadVideo } from "@/src/hooks/useUpload";
import { GetVideoResponse, VideoService } from "@/src/services/VideoService";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import LoadingButton from "../shared/LoadingButton";

interface Props {
  session: Session;
}

export default function UploadForm({ session }: Props) {
  const { t } = useTranslation("video");
  const [loading, setLoading] = useState(false);
  const { upload, setFile, setPreSignedUrl, uploadProgress, file } =
    useUploadVideo();

  const accessToken = (session as any).accessToken;
  const router = useRouter();

  const createVideo = useCallback(
    async (file: File) => {
      if (!session) {
        return;
      }
      setLoading(true);
      try {
        setFile(file);
        const video = await VideoService.createVideo(accessToken, {
          fileName: file.name,
          title: "",
          description: "",
        });
        setPreSignedUrl(video.preSignedURL);
        await upload(accessToken, video.video.id, video.preSignedURL, file);
        router.push(`/create/${video.video.id}`);
      } catch (e: any) {
        console.error(e);
        alert(e.message);
      }
      setLoading(false);
    },
    [session]
  );

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("upload-video-title")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("upload-video-description")}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("video-upload-area")}
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>{t("video-upload-area-upload-file")}</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        // support video
                        accept="video/*"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                            return;
                          }
                          setFile(undefined);
                          alert("No file selected");
                        }}
                      />
                    </label>
                    <p className="pl-1">{t("video-upload-area-dragndrop")}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    {t("video-upload-area-file-types")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {file && <p>{file.name}</p>}

      {uploadProgress > 0 && (
        <div className="h-1 w-full bg-neutral-200">
          <div
            className="h-1 bg-purple-400"
            style={{ width: `${uploadProgress * 100}%` }}
          ></div>
        </div>
      )}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <LoadingButton
          className="w-24 h-10 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={loading || !file}
          loading={loading}
          onClick={(e) => {
            e.preventDefault();
            if (file) {
              createVideo(file);
            }
          }}
        >
          Upload
        </LoadingButton>
      </div>
    </form>
  );
}
