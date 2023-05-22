import { classNames } from "@/src/classNames";
import { useGetTransactionsByVideo } from "@/src/hooks/useGetTransactionsByVideo";
import { Dialog } from "@headlessui/react";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { CircularProgressBar } from "../shared/Placeholders";

interface Props {
  videoId: string;
  open: boolean;
  onClose: () => void;
}

export default function VideoTransactionsDialog({
  open,
  onClose,
  videoId,
}: Props) {
  const { t } = useTranslation("tx");
  const { data, isLoading } = useGetTransactionsByVideo(videoId);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={"bg-white w-2/3 h-2/3 rounded-3xl p-10"}>
          <Dialog.Title>
            <div className="flex justify-between flex-row items-center place-content-center">
              <h1 className="text-2xl font-bold">{t("video-transactions")}</h1>
              <button onClick={() => onClose()}>{t("close")}</button>
            </div>
          </Dialog.Title>
          <Dialog.Description className={"h-full"}>
            {isLoading && <CircularProgressBar />}
            <ul className="divide-y divide-gray-100">
              {data?.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {item.id}
                      </p>
                      <p
                        className={classNames(
                          "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                        )}
                      >
                        {item.value}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">
                        Created At{" "}
                        <time>
                          {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        </time>
                      </p>
                      <svg
                        viewBox="0 0 2 2"
                        className="h-0.5 w-0.5 fill-current"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <p className="truncate">
                        {t("from")} {item.From.username}
                      </p>
                      <svg
                        viewBox="0 0 2 2"
                        className="h-0.5 w-0.5 fill-current"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <p className="truncate">
                        {t("to")} {item.To.username}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
