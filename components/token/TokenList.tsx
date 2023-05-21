import { TokenHistroy } from "@/src/services/TokenService";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
import { useCallback } from "react";

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
            <h4 className="sr-only">Items</h4>
            <ul role="list" className="divide-y divide-gray-200">
              {item.transactions.map((tx, index) => (
                <li key={index} className="p-4 sm:p-6">
                  <div className="flex items-center sm:items-start">
                    <div className="ml-6 flex-1 text-sm">
                      <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                        <div className="text-lg flex flex-row space-x-2 justify-items-center items-center place-content-center">
                          {renderIcon(tx.type)} <h5>{t(tx.type)}</h5>
                        </div>
                        <p className="mt-2 sm:mt-0">
                          {tx.value} {t("token-unit")}
                        </p>
                      </div>
                      <p className="text-gray-500">{tx["_id"]["$oid"]}</p>
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
