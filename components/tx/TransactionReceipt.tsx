import { TransactionHistory } from "@/src/services/PaymentService";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

interface Props {
  transaction: TransactionHistory;
}

export default function TransactionReceipt({ transaction }: Props) {
  const { t } = useTranslation("tx");

  return (
    <div className="border rounded-3xl">
      <div className="mx-auto w-full p-10">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">
            {t("thank-you")}
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("tx-receipt-title")}
          </p>
          <p className="mt-2 text-base text-gray-500">
            {t("tx-receipt-description", { txId: transaction.id })}
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">{t("tx-hash")}</dt>
            <dd className="mt-2 text-indigo-600">{t("no-record")}</dd>
          </dl>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <div
            key={transaction.id}
            className="flex space-x-6 border-b border-gray-200 py-10"
          >
            <img
              src={transaction.Video?.thumbnail}
              alt={transaction.Video?.title}
              className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
            />
            <div className="flex flex-auto flex-col">
              <div>
                <h4 className="font-medium text-gray-900">
                  <a href={`/watch/${transaction.Video?.id}`}>
                    {transaction.Video?.title}
                  </a>
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  {dayjs(transaction.Video?.createdAt).format("YYYY-MM-DD")}
                </p>
              </div>
              <div className="mt-6 flex flex-1 items-end">
                <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">
                      {t("quantity")}
                    </dt>
                    <dd className="ml-2 text-gray-700">1</dd>
                  </div>
                  <div className="flex pl-4 sm:pl-6">
                    <dt className="font-medium text-gray-900">{t("price")}</dt>
                    <dd className="ml-2 text-gray-700">
                      {transaction.value} HKD
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="sm:ml-40 sm:pl-6">
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">{t("from-user")}</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <Link
                      //@ts-expect-error
                      href={`/user/${transaction.From.id}`}
                      className="block"
                    >
                      {transaction.From.name}
                    </Link>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">{t("to-user")}</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <Link
                      //@ts-expect-error
                      href={`/user/${transaction.To.id}`}
                      className="block"
                    >
                      {transaction.To.name}
                    </Link>
                  </address>
                </dd>
              </div>
            </dl>

            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">{t("time")}</dt>
                <dd className="mt-2 text-gray-700">
                  <p>
                    {dayjs(transaction.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </dd>
              </div>
            </dl>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">{t("total")}</dt>
                <dd className="text-gray-900">{transaction.value} HKD</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
