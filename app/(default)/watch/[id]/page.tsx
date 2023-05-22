import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { PurchaseCard } from "@/components/video/PurchaseCard";
import VideoPlayer from "@/components/video/VideoPlayer";
import VideoReviews from "@/components/video/VideoReviews";
import { authOptions } from "@/src/authOptions";
import { classNames } from "@/src/classNames";
import { VideoService, VideoStatus } from "@/src/services/VideoService";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { Editor } from "editor";
import { getServerSession } from "next-auth";
import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";

const reviews = { average: 4, totalCount: 1624 };

export async function generateMetadata({ params }: any) {
  const video = await VideoService.getVideo(params.id, undefined);
  return {
    title: video.title,
    openGraph: {
      title: video.title,
      images: video.thumbnail,
    },
  };
}

export default async function Video({ params }: any) {
  const { t } = useTranslation("common");
  const session = await getServerSession(authOptions);
  const video = await VideoService.getVideo(
    params.id,
    (session as any)?.accessToken
  );

  if (video.status !== VideoStatus.READY) {
    return redirect(`/watch/${params.id}/notReady`);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <Breadcrumbs
            routes={[
              {
                name: video.Category.name,
                href: `/category/${video.Category.id}`,
                current: false,
              },
              {
                name: video.title,
                href: `/watch/${video.id}`,
                current: true,
              },
            ]}
          />
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {video.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            {video.SalesInfo && (
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
                      <p className="sr-only">
                        {reviews.average} out of 5 stars
                      </p>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      {reviews.totalCount} reviews
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <p>{t("owner", { owner: video.Owner.name })}</p>
            </div>

            <div className="mt-4 space-y-6">
              <Editor initialValue={video.description} editable={false} />
            </div>

            {video.SalesInfo && video.purchasable && (
              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  Ready to be purchased
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:col-span-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="overflow-hidden rounded-lg">
            <div className="h-full w-full object-cover object-center">
              <VideoPlayer transcodings={video.transcodings} />
            </div>
          </div>
        </div>

        {/* Product form */}
        {video.SalesInfo && video.purchasable && (
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <PurchaseCard
              videoId={video.id}
              purchaseOptions={[
                {
                  name: t("purchase-option-1"),
                  description: t("purchase-option-1-description"),
                  link: `/checkout/${video.id}`,
                },
                {
                  name: t("purchase-option-2"),
                  description: t("purchase-option-2-description"),
                  link: `/checkout/token/${video.id}`,
                },
              ]}
            />
          </div>
        )}
        <div className="col-span-4">
          <VideoReviews />
        </div>
      </div>
    </div>
  );
}
