import { Editor } from "@/packages/editor/src";
import { TransactionByUserDto } from "@/src/services/TransactionService";
import { GetMyVideoDto, VideoStatus } from "@/src/services/VideoService";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import FallbackImage from "../shared/FallbackImage";

interface Props {
  items: TransactionByUserDto[];
}

export default function TransactionList({ items }: Props) {
  const { t } = useTranslation("tx");

  return (
    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
          >
            <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
              <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                <div>
                  <dt className="font-medium text-gray-900">{t("time")}</dt>
                  <dd className="mt-1 text-gray-500">{item.id}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    {t("total-txs")}
                  </dt>
                  <dd className="mt-1 font-medium text-gray-900">
                    {item.transactions.length}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Videos */}
            <h4 className="sr-only">Items</h4>
            <ul role="list" className="divide-y divide-gray-200">
              {item.transactions.map((tx) => (
                <li key={tx.id} className="p-4 sm:p-6">
                  <div className="flex items-center sm:items-start">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                      <FallbackImage
                        src={tx.Video?.thumbnail}
                        alt={tx.Video?.title ?? ""}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-6 flex-1 text-sm">
                      <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                        <h5 className="text-lg">{tx.Video?.title}</h5>
                        <p className="mt-2 sm:mt-0">{tx.value}</p>
                      </div>
                      <div className="text-gray">
                        <p>{t("tx-id", { txId: tx.id })}</p>
                        <p>{t("sender", { sender: tx.From.name })}</p>
                        <p>{t("receiver", { receiver: tx.To.name })}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:justify-between">
                    {tx.type === "RECEIVED" ? (
                      <div className="flex items-center">
                        <ArrowLeftCircleIcon
                          className="h-5 w-5 text-yellow-500"
                          aria-hidden="true"
                        />
                        <p className="ml-2 text-sm font-medium text-gray-500">
                          {t(tx.type)}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <ArrowRightCircleIcon
                          className="h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-2 text-sm font-medium text-gray-500">
                          {t(tx.type)}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                      <div className="flex flex-1 justify-center">
                        <Link
                          //@ts-ignore
                          href={"/tx/" + tx.id}
                          className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                        >
                          {t("view-details")}
                        </Link>
                      </div>
                      <div className="flex flex-1 justify-center pl-4">
                        <a
                          href={`/watch/${tx.id}`}
                          className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                        >
                          {t("watch")}
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
