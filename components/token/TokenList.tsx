import { TokenHistroy } from "@/src/services/TokenService";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useCallback } from "react";
import FallbackImage from "../shared/FallbackImage";

interface Props {
  items: TokenHistroy[];
}

export default function TokenList({ items }: Props) {
  const { t } = useTranslation("reward");

  const renderIcon = useCallback((type: string) => {
    if (type === "REWARD") {
      return <ArrowUpCircleIcon className="h-5 w-5 text-green-500" />;
    }

    return <ArrowDownCircleIcon className="h-5 w-5 text-red-500" />;
  }, []);

  return (
    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
        {items.map((item) => (
          <div
            key={item._id}
            className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
          >
            <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
              <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                <div>
                  <dt className="font-medium text-gray-900">{t("time")}</dt>
                  <dd className="mt-1 text-gray-500">{item._id}</dd>
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
            <ul role="list" className="divide-y divide-gray-200">
              {item.transactions.map((tx) => (
                <li key={tx._id} className="p-4 sm:p-6">
                  <div className="flex items-center sm:items-start">
                    {tx.Video && (
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                        <FallbackImage
                          src={tx.Video?.thumbnail}
                          alt={tx.Video?._id ?? ""}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    )}
                    <div className="ml-6 flex-1 text-sm">
                      {tx.Video && (
                        <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                          <h5 className="text-lg">{tx?.Video.title}</h5>
                          <p className="mt-2 sm:mt-0">
                            {tx.value} {t("token-unit")}
                          </p>
                        </div>
                      )}
                      {tx.txHash && (
                        <div className="text-gray underline-offset-auto underline cursor-pointer hover:text-sky-500 truncate lg:w-full w-96">
                          <a className="">{t("tx-id", { txId: tx.txHash })}</a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:justify-between">
                    <div className="flex flex-row space-x-5">
                      <h5>{t(tx.type)}</h5>
                      {renderIcon(tx.type)}
                    </div>
                    <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                      {tx.Video === undefined && (
                        <div className="flex flex-1 justify-center pl-4">
                          <p>
                            {tx.value} {t("token-unit")}
                          </p>
                        </div>
                      )}
                      {tx.Video && (
                        <div className="flex flex-1 justify-center pl-4">
                          <a
                            href={`/watch/${tx.Video._id}`}
                            className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                          >
                            {t("watch")}
                          </a>
                        </div>
                      )}
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
