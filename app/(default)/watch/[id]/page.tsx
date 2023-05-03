import { PurchaseCard } from "@/components/video/PurchaseCard";
import VideoPlayer from "@/components/video/VideoPlayer";
import { classNames } from "@/src/classNames";
import {
  GetVideoDetailResponse,
  VideoService,
  VideoStatus,
} from "@/src/services/VideoService";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
import { Editor } from "editor";
import VideoReviews from "@/components/video/VideoReviews";
import VideoBreadcrumb from "@/components/video/VideoBreadcrumb";

const reviews = { average: 4, totalCount: 1624 };

export default async function Video({ params }: any) {
  const { t } = useTranslation("common");
  const video = await VideoService.getVideo(params.id, undefined);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <VideoBreadcrumb category={video.Category} />
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {video.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {video.SalesInfo?.price} HKD
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <Editor initialValue={video.description} editable={false} />
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">
                Ready to be purchased
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:col-span-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="overflow-hidden rounded-lg">
            <div className="h-full w-full object-cover object-center">
              <VideoPlayer />
            </div>
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <PurchaseCard
            videoId={video.id}
            purchaseOptions={[
              {
                name: t("purchase-option-1"),
                description: t("purchase-option-1-description"),
              },
              {
                name: t("purchase-option-2"),
                description: t("purchase-option-2-description"),
                disabled: true,
              },
            ]}
          />
        </div>
        <div className="col-span-4">
          <VideoReviews />
        </div>
      </div>
    </div>
  );
}
