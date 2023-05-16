import { VideoStatus } from "@/src/services/VideoService";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { use } from "react";

interface Props {
  status: VideoStatus;
}
export default function VideoStatusErrorPage({ status }: Props) {
  const { t } = useTranslation("video");
  const { t: common } = useTranslation("common");

  const errorMessage: { [k: string]: string } = {
    [VideoStatus.UPLOADING]: "Video is still uploading",
  };

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 border-gray-500">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            {common("error")}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t("video-publish-error-title")}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {errorMessage[status] ?? t("video-already-published-description")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href={"/"}>
              <div className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {common("back-to-home")}
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
