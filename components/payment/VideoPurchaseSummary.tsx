import {
  VideoPurchaseSummary,
  VideoPurchaseSummarySchema,
} from "@/src/services/PaymentService";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

type Props = VideoPurchaseSummary & {
  children?: React.ReactNode;
};

export default function VideoPurchaseSummary(props: Props) {
  const { t } = useTranslation("common");
  const { children, ...rest } = props;
  const { video, salesInfo } = VideoPurchaseSummarySchema.parse(rest);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-10 xl:gap-x-24 overflow-scroll max-h-screen">
      <div className="lg:col-start-2">
        <Link href={`/watch/${video.id}`}>
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

        <dl className="mt-5 text-sm font-medium">
          <dt className="text-gray-900">Video Id</dt>
          <dd className="mt-2 text-indigo-600">{video.id}</dd>
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
              {video.SalesInfo.price} {t(video.SalesInfo.unit)}
            </p>
          </li>
        </ul>

        <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
          {salesInfo.prices.map((price, index) => (
            <div className="flex justify-between" key={`price-${index}`}>
              <dt>{t(price.name)}</dt>
              <dd className="text-gray-900">
                {price.price} {t(price.unit)}
              </dd>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
            <dt className="text-base">Total</dt>
            <dd className="text-base">
              {salesInfo.total.price} {t(salesInfo.total.unit)}
            </dd>
          </div>
          {children}
        </dl>
      </div>
    </div>
  );
}
