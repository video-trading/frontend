import { PurchaseCard } from "@/components/video/PurchaseCard";
import VideoBreadcrumb from "@/components/video/VideoBreadcrumb";
import VideoNotReadyErrorPage from "@/components/video/VideoNotReadyErrorPage";
import VideoPlayer from "@/components/video/VideoPlayer";
import VideoReviews from "@/components/video/VideoReviews";
import { classNames } from "@/src/classNames";
import { VideoService, VideoStatus } from "@/src/services/VideoService";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { Editor } from "editor";
import useTranslation from "next-translate/useTranslation";

const reviews = { average: 4, totalCount: 1624 };

export const metadata = {
  title: "Not Ready",
};

export default async function Video({ params }: any) {
  const { t } = useTranslation("common");
  const video = await VideoService.getVideo(params.id, undefined);

  return (
    <div className="mx-auto max-w-4xl">
      <VideoNotReadyErrorPage />
    </div>
  );
}
