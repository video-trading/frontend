import { Editor } from "@/packages/editor/src";
import { classNames } from "@/src/classNames";
import { GetMyVideoByIdDto, VideoStatus } from "@/src/services/VideoService";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import FallbackImage from "../shared/FallbackImage";

interface Props {
  video: GetMyVideoByIdDto;
}

export default function HistoryDetail({ video }: Props) {
  const { t } = useTranslation("my");
  // calculate progress based on the video status.
  const steps = [
    {
      title: t("video-progress-created"),
      status: VideoStatus.UPLOADING,
    },
    {
      title: t("video-progress-uploaded"),
      status: VideoStatus.UPLOADED,
    },
    {
      title: t("video-progress-analyzing"),
      status: VideoStatus.ANALYZING,
    },
    {
      title: t("video-progress-transcoding"),
      status: VideoStatus.TRANSCODING,
    },
    {
      title: t("video-progress-finished"),
      status: VideoStatus.READY,
    },
  ];

  return (
    <main className="m-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {t("video-details")}
      </h1>

      <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
        <dl className="flex">
          <dt className="text-gray-500">{t("video-id")}&nbsp;</dt>
          <dd className="font-medium text-gray-900">{video.id}</dd>
          <dt>
            <span className="sr-only">Date</span>
            <span className="mx-2 text-gray-400" aria-hidden="true">
              &middot;
            </span>
          </dt>
          <dd className="font-medium text-gray-900">
            <time dateTime="2021-03-22">
              {dayjs(video.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </time>
          </dd>
        </dl>
      </div>

      <section aria-labelledby="products-heading" className="mt-8">
        <div className="space-y-24">
          <div
            key={video.id}
            className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
          >
            <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                <FallbackImage
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
              <h3 className="text-lg font-medium text-gray-900">
                <a href={`/watch/${video.id}`}>{video.title}</a>
              </h3>
              <p className="mt-1 font-medium text-gray-900">
                {video.SalesInfo?.price}
              </p>
              <Editor initialValue={video.description} editable={false} />
            </div>
            <div className="sm:col-span-12 md:col-span-7">
              <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                <div>
                  <dt className="font-medium text-gray-900">
                    {t("video-duration")}
                  </dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">
                      {video.analyzingResult?.length.toFixed(2)} seconds
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    {t("video-resolution")}
                  </dt>
                  <dd className="mt-3 space-y-3 text-gray-500">
                    <p>{video.analyzingResult?.quality}</p>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    {t("video-framerate")}
                  </dt>
                  <dd className="mt-3 space-y-3 text-gray-500">
                    <p>{video.analyzingResult?.frameRate}</p>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 font-medium text-gray-900 md:mt-10">
                {t("video-status")}: {"  "}
                {t(video.status)}
              </p>
              <div className="mt-6">
                <div className="overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{
                      width: `${video.progress}%`,
                    }}
                  />
                </div>
                <div className="mt-6 hidden grid-cols-5 font-medium text-gray-600 sm:grid">
                  {steps.map((step) => (
                    <div
                      className={classNames(
                        video.passedStatus.includes(step.status)
                          ? "text-indigo-600"
                          : "",
                        "text-center"
                      )}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing */}
      <section aria-labelledby="summary-heading" className="mt-24">
        <div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
          <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-1 md:gap-x-8 lg:col-span-3 lg:pl-8">
            <div>
              <dt className="font-medium text-gray-900">
                {t("transcoding-progress")}
              </dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">
                  {t("transcoding-progress-description")}
                </span>
              </dd>
            </div>
          </dl>

          <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-9 lg:mt-0 lg:pr-8">
            {video.transcodings.map((transcoding) => (
              <div className="flex items-center justify-between pb-4">
                <dt className="text-gray-600">{transcoding.targetQuality}</dt>
                <dd className="font-medium text-gray-900">
                  {transcoding.status}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
