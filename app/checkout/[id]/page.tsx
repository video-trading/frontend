import BrainTreePurchaseCard from "@/components/payment/BrainTreePurchaseCard";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
import {
  GetVideoDetailResponse,
  VideoService,
} from "@/src/services/VideoService";

export const metadata = {
  title: "Check out",
};

export default async function Page({ params }: any) {
  const { t } = useTranslation("common");
  const video = await VideoService.getVideo(params.id, undefined);

  return (
    <>
      <main className="relative h-screen">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <video
            src="https://files.video2.trade/checkout.mp4"
            autoPlay
            loop
            muted
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <Link href={`/watch/${params.id}`}>
                <button
                  type="button"
                  className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </Link>
              {/* <Link className="font-black" href={`/watch/${params.id}`}></Link> */}
              <h1 className="text-sm font-medium text-indigo-600">
                Purchase details
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {t("checkout-title")}
              </p>
              <p className="mt-2 text-base text-gray-500">
                {t("checkout-description")}
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Video Id</dt>
                <dd className="mt-2 text-indigo-600">{params.id}</dd>
              </dl>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
              >
                <li key={video.id} className="flex space-x-6 py-6">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <a href={`/watch/${video.id}`}>{video.title}</a>
                    </h3>
                    <p>{video.Category.name}</p>
                    <p>{video.User.name}</p>
                  </div>
                  <p className="flex-none font-medium text-gray-900">
                    {video.SalesInfo?.price} HKD
                  </p>
                </li>
              </ul>

              <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>{t("item-total")}</dt>
                  <dd className="text-gray-900">0.00 HKD</dd>
                </div>

                <div className="flex justify-between">
                  <dt>{t("gas-fee")}</dt>
                  <dd className="text-gray-900">0.00 HKD</dd>
                </div>

                <div className="flex justify-between">
                  <dt>{t("platform-commission")}</dt>
                  <dd className="text-gray-900">0.00 HKD</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">
                    ${video.SalesInfo?.price.toFixed(2)} HKD
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900 mt-5">
                <BrainTreePurchaseCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
